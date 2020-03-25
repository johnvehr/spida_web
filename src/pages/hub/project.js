import React from "react"
import {connect} from "react-redux"
import {withRouter,Link} from "react-router-dom"
import * as projectActions from "../../redux/actions/projectActions"
import * as taskActions from "../../redux/actions/taskActions"
import {bindActionCreators} from 'redux';

import TaskDrawerAdd from './taskDrawerAdd'
import TaskDrawerDetails from './taskDrawerDetails'
import PopoverNode from './popoverNode'
import ProjectHeader from './projectHeader'
import ProjectStatistic from './projectStatistic'
import ProjectGram from './projectGram'
import ProjectGramBig from './projectGramBig'
import ProjectCalendar from './projectCalendar'

import classnames from "classnames";
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
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";

import { MoreHorizontal } from "react-feather";

import avatar1 from "../../assets/img/avatars/avatar.jpg";
import avatar2 from "../../assets/img/avatars/avatar-2.jpg";
import avatar3 from "../../assets/img/avatars/avatar-3.jpg";
import { Calendar, Filter, RefreshCw } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  message,
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
import { Group } from '@vx/group';
import { Tree } from '@vx/hierarchy';
import { LinearGradient } from '@vx/gradient';
import {Zoom} from '@vx/zoom'
import {localPoint} from '@vx/event'
import {scaleLinear} from '@vx/scale'
import { hierarchy } from 'd3-hierarchy';
import { pointRadial } from 'd3-shape';
import { RectClipPath } from '@vx/clip-path';
import {
  LinkHorizontal,
  LinkVertical,
  LinkRadial,
  LinkHorizontalStep,
  LinkVerticalStep,
  LinkRadialStep,
  LinkHorizontalCurve,
  LinkVerticalCurve,
  LinkRadialCurve,
  LinkHorizontalLine,
  LinkVerticalLine,
  LinkRadialLine
} from '@vx/shape';
//import Viewer from 'react-drag-n-zoom'


const {TextArea} = Input

class Project extends React.Component {
  constructor(){
    super()
    this.state = {
      activeTab: "1",
      layout: 'cartesian',
      orientation: 'horizontal',
      linkType: 'diagonal',
      stepPercent: 0.5,
      parent: '',
      type: '',
      project_id: '',
      task: {
        task_title: '',
        task_desc: '',
        status: '',
        priority: '',
        assigned_to: '',
        created_by: '',
        due_type: 'asap',
        start_date: '',
        end_date: '',
        task_tag_list: []
      },
      new_task:false,
      initialTransform: {
        scaleX: 1.27,
        scaleY: 1.27,
        translateX: -211.62,
        translateY: 162.59,
        skewX: 0,
        skewY: 0
      },
      spida_filter: {
        assigned_to: false,
        due_asap: false,
        due_this_week: false
      },
      spida_tasks: {}
    };
    this.retrieveTask = this.retrieveTask.bind(this)
    this.newtaskChange = this.newtaskChange.bind(this)
    this.newAssignTo = this.newAssignTo.bind(this)
    this.newPriority = this.newPriority.bind(this)
    this.newStatus = this.newStatus.bind(this)
    this.changeTranslate = this.changeTranslate.bind(this)
    this.toggle = this.toggle.bind(this);
    this.assignedPipeline = this.assignedPipeline.bind(this)
    this.dateRange = this.dateRange.bind(this)
    this.addTaskTags = this.addTaskTags.bind(this)
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount() {
    console.log("called did mount")
    const project_id = this.props.match.params
    this.props.actions.retrieveProject(project_id,this.props.match.params.subdomain)
  }

  newAssignTo (value){
    this.setState({
      task: {
        ...this.state.task,
        assigned_to: value
      }
    })
  }

  newPriority (value){
    const new_priority = parseInt(value,10)
    this.setState({
      task: {
        ...this.state.task,
        priority: new_priority
      }
    })

  }

  newStatus (value){
    const new_status = parseInt(value,10)
    this.setState({
      task: {
        ...this.state.task,
        status: new_status
      }
    })

  }

  newDueType = e => {
    this.setState({
      task: {
        ...this.state.task,
        due_type: e.target.value
      }
    })
  }

  dateRange (dates, dateStrings) {
    this.setState({
      task: {
        ...this.state.task,
        start_date: dateStrings[0],
        end_date: dateStrings[1]
      }
    })
    console.log(this.state.task.start_date)
  }

  addTaskTags = (incoming_tag) => {
    this.setState({
      task: {
        ...this.state.task,
        task_tag_list: incoming_tag
      }
    })
  }

  newtaskChange = input => e => {
    const name = e.target.name
    this.setState({
      task: {
        ...this.state.task,
        [name]: e.target.value
      }
    })
    console.log(this.state.task)
  }

  showDrawer = () => {
    this.setState({
      visible: true
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
      new_task: false
    })
  }

  _deleteTaskFromParent = (task_id) => {
    this.props.actions.deleteTaskFromParent(task_id,this.props.account.subdomain)
    message.success(
      'Task Deleted'
    )
  }

  _addTaskToParent = (node,type) => {
    console.log(this.state.task)
    let client_task_params = [
      this.props.match.params,
      node.data.id,
      type,
      this.state.task
    ]
    this.props.actions.addTaskToParent(client_task_params, this.props.account.subdomain)
    message.success(
      'New Task Added'
    )
  }

  assignedPipeline = (data) => {
    this.setState({
        spida_filter: {
          ...this.state.spida_filter,
          assigned_to: !this.state.spida_filter.assigned_to
        }
    })
  }

  checkLinkScope = (node_source_target_id,type) => {
    switch(this.state.spida_filter.assigned_to){
      case true:
        if (node_source_target_id == 72){
          return (type == 'link') ? '#ff3d01' : '#9acb34'
        }else {
          return (type == 'link') ? '#ff3d01' : '#fffdf4'
        }
      break
      case false:
        return (type == 'link') ? '#f14603' : '#fffdf4'
      break
    }
  }

/*
  _addTaskToParent = (e) => {
    e.preventDefault()
    let client_task_params = [
      this.props.match.params,
      this.state.parent,
      this.state.type,
      this.state.task
    ]
    this.props.actions.addTaskToParent(client_task_params, this.props.account.subdomain)
    this.setState({
      task: {
        task_title: '',
        task_desc: ''
      }
    })
  }
*/
  retrieveTask = (id,action,type) => {
    const api_type = type
    if(action == 'details'){
      this.setState({
        task: id.data
      })
    }else {
      this.setState({
        parent: id.data.id,
        new_task: true,
        type: api_type
      })
    }
    //this.showDrawer()
  }

  changeTranslate = (e,zoom,node) => {
    console.log(node)
    //const point = localPoint(e)
    //const point = {x: -434.39004605833225, y: 500 / 2}
    //console.log(point)
    //console.log(point)
    const inv = zoom.applyInverseToPoint({x: 1000 / 2, y: 500 / 2})
    console.log(inv)
    //zoom.setTranslate({translateX: 1000 / 2, translateY: 500 / 2})
    //zoom.scale({scaleX: 1.1, scaleY: 1.1})
  //-434.39004605833225 x
  //4.164458423229405 y
    console.log(zoom)
  //  zoom.scale({scaleX: 1.1, scaleY: 1.1, point})

  }

  render() {
    console.log(this.props.account)
    console.log(this.props.account_users)

    const { name, className } = this.props;
    const {
      width = 1200,
      height = 400,
      margin = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
      }
    } = this.props;

    if(this.props.project_status && !this.props.fetched_tasks){
      this.props.actions.projectTasks(this.props.project.id,this.props.account.subdomain)
    }
    //, d => (d.isExpanded ? null : d.children)
    const data = this.props.tasks

    const { layout, orientation, linkType, stepPercent } = this.state;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;


    let origin;
    let sizeWidth;
    let sizeHeight;

    let task_drawer
    switch(this.state.new_task){
      case false:
        task_drawer = <TaskDrawerDetails task_details={this.state.task} />
        break;
      case true:
        task_drawer = <TaskDrawerAdd
                        task_details={this.state.task}
                        newtaskChange={this.newtaskChange}
                        addTaskToParent={this._addTaskToParent}
                      />
    }



    return (
      <div>
      <Container fluid className="p-0">
        <ProjectHeader
          props={this.props}
          toggleLink={this.toggle}
          assignedPipeline={this.assignedPipeline}
          spida_filter_assigned_to={this.state.spida_filter.assigned_to}
          spida_filter_due_asap={this.state.spida_filter.due_asap}
          spida_filter_due_this_week={this.state.spida_filter.due_this_week}
          data={data}
        />
      <div className={"popovertab tab " + className}>

        <TabContent style={{background: '#f3f0e3'}} activeTab={this.state.activeTab}>
        <TabPane tabId="1">
          <ProjectGramBig

            user={this.props.user}
            state={this.state}
            props={this.props}
            project={this.props.project}
            retrieveTask={this.retrieveTask}
            deleteTask={this._deleteTaskFromParent}
            task_details={this.state.task}
            newtaskChange={this.newtaskChange}
            newDueType={this.newDueType}
            newAssignTo={this.newAssignTo}
            newPriority={this.newPriority}
            newStatus={this.newStatus}
            addTaskToParent={this._addTaskToParent}
            account_users={this.props.account_users}
            project_team_members={this.props.project_team_members}
            changeTranslate={this.changeTranslate}
            assignedPipeline={this.assignedPipeline}
            spida_filter={this.state.spida_filter}
            checkLinkScope={this.checkLinkScope}
            dateRange={this.dateRange}
            spida_tasks={data}
            addTaskTags={this.addTaskTags}
          />

        </TabPane>
          <TabPane tabId="2">
          <ProjectStatistic
            props={this.props}
          />
        <Row>
          <Col lg="8" className="d-flex">
            <ProjectGram
              data={data}
              user={this.props.user}
              state={this.state}
              props={this.props}
              project={this.props.project}
              retrieveTask={this.retrieveTask}
              deleteTask={this._deleteTaskFromParent}
              task_details={this.state.task}
              newDueType={this.newDueType}
              newAssignTo={this.newAssignTo}
              newtaskChange={this.newtaskChange}
              newPriority={this.newPriority}
              newStatus={this.newStatus}
              addTaskToParent={this._addTaskToParent}
              account_users={this.props.account_users}
              project_team_members={this.props.project_team_members}
              changeTranslate={this.changeTranslate}
            />
          </Col>
          <Col lg="4" className="d-flex">

          </Col>
        </Row>
        <Row>
          <Col lg="6" xl="4" className="d-flex">

          </Col>
          <Col lg="6" xl="4" className="d-flex">

          </Col>
          <Col lg="6" xl="4" className="d-flex">

          </Col>
        </Row>
        <Row>
          <Col lg="6" xl="8" className="d-flex">

          </Col>
          <Col lg="6" xl="4" className="d-flex">

          </Col>
        </Row>
          </TabPane>
          <TabPane tabId="3">
            <h4 className="tab-title">Another one</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor tellus eget condimentum rhoncus. Aenean
              massa. Cum sociis natoque penatibus et magnis neque dis parturient
              montes, nascetur ridiculus mus.
            </p>
            <p>
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
              imperdiet a, venenatis vitae, justo.
            </p>
          </TabPane>
          <TabPane tabId="4">
            <h4 className="tab-title">Calender</h4>
            <ProjectCalendar />
          </TabPane>
        </TabContent>
      </div>

      <Drawer
        title={this.state.task.task_title}
        placement="right"
        closable={false}
        width={400}
        onClose={this.onClose}
        visible={this.state.visible}
        >
        {task_drawer}
      </Drawer>


  </Container>





      </div>
    );
  }
}


const gatherTasks = (task_state) => {
  return task_state
}

const mapStateToProps = (state, props) => ({
  user: state.user.user,
  account: state.user.account,
  account_users: state.user.account_users,
  project: state.project.project,
  project_team_members: state.project.project_team_members,
  project_status: state.project.project_status,
  tasks: gatherTasks(Object.assign({},state.task.tasks)),
  fetched_tasks: state.task.fetched_tasks
  }
)

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...projectActions,...taskActions}, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Project)
)
