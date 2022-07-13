import React, { useState } from 'react'
import './login-index.page.scss'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  RadioGroup,
  Radio,
  HStack,
  Button,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { authLogin } from '../../service/auth.service'

const LoginIndexPage = () => {
  const nav = useNavigate()
  const [formData, setFormData] = useState({
    id: null,
    password: null,
    role: 'Worker',
  })
  async function submit(e) {
    try {
      const res = await authLogin(formData)
      if (formData.role === 'Worker') {
        nav('/employee')
      } else if (formData.role === 'Manager') {
        nav('/admin')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // if (value === 'Worker') {
  //   nav('/employee')
  // } else if (value === 'Manager') {
  //   nav('/admin')
  // }

  return (
    <main className='login'>
      <div className='login__form'>
        <h1 className='form-label'>로그인</h1>
        <FormControl className="form-control id">
          <FormLabel htmlFor='email'>ID</FormLabel>
          <Input id='id' type='id' placeholder='ID를 입력하세요' onChange={e => { setFormData({ ...formData, id: e.target.value }) }} />
        </FormControl>
        <FormControl className="form-control pw">
          <FormLabel htmlFor='email'>Password</FormLabel>
          <Input id='password' type='password' placeholder='비밀번호를 입력하세요' onChange={e => { setFormData({ ...formData, password: e.target.value }) }} />
        </FormControl>
        <FormControl className="form-control user-choice-radio" as='fieldset'>
          <RadioGroup defaultValue='Worker' colorScheme='teal' onChange={e => { setFormData({ ...formData, role: e }) }}>
            <HStack spacing='24px'>
              <Radio value='Manager'>관리자</Radio>
              <Radio value='Worker'>직원</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <Button className='login-btn' colorScheme='teal' onClick={submit}>로그인</Button>
      </div>
    </main>


  )
}

export default LoginIndexPage