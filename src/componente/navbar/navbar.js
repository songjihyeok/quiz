import React, {useState} from 'react'
import {Form, Button, Navbar, Nav, FormControl} from 'react-bootstrap'
import './navbar.scss'


const NavbarReact =(props)=>{


    return <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">퀴즈</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link href="/admin/problemStatus">문제</Nav.Link>
        <Nav.Link href="/admin/dashboard">접수 현황</Nav.Link>
        </Nav>
    </Navbar.Collapse>
    </Navbar>
}

export default NavbarReact





