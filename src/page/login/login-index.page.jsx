import React, { useEffect, useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  HStack,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { authLogin } from '../../service/auth.service'
import { useRecoilState } from 'recoil'
import { authState } from '../../atom/auth.atom'
import { useController, useForm } from 'react-hook-form'
import { styled } from '../../config/stitches.config'


const LoginIndexPage = () => {
  const [auth, setAuth] = useRecoilState(authState)
  const nav = useNavigate()
  // const [formData, setFormData] = useState({
  //   id: null,
  //   password: null,
  //   role: 'EMPLOYEE',
  // })
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    mode: "onSubmit",
    defaultValues: {
      id: null,
      password: null,
      role: 'EMPLOYEE',
    }
  });
  const { field } = useController({
    name: 'role',
    control: control
  })

  const { value } = field;
  const role = value;

  useEffect(() => {
    if (!auth?._id) return
    if (role === 'EMPLOYEE') {
      nav('/employee')
    } else if (role === 'ADMIN') {
      nav('/admin')
    }
  }, [auth])

  async function submit(data) {
    try {
      const res = await authLogin(data)
      setAuth(() => res.data)
    } catch (error) {
      console.log(error)
    }
  }

  // const handleChange = (event) => {
  //   setFormData({
  //     ...formData, 
  //     [event.target.id]: event.target.value
  //   })    
  // }

  const LoginIndexStyled = styled('main', {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    minHeight: "380px",
  
    ".login__form": {
      flexShrink: 0,
      width: "320px",
      position: "relative",
      marginTop: "10vh",
  
      ".form-label": {
        fontSize: "30px",
        marginBottom: "40px",
        textAlign: "center",
        fontWeight: "800",
      },
  
      ".form-control": {
        marginBottom: "20px",
  
        "&.user-choice-radio": {
          marginBottom: "40px",
        }
      },
  
      ".login-btn": {
        width: "100%",
      }
    }
  
  })


  return (
    <LoginIndexStyled>
      <div className='login__form'>
        <h1 className='form-label'>로그인</h1>
        <form onSubmit={handleSubmit(submit)}>
          <FormControl className="form-control id" isInvalid={errors.id}>
            <FormLabel htmlFor='id'>ID</FormLabel>
            <Input
              id='id'
              placeholder='ID를 입력하세요'
              errorBorderColor='red.300'
              // onChange={handleChange}
              {...register("id",{
                required: true,
                minLength: {
                  value: 2,
                  message: "2글자 이상 입력해주세요."
                }
              })}
              />
              {errors.id && <FormErrorMessage>2글자 이상 입력해주세요.</FormErrorMessage>}
          </FormControl>
          <FormControl className="form-control pw" isInvalid={errors.password}>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input
              id='password'
              type='password'
              placeholder='비밀번호를 입력하세요'
              errorBorderColor='red.300'
              // onChange={handleChange}
              {...register("password",{
                required: true,
                minLength: {
                  value: 2,
                  message: "2글자 이상 입력해주세요."
                }
              })}
            />
            {errors.password && <FormErrorMessage>2글자 이상 입력해주세요.</FormErrorMessage>}
          </FormControl>
          <FormControl className="form-control user-choice-radio" as='fieldset'>
            <RadioGroup
              defaultValue='EMPLOYEE'
              colorScheme='teal'
              // onChange={e => { setFormData({ ...formData, role: e }) }}
            >
              <HStack spacing='24px'>
                <Radio 
                  value='ADMIN'
                  {...register("role",{
                    required: true,
                  })} 
                >관리자</Radio>
                <Radio 
                  value='EMPLOYEE'
                  {...register("role",{
                    required: true,
                  })}
                >직원</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <Button 
            className='login-btn' 
            colorScheme='teal' 
            type='submit'
            // onClick={submit}
          >로그인</Button>
        </form>
      </div>
    </LoginIndexStyled>


  )
}

export default LoginIndexPage