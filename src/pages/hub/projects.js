import React from "react"
import {connect} from "react-redux"
import {withRouter,Link} from "react-router-dom"


import * as projectActions from "../../redux/actions/projectActions"
import {bindActionCreators} from 'redux';
//font end
//import CoolGuy from '../../assets/img/cool_guy.png'
import {Modal,message,Badge,Avatar,Tooltip} from 'antd'
import {

  Button,
  Card,
  Spinner,
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
  Progress,
  Row,
  UncontrolledDropdown
} from "reactstrap";

import { MoreHorizontal } from "react-feather";

import avatar1 from "../../assets/img/avatars/avatar.jpg";
import avatar2 from "../../assets/img/avatars/avatar-2.jpg";
import avatar3 from "../../assets/img/avatars/avatar-3.jpg";
import NoProjects from "../../assets/img/photos/no_projects.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import ProjectIntro from "./projectIntro"

class Projects extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title: 'Projects',
      project: {
        project_title: "",
        project_desc: "",
        active: false
      },
      visible: false
    }
  }

  success = () => {
  Modal.success({
    content: (
    <div>
      <p>Check out our key</p>
      <p>some messages...some messages...</p>
    </div>
  ),
  });
}


  componentDidMount(){
    this.props.actions.projects(this.props.match.params.subdomain)
  }

  showModal = () => {
 this.setState({
   visible: true,
 });
};

genColor = () => {
  const a = '#'+Math.floor(Math.random()*16777215).toString(16);
  return a
}

handleOk = e => {
 console.log(e);
 this.setState({
   visible: false,
 });
};

handleCancel = e => {
 console.log(e);
 this.setState({
   visible: false,
 });
};

deleteThisProject = (id) => {
 this.props.deleteProject(id)
}

  render(){
    const Project = ({ name, state, color, percentage, description, key, uid, project_team, project_manager,project_active }) => (
    <Card className="project-list-card">
      <CardHeader className="px-4 pt-4 project-list-card-header">
        <div className="card-actions float-right">
          <UncontrolledDropdown>
            <DropdownToggle tag="a">
              <MoreHorizontal />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem><Link to={`/${this.props.account.subdomain}/projects/${uid}`}>Project Details</Link></DropdownItem>
              <DropdownItem onClick={() => this.deleteThisProject(uid)}>Delete Project</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <CardTitle tag="h5" className="mb-0">
          {name}
        </CardTitle>
        {/*
          <Badge className="my-2" color={color}>
          {state}
        </Badge>
        */}
      </CardHeader>
      <CardBody className="px-4 pt-2">
        <p>{description}</p>
        <h5>Project Manager</h5>
        <Avatar style={{ backgroundColor: this.genColor() }} className="rounded-circle mr-2" icon="user" />
              <h5>Team</h5>
        <ListGroup horizontal>

        {project_team ? (
          project_team.map((pt) => (
          <Tooltip placement="top" title={pt.user_id}>
            <ListGroupItem className="project-avatar-list-item"><Avatar className="rounded-circle mr-2" style={{ backgroundColor: this.genColor() }} icon="user" /></ListGroupItem>
          </Tooltip>
        ))) : (
          <p>No team</p>
        )
        }
        </ListGroup>
        <Badge status={project_active ? 'success' : 'warning'} text={project_active ? 'Active' : 'Inactive'} />
      </CardBody>
      {/* put progress bar here */}
    </Card>
  );

    let display_projects
    switch(this.props.account.init_account){
      case true:
      display_projects = <div className="text-center">
      <ProjectIntro />
      </div>
      break
      case false:
      display_projects = this.props.projects.map(sd =>
        <Col md="6" lg="3">
          <Project
            name={sd.project.project_title}
            state="Finished"
            color="success"
            percentage="100"
            description={sd.project.project_desc}
            project_manager={sd.project_manager}
            project_team={sd.project_team_members}
            project_active={sd.project.project_active}
            key={sd.project.id}
            uid={sd.project.id}
          />
        </Col>
      )
    }

    return(
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">{this.state.title}</h1>
        <Row>
          {display_projects}
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state, props) => ({
  account: state.user.account,
  projects: state.project.projects,
  loaded_projects: state.project.loaded_projects
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projectActions, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Projects)
);
