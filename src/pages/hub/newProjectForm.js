import React from 'react'
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import {Row,Col,Card,Container,CardBody} from 'reactstrap'
import {Button,Input,Text,Form,Item,Icon, Switch,Select,DatePicker,Upload,Avatar} from 'antd'
import {withRouter} from 'react-router-dom'
import * as projectActions from '../../redux/actions/projectActions'
import {bindActionCreators} from 'redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import {Editor, EditorState} from 'draft-js';

class NewProject extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        project_title: '',
        project_manager: '',
        project_team: [],
        project_desc: '',
        files: [],
        project_status: 'Started',
        project_active: true,
    }

    this.newProjectChange = this.newProjectChange.bind(this)
    this.switchChange = this.switchChange.bind(this)
    this._createProject = this._createProject.bind(this)
    this.newProjectManagerChange = this.newProjectManagerChange.bind(this)
    this.newProjectTeamChange = this.newProjectTeamChange.bind(this)
  }

  _createProject(e){
    e.preventDefault()

    /*
    const project_form = new FormData()
    for (let [key, value] of Object.entries(this.state)) {
      project_form.append(`[${project_form}]${key}`,value)
    }*/

    this.props.actions.createProject(this.state,this.props.subdomain)
    this.setState({
      project_title: '',
      project_desc: '',
      project_active: true
    })
  }

  switchChange() {
    this.setState(prevState => ({
      project_active: !prevState.project_active,
      project_status: !prevState.project_active ? 'Started' : 'Not Started'
    }))
  }

  fileChange = (value) => {
    if (value.file.status !== 'uploading' && value.file.status == 'done'){
      this.setState({
        files: [
          ...this.state.files,
          value.file.name
        ]
      })
    }
  }

  newProjectManagerChange = (value) => {
    this.setState({
      project_manager: value
    })
  }

  newProjectTeamChange = (value) => {
    this.setState({
      project_team: value
    })
    console.log(this.state.project_team)
  }

  newProjectChange = input => e => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    })
  }

  render(){
    const {Option} = Select
    const {RangePicker} = DatePicker
    const { Dragger } = Upload
    const {TextArea} = Input
    console.log(this.state.active)
    return(
      <Container fluid className="p-0" >
      <Card className="card-new-project-form">
      <CardBody>
      <Form className="newprojectForm">
      <Row>
        <Col md="4">
          <Form.Item>
            <Input
              prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
              name="project_title"
              className="naked-border"
              value={this.state.project_title}
              onChange={this.newProjectChange(this.state.project_title)}
              placeholder="Project Title"
              />
          </Form.Item>
          <Form.Item>
            <Select placeholder="Project Manager" onChange={this.newProjectManagerChange}>
              {this.props.account_users ? (
                this.props.account_users.map((au) => (
                <Option key={au.id}>{au.email}</Option>
              ))):(
                <Option value="no team">No team members</Option>
              )
            }
            </Select>
          </Form.Item>
          <Form.Item>
          <Select mode="tags" style={{ width: '100%' }} placeholder="Select Team" onChange={this.newProjectTeamChange}>
          {this.props.account_users ? (
            this.props.account_users.map((au) => (
            <Option key={au.id}>{au.email}</Option>
          ))):(
            <Option value="no team">No team members</Option>
          )
        }
          </Select>
          </Form.Item>
          <Form.Item>
            <RangePicker />
          </Form.Item>

        </Col>
        <Col md="4">
        <Form.Item>

          <TextArea
            rows={6}
            prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="project_desc"
            className="naked-bord"
            value={this.state.project_desc}
            onChange={this.newProjectChange(this.state.project_desc)}
            placeholder="Give us more"
            />
        </Form.Item>
        </Col>
        <Col md="4">

        <Form.Item>
          <Upload.Dragger name="files" action='https://www.mocky.io/v2/5cc8019d300000980a055e76' multiple={true} onChange={this.fileChange}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </Form.Item>
        <Form.Item>
          <Switch defaultChecked checkedChildren="Active"
          unCheckedChildren="Inactive" onClick={this.switchChange} />
        </Form.Item>
        <Form.Item>
          <Button onClick={this._createProject} type="primary" htmlType="submit" >
          <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Form.Item>
        </Col>
        </Row>
    </Form>
    </CardBody>
    </Card>
    </Container>
    )
  }
}


const mapStateToProps = (state,props) => ({
  project: state.projects
})

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewProject))
