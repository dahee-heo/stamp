import React from 'react'
import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { authState } from '../atom/auth.atom'

const AuthGuard = ({ children }) => {

  const auth = useRecoilValue(authState)

  if (!auth?._id) {
    alert('로그인 해주세요.')
    return <Navigate to='/'></Navigate>
  }

  return children
}

export default AuthGuard