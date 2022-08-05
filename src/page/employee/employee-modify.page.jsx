import React, { useState } from 'react'
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
import { useEffect } from 'react'
import { userUpdate } from '../../service/auth.service'



const EmployeeModifyPage = (props) => {

  const { isOpen, onClose } = props
  const [inputData, setInputData] = useState({
    name: null,
    department: null,
    password: null,
  })
  const [depData, setDepData] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [userData, setUserData] = useState([])
  const [updateData, setUpdateData] = useState([])

  useEffect(() => {
    getDepartmentData()
    // getUser()
  }, [])

  // useEffect(() => {
  //   console.log(depData)
  // }, [depData])


  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  // async function regist(e) {
  //   const res = await authRegist(inputData)
  // }

  async function getDepartmentData() {
    const paginationMeta = { limit: 100 }
    const qsString = qs.stringify(paginationMeta)
    let url = 'http://localhost:3000/department'
    if (qsString.length) {
      url += '?' + qsString
    }
    const getDepartmentData = await axios.get(url)
    const { docs, ...option } = getDepartmentData.data
    // console.log('docs 11111: ', docs);

    setSearchParams(paginationMeta, { replace: true })

    setDepData(docs)



  }

  // async function getUser() {
  //   const getId = await axios.get('http://localhost:3000/users')
  //   const { name } = getId.data
  //   console.log(' getId.data: ', getId.data);
  //   setUserData(name)
  //   console.log('userData: ', userData);
  // }

  async function userUpdate() {
    const obj = {
      name: inputData.name,
      _id: updateData._id
    }
    const updateUserData = await userUpdate(obj)
    onClose()
  }


  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader >정보수정</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>이름</FormLabel>
              <Input ref={initialRef} placeholder='이름을 입력해주세요' defaultValue={updateData.name} onChange={e => { setInputData({ ...inputData, name: e.target.value }) }} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>부서</FormLabel>
              <Select placeholder='Select option' onChange={e => { setInputData({ ...inputData, department: e.target.value }) }}>
                {
                  depData.map(dep => {
                    return (
                      <option key={dep._id} value={dep._id}>{dep.department}</option>
                    )
                  })
                }
              </Select>
            </FormControl>
            {/* 
            <FormControl mt={4}>
              <FormLabel>ID</FormLabel>
              <Input isDisabled={true} placeholder='ID를 입력해주세요' />
            </FormControl> */}

            <FormControl mt={4}>
              <FormLabel>PW</FormLabel>
              <Input type='password' placeholder='Password를 입력해주세요' onChange={e => { setInputData({ ...inputData, password: e.target.value }) }} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={userUpdate}>
              수정
            </Button>
            <Button onClick={onClose}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EmployeeModifyPage