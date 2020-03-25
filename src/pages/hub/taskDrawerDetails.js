
import React from 'react'
import {Form,Input,Item,Icon,Button} from 'antd'

const PlanDrawerDetails = props => {
  return (
      <div>
        <Form>
        {props.task_details.task_title}
        {props.task_details.task_desc}
        </Form>
      </div>
  )
}

export default PlanDrawerDetails
