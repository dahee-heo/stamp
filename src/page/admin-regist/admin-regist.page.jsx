import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react'
import { authRegist } from '../../service/auth.service'
import './admin-regist.page.scss'


const AdminRegistPage = () => {

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const [inputData, setInputData] = useState({
    name: null,
    department: null,
    password: null,
    id: null,
    role: 'ADMIN',
  })

  const adminRegist = async function () {
    const res = await authRegist(inputData)
  }

  return (
    <main className='admin-regist'>
      <div className='admin-regist__form'>
        <h1 className='form-label'>관리자 등록</h1>
        <FormControl className="form-control">
          <FormLabel>이름</FormLabel>
          <Input
            ref={initialRef}
            type='text'
            placeholder='이름을 입력해주세요'
            onChange={e => { setInputData({ ...inputData, name: e.target.value }) }}
          />
        </FormControl>
        <FormControl className="form-control ">
          <FormLabel>비밀번호</FormLabel>
          <Input
            ref={initialRef}
            type='password'
            placeholder='비밀번호를 입력해주세요'
            onChange={e => {
              setInputData({ ...inputData, password: e.target.value })
            }} />
        </FormControl>
        <Button className='regist-btn' colorScheme='teal' mr={3} onClick={adminRegist}>
          등록
        </Button>
      </div>
    </main>
  )
}

export default AdminRegistPage