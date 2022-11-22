import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import './admin-index.page.scss'
import { Button, ButtonGroup } from '@chakra-ui/react'
import axios from 'axios'
import { authState, initialAuthState } from '../../atom/auth.atom'
import { useRecoilState } from 'recoil'
import { authLogout } from '../../service/auth.service'


const AdminIndexPage = () => {

  const nav = useNavigate()

  const [auth, setAuth] = useRecoilState(authState)
  const logout = async function () {
    await authLogout()
    setAuth(initialAuthState)
    nav('/')
  }

  return (
    <main>
      <nav>
        <Link to="/admin/attendance">직원출결현황</Link>
        <Link to="/admin/employee">직원관리</Link>
        <Link to="/admin/department">부서관리</Link>
        <button className='logout' onClick={logout} >Logout</button>
      </nav>
      <article>
        <Outlet></Outlet>
      </article>
    </main>
  )
}

export default AdminIndexPage