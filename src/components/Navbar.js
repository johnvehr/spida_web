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
  ListGroupItem
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

import usFlag from "../assets/img/flags/us.png";
import esFlag from "../assets/img/flags/es.png";
import deFlag from "../assets/img/flags/de.png";
import nlFlag from "../assets/img/flags/nl.png";

import avatar1 from "../assets/img/avatars/john.png";
import avatar3 from "../assets/img/avatars/avatar-3.jpg";
import avatar4 from "../assets/img/avatars/avatar-4.jpg";
import avatar5 from "../assets/img/avatars/avatar-5.jpg";

import Logo from '../assets/img/photos/ocilio.png'
const { Option } = Select;
const notifications = [];

const messages = [];

const NavbarDropdown = ({
  children,
  count,
  showBadge,
  header,
  footer,
  icon: Icon
}) => (
  <UncontrolledDropdown nav inNavbar className="mr-2">
    <DropdownToggle nav className="nav-icon dropdown-toggle">
      <div className="position-relative">
        <Icon className="align-middle" size={18} />
        {showBadge ? <span className="indicator">{count}</span> : null}
      </div>
    </DropdownToggle>
    <DropdownMenu right className="dropdown-menu-lg py-0">
      <div className="dropdown-menu-header position-relative">
        {count} {header}
      </div>
      <ListGroup>{children}</ListGroup>
      <DropdownItem header className="dropdown-menu-footer">
        <span className="text-muted">{footer}</span>
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

const NavbarDropdownItem = ({ icon, title, description, time, spacing }) => (
  <ListGroupItem>
    <Row noGutters className="align-items-center">
      <Col xs={2}>{icon}</Col>
      <Col xs={10} className={spacing ? "pl-2" : null}>
        <div className="text-dark">{title}</div>
        <div className="text-muted small mt-1">{description}</div>
        <div className="text-muted small mt-1">{time}</div>
      </Col>
    </Row>
  </ListGroupItem>
);

const NavbarComponent = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  return (
    <div>
    <Navbar color="white" light expand>
      <span
        className="sidebar-toggle d-flex mr-2"
        onClick={() => {
          props.dispatch(toggleSidebar());
        }}
      >
        <i className="hamburger align-self-center" />
      </span>

      <Form inline>
      <FontAwesomeIcon onClick={toggleNavbar} className="fa-beat color-off-white" icon={collapsed ? faPlus : faMinus} >
       New Project</FontAwesomeIcon>
      </Form>

      <Collapse navbar>
        <Nav className="ml-auto" navbar>
        {/*  <NavbarDropdown
            header="New Messages"
            footer="Show all messages"
            icon={MessageCircle}
            count={messages.length}
            showBadge
          >
            {messages.map((item, key) => {
              return (
                <NavbarDropdownItem
                  key={key}
                  icon={
                    <img
                      className="avatar img-fluid rounded-circle"
                      src={item.avatar}
                      alt={item.name}
                    />
                  }
                  title={item.name}
                  description={item.description}
                  time={item.time}
                  spacing
                />
              );
            })}
          </NavbarDropdown> */}

          <NavbarDropdown
            header="New Notifications"
            footer="Show all notifications"
            icon={BellOff}
            count={notifications.length}
          >
            {notifications.map((item, key) => {
              let icon = <Bell size={18} className="text-warning" />;

              if (item.type === "important") {
                icon = <AlertCircle size={18} className="text-danger" />;
              }

              if (item.type === "login") {
                icon = <Home size={18} className="text-primary" />;
              }

              if (item.type === "request") {
                icon = <UserPlus size={18} className="text-success" />;
              }

              return (
                <NavbarDropdownItem
                  key={key}
                  icon={icon}
                  title={item.title}
                  description={item.description}
                  time={item.time}
                />
              );
            })}
          </NavbarDropdown>

          <UncontrolledDropdown nav inNavbar>
            <span className="d-inline-block d-sm-none">
              <DropdownToggle nav caret>
                <Settings size={18} className="align-middle" />
              </DropdownToggle>
            </span>
            <span className="d-none d-sm-inline-block">
              <DropdownToggle nav caret>
                <img
                  src={avatar1}
                  className="avatar img-fluid rounded-circle mr-1"
                  alt={`${props.account.subdomain}`}
                />
                <span className="account-nav-name">{props.user.full_name}</span>
              </DropdownToggle>
            </span>

            {props.account_owner ? (<DropdownMenu right><DropdownItem>
              <User size={18} className="align-middle mr-2" />
              <Link to={`/${props.account.subdomain}/account`}>Account</Link>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={props.sign_Out}>Sign out</DropdownItem>
            </DropdownMenu>
          ) : (<DropdownMenu right>
            <DropdownItem>
              <PieChart size={18} className="align-middle mr-2" />
              Profile
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={props.sign_Out}>Sign out</DropdownItem>
            </DropdownMenu>
          )}

          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
    <Navbar color="faded" light className="bottomNav">
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
            <Container fluid className="p-0">
                <NewProject
                  subdomain={props.account.subdomain}
                  account_users={props.account_users}
                   />
            </Container>

            </Nav>
          </Collapse>
        </Navbar>
    </div>
  );
};

export default connect(store => ({
  app: store.app
}))(NavbarComponent);
