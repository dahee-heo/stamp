import React from 'react'
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

const LoginIndexPage = () => {
  return (
    <main className='login'>
      <div className='login__form'>
        <h1 className='form-label'>로그인</h1>
        <FormControl className="form-control id">
          <FormLabel htmlFor='email'>ID</FormLabel>
          <Input id='id' type='id' placeholder='ID를 입력하세요' />
        </FormControl>
        <FormControl className="form-control pw">
          <FormLabel htmlFor='email'>Password</FormLabel>
          <Input id='password' type='password' placeholder='비밀번호를 입력하세요' />
        </FormControl>
        <FormControl className="form-control user-choice-radio" as='fieldset'>
          <RadioGroup defaultValue='Worker'>
            <HStack spacing='24px'>
              <Radio value='Manager'>관리자</Radio>
              <Radio value='Worker'>직원</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <Button className='login-btn' colorScheme='teal'>로그인</Button>
      </div>
    </main>


  )
}

export default LoginIndexPage