import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from '@chakra-ui/react'
import axios from 'axios'
import * as qs from 'qs'
import { useSearchParams } from 'react-router-dom'
import { userUpdate } from '../../../service/auth.service'


const AdminEmployeeUpdatePage = (props) => {
  const { isOpen, onClose, onCloseComplete, updateUser } = props
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [depData, setDepData] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()


  useEffect(() => {
    getDepartmentData()
    console.log('depData: ', depData);
    // getUser()
  }, [])


  async function getDepartmentData() {
    const paginationMeta = { limit: 100 }
    const qsString = qs.stringify(paginationMeta)

    let url = 'http://localhost:3000/department'
    if (qsString.length) {
      url += '?' + qsString
    }
    const getDepartmentData = await axios.get(url)
    const { docs, ...option } = getDepartmentData.data

    setSearchParams(paginationMeta, { replace: true })
    setDepData(docs)
  }

  const [inputData, setInputData] = useState({
    name: null,
    department: null,
    _id: null,
  })

  const employeeUpdate = async function () {
    const obj = {
      name: inputData.name,
      department: inputData.department,
      _id: props.updateUser._id,
    }
    console.log(obj.department, obj.name, obj._id)
    const updateUserDate = await userUpdate(obj)
    onClose()
  }

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={onCloseComplete}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>직원정보수정</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>직원이름</FormLabel>
            <Input ref={initialRef} defaultValue={props.updateUser.name} placeholder='직원이름을 수정해주세요' onChange={e => { setInputData({ ...inputData, name: e.target.value }) }} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>부서</FormLabel>
            <Select placeholder='Select option' defaultValue={props.updateUser.department} onChange={e => { setInputData({ ...inputData, department: e.target.value }) }}>
              {
                depData.map(dep => {
                  return (
                    <option key={dep._id} value={dep._id}>{dep.department}</option>
                  )
                })
              }
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='teal' mr={3} onClick={employeeUpdate}>
            수정
          </Button>
          <Button onClick={onClose}>닫기</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AdminEmployeeUpdatePage