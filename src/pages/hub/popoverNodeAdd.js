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
  TabPane
} from "reactstrap";

import {DatePicker,Divider,Form,Input,Item,Badge,Button,Icon,Radio,Slider,Select} from 'antd'

import { Home, Settings, MessageSquare,Users,GitMerge } from "react-feather";
const {TextArea} = Input
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const spida_tags = [
  'Design',
  'Development',
  'Marketing',
  'Accounting'
]
const children = []
for (let i = 0; i < spida_tags.length; i++) {
  children.push(<Option key={i.toString(36) + i} value={spida_tags[i]}>{spida_tags[i]}</Option>);
}
const PopoverNodeAdd = ({props}) => {
  return(
    <Row>
    <Form className="login-form" labelCol={{ span: 4 }}>
      <Form.Item>
        <Input
          name='task_title'
          className="naked-border"
          value={props.task_details.task_title}
          onChange={props.newtaskChange(props.task_details.task_title)}
          placeholder="Task Title"
        />
      </Form.Item>
      <Form.Item>
      <TextArea
      className="naked-border"
      name='task_desc'
      value={props.task_details.task_desc}
      onChange={props.newtaskChange(props.task_details.task_desc)}
      placeholder="Task Description"
      autoSize={{ minRows: 2, maxRows: 6 }}
    />

      </Form.Item>
      <Divider dashed />
      <Form.Item className="low-margin">
        <Select placeholder="Tags" mode="tags" onChange={props.addTaskTags}>
        {children}
        </Select>
      </Form.Item>
      <Form.Item className="low-margin">
        <Select placeholder="Assign To" onChange={props.newAssignTo}>
          {props.account_users ? (
            props.account_users.map((au) => (
            <Option key={au.id}>{au.email}</Option>
          ))):(
            <Option value="no team">No team members</Option>
          )
        }
        </Select>
      </Form.Item>
      <Row form>
      <Col md="6" sm="6" xs="6" >
          <Form.Item className="low-margin">
          <Select
          placeholder="Priority"

            onChange={props.newPriority}
            name='priority'

            >
            <Option value='0'><Badge status="success" text="Low" /></Option>
            <Option value='1'><Badge status="warning" text="Medium" /></Option>
            <Option value='2'><Badge status="error" text="High" /></Option>
          </Select>
          </Form.Item>
</Col>
<Col md="6" sm="6" xs="6">
          <Form.Item className="low-margin">
          <Select
          placeholder="Status"

          onChange={props.newStatus}
          name='status'
             >
            <Option value='0'><Badge status="processing" text="Active"/></Option>
            <Option value='1'><Badge color="gold" text="Pending"/></Option>
            <Option value='2'><Badge color="lime" text="Done"/></Option>
          </Select>

        </Form.Item>
</Col>
</Row>
        <Form.Item label="Due" className="low-margin">
        <Radio.Group defaultValue={'asap'} onChange={props.newDueType} value={props.task_details.due_type}>
            <Radio value={'asap'}>ASAP</Radio>
            <Radio value={'custom'}>Custom</Radio>
        </Radio.Group>
        </Form.Item>

          <Form.Item className="low-margin">
            <RangePicker disabled={props.task_details.due_type == 'asap'} onChange={props.dateRange} />
          </Form.Item>

      <Form.Item className="low-margin">
        <Button type="primary" className="login-form-button" onClick={() => props.addTaskToParent(props.node,props.type_id)}>Add Plan</Button>
      </Form.Item>
      </Form>
      </Row>
  )
}

export default PopoverNodeAdd
