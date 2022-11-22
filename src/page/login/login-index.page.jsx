import React, { useEffect, useState } from 'react'
import './login-index.page.scss'
import {
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  HStack,
  Button,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { authLogin } from '../../service/auth.service'
import { useRecoilState } from 'recoil'
import { authState } from '../../atom/auth.atom'


const LoginIndexPage = () => {
  const [auth, setAuth] = useRecoilState(authState)
  const nav = useNavigate()
  const [formData, setFormData] = useState({
    id: null,
    password: null,
    role: 'EMPLOYEE',
  })

  useEffect(() => {
    if (!auth?._id) return
    if (formData.role === 'EMPLOYEE') {
      console.log('employee')
      nav('/employee')
    } else if (formData.role === 'ADMIN') {
      console.log('admin')
      nav('/admin')
    }
  }, [auth])

  async function submit(e) {
    try {
      const res = await authLogin(formData)
      setAuth(() => res.data)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <main className='login'>
      <div className='login__form'>
        <h1 className='form-label'>로그인</h1>
        <FormControl className="form-control id">
          <FormLabel htmlFor='id'>ID</FormLabel>
          <Input
            id='id'
            type='id'
            placeholder='ID를 입력하세요'
            onChange={e => { setFormData({ ...formData, id: e.target.value }) }}
          />
        </FormControl>
        <FormControl className="form-control pw">
          <FormLabel htmlFor='password'>Password</FormLabel>
          <Input
            id='password'
            type='password'
            placeholder='비밀번호를 입력하세요'
            onChange={e => { setFormData({ ...formData, password: e.target.value }) }}
          />
        </FormControl>
        <FormControl className="form-control user-choice-radio" as='fieldset'>
          <RadioGroup
            defaultValue='EMPLOYEE'
            colorScheme='teal'
            onChange={e => { setFormData({ ...formData, role: e }) }}
          >
            <HStack spacing='24px'>
              <Radio value='ADMIN'>관리자</Radio>
              <Radio value='EMPLOYEE'>직원</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <Button className='login-btn' colorScheme='teal' onClick={submit}>로그인</Button>
      </div>
    </main>


  )
}

export default LoginIndexPage