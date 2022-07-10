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
import { departmentRegist } from '../../../service/auth.service'

const AdminSettingDepartmentRegistPage = (props) => {
  const { isOpen, onClose, onCloseComplete, name } = props
  const [inputData, setInputData] = useState({
    department: null,
  })

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  async function depRegist(e) {
    const res = await departmentRegist(inputData)
    // console.log('res: ', res);
    onClose()
  }




  return (
    <>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        onCloseComplete={onCloseComplete}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>카테고리추가</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>카테고리명</FormLabel>
              <Input ref={initialRef} placeholder='카테고리명을 입력해주세요' onChange={e => { setInputData({ ...inputData, department: e.target.value }) }} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={depRegist}>
              등록
            </Button>
            <Button onClick={onClose}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AdminSettingDepartmentRegistPage