import React from 'react'
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
import { useState } from 'react'
import { myInfoIdUpdate } from '../../service/auth.service'

const EmployeeInfoIdUpdate = (props) => {
  const { isOpen, onClose, updateMyInfo } = props
  const [inputData, setInputData] = useState({
    id: null,
  })

  async function idUpdate() {
    const obj = {
      id: inputData.id,
      _id: props.updateMyInfo._id,
    }

    const idUpdateData = await myInfoIdUpdate(obj)
    onClose()
  }

  return (

    <>
      <Modal isOpen={isOpen} onClose={onClose}>

        <ModalOverlay />
        <ModalContent>
          <ModalHeader >정보수정</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>ID</FormLabel>
              <Input placeholder='아이디를 입력해주세요' defaultValue={updateMyInfo.id} onChange={e => { setInputData({ ...inputData, id: e.target.value }) }} />
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={idUpdate} >
              수정
            </Button>
            <Button onClick={onClose}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}

export default EmployeeInfoIdUpdate