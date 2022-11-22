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
  RadioGroup,
  setValue,
  Stack,
  Radio,
} from '@chakra-ui/react'
import { authRegist } from '../../../service/auth.service'
import axios from 'axios'
import * as qs from 'qs'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { departmentGetList } from '../../../service/department.service'


const AdminEmployeeRegistPage = (props) => {
  const { isOpen, onClose } = props
  const [inputData, setInputData] = useState({
    name: null,
    department: null,
    password: null,
    role: null,
  })
  const [depData, setDepData] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    getDepartmentData()
  }, [])

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  async function regist(e) {
    await authRegist(inputData)
    onClose()
  }

  async function getDepartmentData() {
    const paginationMeta = { limit: 100 }
    const getDepartmentData = await departmentGetList(paginationMeta)
    console.log('getDepartmentData: ', getDepartmentData);
    const { docs, ...option } = getDepartmentData.data
    // console.log('docs : ', docs);

    setSearchParams(paginationMeta, { replace: true })
    setDepData(docs)
  }



  return (
    <>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>직원관리</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form>
              <FormControl>
                <FormLabel>이름</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder='이름을 입력해주세요'
                  onChange={e => { setInputData({ ...inputData, name: e.target.value }) }}
                />
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

              <FormControl mt={4}>
                <FormLabel>PW</FormLabel>
                <Input
                  autoComplete='new-password'
                  type='password'
                  placeholder='Password를 입력해주세요'
                  onChange={e => { setInputData({ ...inputData, password: e.target.value }) }}
                />
              </FormControl>

              <RadioGroup defaultValue='2' mt={4} onChange={e => { setInputData({ ...inputData, role: e }) }}>
                <Stack spacing={5} direction='row'>
                  <Radio colorScheme='teal' value='ADMIN'>
                    관리자
                  </Radio>
                  <Radio colorScheme='teal' value='EMPLOYEE'>
                    직원
                  </Radio>
                </Stack>
              </RadioGroup>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={regist}>
              등록
            </Button>
            <Button onClick={onClose}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AdminEmployeeRegistPage