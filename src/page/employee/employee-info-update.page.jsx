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
  useDisclosure,
} from '@chakra-ui/react'
import axios from 'axios'
import * as qs from 'qs'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { myInfoUpdate } from '../../service/auth.service'
import EmployeeInfoIdUpdate from './employee-info-id-update'
import EmployeeInfoPwUpdate from './employee-info-pw-update'



const EmployeeInfoUpdatePage = (props) => {

  const { isOpen, onClose, updateMyInfo } = props
  const { isOpen: idOpen, onOpen: idOnOpen, onClose: idClose } = useDisclosure()
  const { isOpen: pwOpen, onOpen: pwOnOpen, onClose: pwClose } = useDisclosure()


  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [inputData, setInputData] = useState({
    id: null,
    currPassword: null,
    newPassword: null,
    newPasswordCheck: null,
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const [userData, setUserData] = useState([])
  const [updateData, setUpdateData] = useState([])





  return (
    <>

      <Modal isOpen={isOpen} onClose={onClose}>
        <EmployeeInfoIdUpdate
          isOpen={idOpen}
          onClose={idClose}
          updateMyInfo={updateMyInfo}
        ></EmployeeInfoIdUpdate>
        <EmployeeInfoPwUpdate
          isOpen={pwOpen}
          onClose={pwClose}
          updateMyInfo={updateMyInfo}
        >
        </EmployeeInfoPwUpdate>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>정보 수정</ModalHeader>
          <ModalCloseButton />
          <FormControl mb={6} ml={6}>
            <FormLabel>ID 변경</FormLabel>
            <Button onClick={() => { idOnOpen() }}>변경하기</Button>
          </FormControl>
          <FormControl mb={8} ml={6}>
            <FormLabel>비밀번호 변경</FormLabel>
            <Button onClick={() => { pwOnOpen() }}>변경하기</Button>
          </FormControl>
        </ModalContent>
      </Modal>

    </>
  )
}

export default EmployeeInfoUpdatePage