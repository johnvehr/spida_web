import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as userActions from "../../redux/actions/userActions"
import {bindActionCreators} from 'redux';
import Spin from '../hub/spinner'
import AOS from 'aos'
import 'aos/dist/aos.css';
import {
  Button,
  Card,
  CardBody,
  Row
} from "reactstrap";
import {
  Form,
  Icon,
  Input,
  Item,
  notification
} from "antd"
import Illu from "../../assets/img/photos/invite.svg";

const personal_message =   'With the personal Plan you can invite up to 2 guests!'
const enterprise_message = 'With the enterprise plan you can invite up to 25 team members. Lets invite a few and can always add more later'

const IntroInvite = (props) => {
  return (

<Row>
    <div className="col-8 col-md-6 col-lg-7 offset-md-1 order-md-2 mt-auto mt-md-0 pt-8 pb-4 py-md-11">
          <div data-aos="fade-left">
            <img src={Illu} alt="..." class="img-fluid"/>
          </div>
        </div>

      <div className="col-12 col-md-5 col-lg-4 order-md-1 mb-auto mb-md-0 pb-8 py-md-11">
      <h1 className="mb-0 font-weight-bold text-center auth-title">
        Lets invite some people
      </h1>
      <p className="auth-mute-small text-center text-muted">
      {props.account_plan_name == 'personal' ? personal_message : enterprise_message}
      </p>
      {props.invites.map((i) => (
        <p>{i}</p>
      ))}
        <Form>
          <Form.Item>
          <Input
            name='invite_email'
            value={props.invite_email}
            onChange={props.inviteChange(props.invite_email)}
            size="large"
            placeholder="Email"
          />
          </Form.Item>
          <Button disabled={props.invites.length == 2 ? true : false} onClick={props.addInvite}color="primary" className="btn btn-block btn-primary btn-primary-lrg" type="submit">
            Add
          </Button>
          <Button onClick={props.createInvitesAndNext} color="primary" className="btn btn-block btn-primary btn-primary-lrg" type="submit">
            Next
          </Button>
        </Form>

      </div>
</Row>
  )
  }



export default IntroInvite
