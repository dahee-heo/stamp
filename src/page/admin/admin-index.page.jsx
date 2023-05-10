import React, { useState } from 'react'
import { Outlet, Link, useNavigate, NavLink, useLocation } from 'react-router-dom'
// import './admin-index.page.scss'
import { Header } from '../../layout/Header'
import { FiHome, FiCheckSquare, FiUsers, FiMessageSquare } from "react-icons/fi";
import { MdWorkspacesOutline } from "react-icons/md";
import { styled } from '../../config/stitches.config';
import { Nav } from '../../layout/Nav';
import { SectionStyled } from '../../style/SectionStyled';
import { MobileNav } from '../../component/MobileNav';

const MainStyled = styled("main", {
  width: "100%",
  height: "100%",
  display: "flex",
})

const AdminIndexPage = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <>
      {mobileNavOpen && 
        <MobileNav 
          setMobileNavOpen={setMobileNavOpen}
          pathname={pathname}
        />
      }
      <Header setMobileNavOpen={setMobileNavOpen}/>
      <MainStyled>
        <Nav/>
        <SectionStyled>
          <Outlet/>
        </SectionStyled>
      </MainStyled>
    </>
  )
}

export default AdminIndexPage