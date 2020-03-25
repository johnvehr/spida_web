import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as userActions from "../../redux/actions/userActions"
import {bindActionCreators} from 'redux';
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
import Illu from "../../assets/img/photos/sign_up.svg";
import SpidaLogo from "../../assets/img/logo/fffdf6.png"
import EmailPassword from "./emailPassword"
import Subdomain from "./subdomain"

class SignIn extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      approved_subdomain: false,
      subdomain: '',
      email: '',
      password: ''
    }
    this.signInChange = this.signInChange.bind(this)
    this.goToAccount = this.goToAccount.bind(this)
  }

  signInChange = input => e => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    })
  }

  goToAccount = (subdomain) => (e) => {
    e.preventDefault()
    //this.props.onlineStatus(subdomain)
    this.props.history.push(`/${subdomain}/projects`)
  }

  redirectResponse(res){
    this.props.history.push(`/${this.state.subdomain}`)
  }

  submitSignIn = (e) => {
    e.preventDefault()
    const userParams = {
      email: this.state.email,
      password: this.state.password
    }
    //this.redirectResponse = this.redirectResponse.bind(this)
    this.props.actions.signIn(userParams)
  }

  render(){

    let sign_in_step
    switch(this.props.logged_in){
      case false:
        sign_in_step = <EmailPassword logo={SpidaLogo} submitSignIn={this.submitSignIn} signInChange={this.signInChange} email={this.state.email} password={this.state.password} nextStep={this.nextStep} />
      break;
      case true:
        sign_in_step = <Subdomain logo={SpidaLogo} goToAccount={this.goToAccount} account={this.props.account} accounts={this.props.accounts} signInChange={this.signInChange} subdomain={this.state.subdomain} email={this.state.email} password={this.state.password} submitSignIn={this.submitSignIn} />
    }
    AOS.init()
    return(
      <section class="section-border border-primary">
      <div class="container d-flex flex-column">
        <div class="row align-items-center justify-content-center no-gutters min-vh-100">
          {sign_in_step}
        </div>
      </div>
    </section>
    )
  }
}

const mapStateToProps = (state, props) => ({
  user: state.user.user,
  account: state.user.account,
  accounts: state.user.accounts,
  logged_in: state.user.logged_in,
  grouped_accounts: {
    my_account: state.user.account,
    belong_to_accounts: state.user.accounts
  }
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
  )(SignIn)
);
