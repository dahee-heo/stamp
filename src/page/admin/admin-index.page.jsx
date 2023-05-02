import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import './admin-index.page.scss'
import { HeaderComponent } from '../../component/header.component'
import { FiHome, FiCheckSquare, FiUsers, FiMessageSquare } from "react-icons/fi";
import { MdWorkspacesOutline } from "react-icons/md";


const AdminIndexPage = () => {

  return (
    <>
      <HeaderComponent/>
      <main>
        <nav>
          <Link to="/admin/home"><FiHome/>홈</Link>
          <Link to="/admin/attendance"><FiCheckSquare/>직원출결현황</Link>
          <Link to="/admin/employee"><FiUsers/>직원관리</Link>
          <Link to="/admin/department"><MdWorkspacesOutline/> 부서관리</Link>
          <Link to="/admin/notice"><FiMessageSquare/>공지사항</Link>
        </nav>
        <article>
          <Outlet></Outlet>
        </article>
      </main>
    </>
  )
}

export default AdminIndexPage