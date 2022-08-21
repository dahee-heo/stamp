import React from 'react'
import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { authState } from '../atom/auth.atom'

const AuthGuard = ({ role, children }) => {
  const RoleMap = {
    ADMIN: ['ADMIN'],
    EMPLOYEE: ['ADMIN', 'EMPLOYEE']
  }

  const auth = useRecoilValue(authState)

  if (!auth?._id) {
    alert('로그인 해주세요.')
    return <Navigate to='/'></Navigate>
  }

  if (!role) return children

  if (!RoleMap[role]) {
    alert('잘못된 접근입니다.')
    return <Navigate to='/'></Navigate>
  }

  if (!RoleMap[role].includes(auth?.role)) {
    alert('잘못된 접근입니다.')
    return <Navigate to='/'></Navigate>
  }

  return children
}

export default AuthGuard