import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter,useParams } from "react-router-dom";
import * as userActions from '../../redux/actions/userActions'
import * as projectActions from '../../redux/actions/projectActions'
import {bindActionCreators} from 'redux'

import {ActionCableProvider,ActionCable} from 'react-actioncable-provider'
import {notification, Steps} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {Col,Row} from 'reactstrap'
import AOS from 'aos'
import 'aos/dist/aos.css';
import IntroInvite from './introInvite'
import IntroProject from './introProject'
import IntroTip from './introTip'
import IntroTipTwo from './introTipTwo'
import IntroTask from './introTask'

class IntroController extends React.Component{
  constructor(){
    super()
    this.state = {
      invite_email: '',
      invites: [],
      invite_count: 0,
      current:1,
      project_title: ''
    }

    this.addInvite = this.addInvite.bind(this)
    this.createInvitesAndNext = this.createInvitesAndNext.bind(this)
    this.inviteChange = this.inviteChange.bind(this)
    this.createProjectAndNext = this.createProjectAndNext.bind(this)
    this.gotIt = this.gotIt.bind(this)
    this.newProjectChange = this.newProjectChange.bind(this)
    this.newProjectManagerChange = this.newProjectManagerChange.bind(this)
    this.newProjectTeamChange = this.newProjectTeamChange.bind(this)
  }

  componentDidMount(){
    const { subdomain } = this.props.match.params
    this.props.actions.retrieveUserAccount(subdomain)
  }

  inviteChange = input => e => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    })
  }

  gotIt() {
    this.setState({
      current: this.state.current + 1
    })
  }

  addInvite = (e) => {
    e.preventDefault()
    this.setState({
      invites: [
        ...this.state.invites,
        this.state.invite_email
      ]
    })
  }

  createInvitesAndNext = (e) => {
    e.preventDefault()
    const prep_invites = []
    this.state.invites.map((i) => {
      prep_invites.push({
        email: i,
        pending: true
      })
    })

    this.props.actions.sendInvite(prep_invites,this.props.account.subdomain)
    this.setState({
      current: this.state.current + 1
    })
  }

  newProjectChange = input => e => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    })
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

  createProjectAndNext = (e) => {
    this.setState({
      current: this.state.current + 1
    })
  }

  render(){
      AOS.init()
    const {Step} = Steps
    const { current } = this.state;
    const steps = [
      {
        title: 'Account',
        content: 'First-content',
      },
      {
        title: 'Project',
        content: 'Second-content',
      },
      {
        title: 'Spida Tip',
        content: 'Second-content',
      },
      {
        title: 'Spida',
        content: 'Last-content',
      },
      {
        title: 'Task',
        content: 'Last-content',
      }
    ];

    let intro_step
    switch(this.state.current){
      case 0:
       intro_step = <IntroInvite
        inviteChange={this.inviteChange}
        invite_email={this.state.invite_email}
        invites={this.state.invites}
        addInvite={this.addInvite}
        createInvitesAndNext={this.createInvitesAndNext}
        pending_invites={this.props.pending_invites}
        account={this.props.account}
        account_plan_name={this.props.account_plan_name}
        />
      break;
      case 1:
      intro_step = <IntroProject
        newProjectChange={this.newProjectChange}
        project_title={this.state.project_title}
        project_team={this.state.project_team}
        project_active={this.state.project_active}
        project_manager={this.state.project_manager}
        createProjectAndNext={this.createProjectAndNext}
        accont={this.props.account}
        newProjectManagerChange={this.newProjectManagerChange}
        newProjectTeamChange={this.newProjectTeamChange}
        pending_invites={this.props.pending_invites}
      />
      break
      case 2:
      intro_step = <IntroTip
      gotIt={this.gotIt}
      />
      break;
      case 3:
      intro_step = <IntroTipTwo
      gotIt={this.gotIt}
      />
      break;
      case 4:
      intro_step = <IntroTask

      />
    }

    return(
      <section class="section-border border-primary">
        <div class="container d-flex flex-column">
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
          <div class="row align-items-center justify-content-center no-gutters min-vh-100">
            {intro_step}
          </div>
        </div>
      </section>
    )
  }
}
const mapStateToProps = (state, props) => ({
  user: state.user.user,
  account: state.user.account,
  account_users: state.user.account_users,
  account_owner: state.user.account_owner,
  account_plan_name: state.user.account_subscription.plan_name,
  pending_invites: state.user.pending_invites
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, userActions, projectActions), dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IntroController)
);
