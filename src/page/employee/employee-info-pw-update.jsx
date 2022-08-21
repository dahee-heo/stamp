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
import { myInfoPwUpdate } from '../../service/auth.service'

const EmployeeInfoPwUpdate = (props) => {
  const { isOpen, onClose, updateMyInfo } = props
  const [inputData, setInputData] = useState({
    currPassword: null,
    newPassword: null,
    passwordCheck: null,
  })

  async function pwUpdate() {
    const obj = {
      password: inputData.newPassword,
      _id: props.updateMyInfo._id,
    }

    if (inputData.newPassword === inputData.passwordCheck) {
      const pwUpdateData = await myInfoPwUpdate(obj)
      onClose()
    } else {
      alert('잘못된 정보입니다')
    }
  }

  return (

    <>
      <Modal isOpen={isOpen} onClose={onClose}>

        <ModalOverlay />
        <ModalContent>
          <ModalHeader >정보수정</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>

            <FormControl mt={6}>
              <FormLabel>현재 비밀번호</FormLabel>
              <Input autoComplete='new-password' type='password' placeholder='현재 Password를 입력해주세요' onChange={e => { setInputData({ ...inputData, currPassword: e.target.value }) }} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>새로운 비밀번호</FormLabel>
              <Input autoComplete='new-password' type='password' placeholder='새로운 Password를 입력해주세요' onChange={e => { setInputData({ ...inputData, newPassword: e.target.value }) }} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>새로운 비밀번호 확인</FormLabel>
              <Input autoComplete='new-password' type='password' placeholder='새로운 Password를 확인해주세요' onChange={e => { setInputData({ ...inputData, passwordCheck: e.target.value }) }} />
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={pwUpdate}>
              수정
            </Button>
            <Button >닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

  )
}

export default EmployeeInfoPwUpdate