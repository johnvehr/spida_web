import React from 'react'
import classnames from "classnames";

import {
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardLink,
  CardText,
  CardTitle
} from "reactstrap";

import {DatePicker,
  Divider,
  Form,
  Input,
  Item,
  Badge,
  Button,
  Icon,
  Radio,
  Slider,
  Select,
  Table,
  Typography
} from 'antd'

import { Home, Settings, MessageSquare,Users,GitMerge } from "react-feather";
const {Paragraph} = Typography
const PopoverNodeDetail = ({props}) => {

  return (
  props.type_id == 'root' ? (
    <div>
      <h4 className="tab-title">{props.project.project_title}</h4>

      {/*<Paragraph editable={{ onChange: props.newtaskChange }}>{props.node.data.task_title}</Paragraph>*/}

      <p>{props.project.project_desc}</p>
      <Divider />
      <Row>
        <Col md="4">
          <p>Priority</p>
        </Col>
        <Col md="8">
          <p><Badge color="secondary">{props.project.project_active}</Badge></p>
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <p>Status</p>
        </Col>
        <Col md="8">
          <p>{props.node.data.status}</p>
        </Col>
        {props.project_team_members.map((ptm) => (
          <p>{ptm.user_id}</p>
        ))}

      </Row>
      <div>


      </div>
      <div>

      </div>
    </div>
  ):(
    <div>
      <h4><Paragraph editable={{ onChange: props.newtaskChange }}>{props.node.data.task_title}</Paragraph></h4>
      <p>{props.node.data.task_desc}</p>
      <Divider />
      <Row>
        <Col md="4">
          <p>Priority</p>
        </Col>
        <Col md="8">
          <p><Badge color="secondary">{props.node.data.priority}</Badge></p>
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <p>Status</p>
        </Col>
        <Col md="8">
          <p>{props.node.data.status}</p>
        </Col>
      </Row>
      <div>
      {/*
      {props.account_users.map(u =>
        <p>{u.email}</p>
      )}*/}
      </div>
      <div>

      </div>
    </div>
  )
  )
}

export default PopoverNodeDetail
