import React from 'react'
import {DatePicker,Divider,Form,Input,Item,Badge,Button,Icon,Radio,Slider,Select} from 'antd'
import {Col,Row} from 'reactstrap'
const {TextArea} = Input
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const TaskDrawerAdd = props => {
  return (
      <div>
      <Divider orientation="left">New Task</Divider>
        <Form>
          <Form.Item>
            <Input
              name='task_title'
              value={props.task_details.task_title}
              onChange={props.newtaskChange(props.task_details.task_title)}
              placeholder="Task Title"
            />
          </Form.Item>
          <Form.Item>
          <TextArea

          name='task_desc'
          value={props.task_details.task_desc}
          onChange={props.newtaskChange(props.task_details.task_desc)}
          placeholder="Task Description"
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
<Divider dashed />
          </Form.Item>
          <Row>
            <Col md="6">
            <Form.Item label="Priority">
            <Select size='default' defaultValue="High"  style={{ width: 200 }}>
              <Option key='1'>Low</Option>
              <Option key='1'>Medium</Option>
              <Option key='1'>High</Option>
            </Select>

            </Form.Item>
            </Col>
            <Col md="6">
            <Form.Item label="Status">
            <Select size='default' defaultValue="Started"  style={{ width: 200 }}>
              <Option key='1'>Active</Option>
              <Option key='2'>Pending</Option>
              <Option key='3'>Done</Option>
            </Select>

          </Form.Item>
            </Col>
          </Row>


        <Form.Item label="Start and End">
          <RangePicker onChange='' />
        </Form.Item>
          <Form.Item>
            <Button onClick={props.addTaskToParent}>Add Plan</Button>
          </Form.Item>
        </Form>
      </div>
  )
}

export default TaskDrawerAdd
