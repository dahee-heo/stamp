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
import { departmentUpdate } from '../../../service/auth.service'
import axios from 'axios'

const AdminSettingDepartmentUpdatePage = (props) => {
  const { isOpen, onClose, onCloseComplete, updateDep } = props

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [inputData, setInputData] = useState({
    department: props.updateDep.department,
  })
  const [inputUpdateData, setInputUpdateData] = useState({
    department: null,
    _id: null,
  })


  const depUpdate = async function () {
    // console.log(inputData)
    // console.log(props.updateDep._id)
    const obj = {
      department: inputData.department,
      _id: props.updateDep._id
    }

    console.log(obj.department, obj._id)

    const updateDepartmentData = await departmentUpdate(obj)
    onClose()
  }

  // async function depRegist(e) {
  //   const res = await departmentRegist(inputData)
  //   // console.log('res: ', res);
  //   onClose()
  // }
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
        <ModalHeader>카테고리수정</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>카테고리명</FormLabel>
            <Input ref={initialRef} defaultValue={props.updateDep.department} placeholder='카테고리명을 입력해주세요' onChange={e => { setInputData({ ...inputData, department: e.target.value }) }} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='teal' mr={3} onClick={depUpdate}>
            수정
          </Button>
          <Button onClick={onClose}>닫기</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AdminSettingDepartmentUpdatePage