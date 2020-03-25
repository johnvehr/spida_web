import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as userActions from "../../redux/actions/userActions"
import {bindActionCreators} from 'redux';
import Spin from './spinner'
import AOS from 'aos'
import 'aos/dist/aos.css';
import {
  Button,
  Card,
  CardBody,
} from "reactstrap";
import {
  Form,
  Icon,
  Input,
  Item,
  notification
} from "antd"
import Illu from "../../assets/img/photos/illustration-3.png";

import CreateSubdomain from "./createSubdomain"
import CreateEmailPassword from "./createEmailPassword"
import PickSubscription from "./pickSubscription"

class SignUp extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      approved_subdomain: false,
      subdomain: '',
      email: '',
      password: '',
      full_name: '',
      origin: 0,
      sub_step: 0,
      subscription_type: 0
    }
    this.signUpChange = this.signUpChange.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.pickSubscription = this.pickSubscription.bind(this)
  }

  componentDidMount(){
  //  window.location.hostname = "localhost"
  }

  signUpChange = input => e => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    })
    console.log(this.state.subdomain)
  }

  nextStep = (e) => {
    e.preventDefault()
    this.setState({
      approved_subdomain: true
    })
  }

  redirectResponse(res){
    this.props.history.push(`/${this.state.subdomain}/welcome`)
  }

  pickSubscription(){
    this.setState({
      sub_step: 1
    })
  }



  submitSignUp = (e,sub_type) => {
    e.preventDefault()
    const userParams = {
      email: this.state.email,
      password: this.state.password,
      full_name: this.state.full_name,
      origin: this.state.origin,
      'account_attributes': {
        subdomain: this.state.subdomain
      }
    }
    this.redirectResponse = this.redirectResponse.bind(this)
    this.props.actions.signUp(userParams, sub_type, this.redirectResponse)
  }

  render(){

    let sign_up_step
    switch(this.state.approved_subdomain){
      case false:
        sign_up_step = <CreateSubdomain signUpChange={this.signUpChange}  subdomain={this.state.subdomain} nextStep={this.nextStep} />
      break;
      case true:
        switch(this.state.sub_step){
          case 0:
          sign_up_step = <CreateEmailPassword signUpChange={this.signUpChange} subdomain={this.state.subdomain} email={this.state.email} password={this.state.password} full_name={this.state.full_name} pickSubscription={this.pickSubscription} />
          break
          case 1:
          sign_up_step = <PickSubscription pick_a_subscription={this.pick_a_subscription} subscription_type={this.subscription_type} submitSignUp={this.submitSignUp}/>
          break
        }

    }
    AOS.init()
    if(this.props.pending) return <Spin />
    return(
      <section class="section-border border-primary">
      <div class="container d-flex flex-column">
        <div class="row align-items-center justify-content-center no-gutters min-vh-100">
          {sign_up_step}
        </div>
      </div>
    </section>
    )
  }
}


const mapStateToProps = (state, props) => ({
  user: state.user.user,
  pending: state.user.pending,
  error: state.user.error
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
  )(SignUp)
);
