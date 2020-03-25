import React, {useState}from "react";
import { connect } from "react-redux";
import { toggleSidebar } from "../redux/actions/sidebarActions";
import NewProject from '../pages/hub/newProjectForm'
import {Link} from 'react-router-dom'


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import {
  Row,
  Col,
  Container,
  Navbar,
  Nav,
  Collapse,
  NavbarToggler,
  NavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup,
  ListGroupItem,
  NavbarBrand
} from "reactstrap";

import {
  AlertCircle,
  Bell,
  BellOff,
  Home,
  MessageCircle,
  PieChart,
  Settings,
  User,
  UserPlus,
  FolderPlus
} from "react-feather";
import {Button,Form,Item,Input,Icon,Select} from 'antd'
import SpidaLogo from "../assets/img/logo/fffdf6.png"

const NavbarSimple = () => {
  return (
    <Navbar className="no-box-shadow" expand="md">
      <NavbarBrand><img className="sidebar-logo-simple" src={SpidaLogo} /></NavbarBrand>
    </Navbar>
  )
}

export default NavbarSimple
