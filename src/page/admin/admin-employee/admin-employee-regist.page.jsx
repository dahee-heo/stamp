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
} from '@chakra-ui/react'
import { authRegist } from '../../../service/auth.service'

const AdminEmployeeRegistPage = (props) => {
  const { isOpen, onClose } = props
  const [inputData, setInputData] = useState({
    name: null,
    department: null,
    password: null,
  })

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  async function regist(e) {
    const res = await authRegist(inputData)
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
          <ModalHeader>직원관리</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>이름</FormLabel>
              <Input ref={initialRef} placeholder='이름을 입력해주세요' onChange={e => { setInputData({ ...inputData, name: e.target.value }) }} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>부서</FormLabel>
              <Input placeholder='부서를 입력해주세요' onChange={e => { setInputData({ ...inputData, department: e.target.value }) }} />
            </FormControl>
            {/* 
            <FormControl mt={4}>
              <FormLabel>ID</FormLabel>
              <Input isDisabled={true} placeholder='ID를 입력해주세요' />
            </FormControl> */}

            <FormControl mt={4}>
              <FormLabel>PW</FormLabel>
              <Input placeholder='Password를 입력해주세요' onChange={e => { setInputData({ ...inputData, password: e.target.value }) }} />
            </FormControl>
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