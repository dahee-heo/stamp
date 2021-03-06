import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import './admin-index.page.scss'
import { Button, ButtonGroup } from '@chakra-ui/react'
import axios from 'axios'
import { authState, initialAuthState } from '../../atom/auth.atom'
import { useRecoilState } from 'recoil'


const AdminIndexPage = () => {
  const [auth, setAuth] = useRecoilState(authState)
  const logout = async function () {
    await axios.get('http://localhost:3000/auth/logout')
    setAuth(initialAuthState)
  }

  return (
    <main>
      <nav>
        <Link to="/admin/attendance">직원출결현황</Link>
        <Link to="/admin/employee">직원관리</Link>
        <Link to="/admin/department">카테고리관리</Link>
        <button onClick={logout} >Logout</button>
      </nav>
      <article>
        <Outlet></Outlet>
      </article>
    </main>
  )
}

export default AdminIndexPage