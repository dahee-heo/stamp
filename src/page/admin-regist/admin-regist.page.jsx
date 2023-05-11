import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { authRegist } from '../../service/auth.service'
import { styled } from '../../config/stitches.config'
import { Button } from '../../component/Button'

const AdminRegistPageStyled = styled('main', {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    minHeight: "380px",
  
    ".admin-regist-form": {
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
  
      ".regist-btn": {
        width: "100%",
      }
    }
})

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
    <AdminRegistPageStyled>
      <div className='admin-regist-form'>
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
        <Button
          className='regist-btn' 
          color="primary"
          size="md"
          mr={3} 
          onClick={adminRegist}
        >
          등록
        </Button>
      </div>
    </AdminRegistPageStyled>
  )
}

export default AdminRegistPage