import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import './admin-index.page.scss'
import { Button, ButtonGroup } from '@chakra-ui/react'


const AdminIndexPage = () => {
  return (
    <main>
      <nav>
        <Link to="/admin/attendance">직원출결현황</Link>
        <Link to="/admin/employee">직원관리</Link>
        <Link to="/admin/department">카테고리관리</Link>
      </nav>
      <article>
        <Outlet></Outlet>
      </article>
    </main>
  )
}

export default AdminIndexPage