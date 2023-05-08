import React from 'react'
import { Outlet, Link, useNavigate, NavLink } from 'react-router-dom'
// import './admin-index.page.scss'
import { Header } from '../../layout/Header'
import { FiHome, FiCheckSquare, FiUsers, FiMessageSquare } from "react-icons/fi";
import { MdWorkspacesOutline } from "react-icons/md";
import { styled } from '../../config/stitches.config';
import { Nav } from '../../component/Nav';
import { Section } from '../../layout/Section';

const MainStyled = styled("main", {
  width: "100%",
  height: "100%",
  display: "flex",
})

const AdminIndexPage = () => {
  return (
    <>
      <Header/>
      <MainStyled>
        <Nav/>
        <Section/>
      </MainStyled>
    </>
  )
}

export default AdminIndexPage