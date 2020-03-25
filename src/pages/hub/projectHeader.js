import React from "react";
import {Link} from 'react-router-dom'
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardTitle,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ListGroup,
  ListGroupItem,
  Row,
  UncontrolledDropdown,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";

import {
  PageHeader,
  message,
  Dropdown,
  Tooltip,
  Popover,
  Popconfirm,
  Message,
  Button,
  Drawer,
  Form,
  Input,
  Item,
  Icon,
  Menu,
  Progress,
  Checkbox
} from 'antd'

import { Calendar, Filter, RefreshCw } from "react-feather";


const ProjectHeader = ({
  props,
  toggleLink,
  assignedPipeline,
  spida_filter_due_asap,
  spida_filter_assigned_to,
  spida_filter_due_this_week,
  data,
}) => {
  return (
    <Row className="mb-2 mb-xl-4">
    <PageHeader
     className="site-page-header-responsive"

     title={props.project.project_title}
     extra={[
       <Dropdown.Button className="projectButton" overlay={<Menu >
         <Menu.Item onClick={()=> toggleLink("1")} key="1">
           Spida View
         </Menu.Item>
         <Menu.Item onClick={() => toggleLink("2")} key="2">
           Overview
         </Menu.Item>
         <Menu.Item onClick={() => toggleLink("3")} key="3">
           Team
         </Menu.Item>
         <Menu.Item onClick={() => toggleLink("4")} key="3">
           Storage
         </Menu.Item>
         <Menu.Item onClick={() => toggleLink("5")} key="3">
           Calendar
         </Menu.Item>
       </Menu>}>
       Spida View
       </Dropdown.Button>,
       <Popover placement="bottom" content={
         <div>
         <Checkbox
             onChange={()=> assignedPipeline(data)}
             checked={spida_filter_assigned_to}
           >
             Assigned To Me
         </Checkbox>

         <Checkbox
             onChange={()=> assignedPipeline(data)}
             checked={spida_filter_due_asap}
           >
             Due Asap
           </Checkbox>

           <Checkbox
               onChange={()=> assignedPipeline(data)}
               checked={spida_filter_due_this_week}
             >
               Due This Week
             </Checkbox>
             </div>
       }><Filter /></Popover>,
     ]}
   >
   </PageHeader>




    {/*}  <Col xs="auto" className="d-none d-sm-block">

        <Dropdown.Button className="projectButton" overlay={<Menu >
          <Menu.Item onClick={()=> toggleLink("1")} key="1">
            Spida View
          </Menu.Item>
          <Menu.Item onClick={() => toggleLink("2")} key="2">
            Overview
          </Menu.Item>
          <Menu.Item onClick={() => toggleLink("3")} key="3">
            Team
          </Menu.Item>
          <Menu.Item onClick={() => toggleLink("4")} key="3">
            Storage
          </Menu.Item>
          <Menu.Item onClick={() => toggleLink("5")} key="3">
            Calendar
          </Menu.Item>
        </Menu>}>

        </Dropdown.Button>
      </Col>*/}


        {/*
        <Button color="primary" className="shadow-sm mr-1">
          <Filter className="feather" />
        </Button>
        <Button color="primary" className="shadow-sm">
          <RefreshCw className="feather" />
        </Button>*/}

    </Row>
  );
};

export default ProjectHeader;
