import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import './admin-index.page.scss'
import { Button, ButtonGroup } from '@chakra-ui/react'


const AdminIndexPage = () => {
  return (
    <main>
      <nav>
        <Button colorScheme='blue'>Button</Button>
        <Link to="/admin/attendance">attendance</Link>
        <Link to="/admin/employee">employee</Link>
      </nav>
      <article>
        <Outlet></Outlet>
      </article>
    </main>
  )
}

export default AdminIndexPage