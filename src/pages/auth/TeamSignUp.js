import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as userActions from "../../redux/actions/userActions"
import {bindActionCreators} from 'redux';

import {
  Button,
  Form,
  Input,
  Icon,
  Item
} from 'antd'

class TeamSignUp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      team: '',
      invitation: '',
      full_name: '',
      email: '',
      password: '',
      origin: 1
    }
    this.teamSignUpChange = this.teamSignUpChange.bind(this)
  }

  componentDidMount(){
    this.setState({
      team: this.props.match.params.team,
      invitation: this.props.match.params.invitation
    })
  }

  teamSignUpChange = input => e => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    })
  }

  redirectResponse(res){
    this.props.history.push(`/${this.state.subdomain}/projects`)
  }

  signUpAndAccept = (e) => {
    e.preventDefault()
    const userParams = {
      full_name: this.state.full_name,
      email: this.state.email,
      password: this.state.password,
      origin: this.state.origin
    }
    const sub_domain = this.state.team
    const invit = this.state.invitation
    this.redirectResponse = this.redirectResponse.bind(this)
    this.props.actions.teamSignUp(userParams, invit,this.redirectResponse)
  }

  render(){
    return(
      <section class="section-border border-primary">
        <div class="container d-flex flex-column">
          <div class="row align-items-center justify-content-center no-gutters min-vh-100">
          <div>Welcome To {this.state.team} Sign Up
          <Form>
          <Form.Item>
            <Input
              name='full_name'
              value={this.state.full_name}
              onChange={this.teamSignUpChange(this.state.full_name)}
              size="large"
              placeholder="Full Name"
            />
        </Form.Item>
            <Form.Item>
              <Input
              name='email'
              value={this.state.email}
              onChange={this.teamSignUpChange(this.state.email)}
              />
            </Form.Item>
            <Form.Item>
              <Input
                name='password'
                value={this.state.password}
                onChange={this.teamSignUpChange(this.state.password)}
              />
            </Form.Item>
            <Form.Item>
              <Button onClick={this.signUpAndAccept}>Join the team</Button>
            </Form.Item>
          </Form>
          </div>
        </div>
      </div>
    </section>
    )
  }
}

const mapStateToProps = (state, props) => ({
  user: state.user.user,
  account: state.user.account
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TeamSignUp)
);
