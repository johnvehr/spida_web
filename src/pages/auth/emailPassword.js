import React from "react";
import { Link } from "react-router-dom";

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
  Item
} from "antd"
import Illu2 from "../../assets/img/photos/sign_up.svg";


const EmailPassword = (props) => (
  <React.Fragment>
  <div className="col-8 col-md-6 col-lg-7 offset-md-1 order-md-2 mt-auto mt-md-0 pt-8 pb-4 py-md-11">
    <div data-aos="fade-left">
      <img src={Illu2} alt="..." class="img-fluid"/>
    </div>
  </div>

<div className="col-12 col-md-5 col-lg-4 order-md-1 mb-auto mb-md-0 pb-8 py-md-11">
<img className="auth-main-logo" src={props.logo} />
  <h1 className="mb-0 font-weight-bold text-center">
    Sign In
  </h1>
  <p className="mb-4 text-center text-muted">
    A new way to manage
  </p>

  <Form>
    <Form.Item>
    <Input
      name='email'
      value={props.email}
      onChange={props.signInChange(props.email)}
      size="large"
      placeholder="Email"
    />
    </Form.Item>
    <Form.Item>
    <Input
      name='password'
      type="password"
      value={props.password}
      onChange={props.signInChange(props.password)}
      size="large"
      placeholder="Password"
    />
    </Form.Item>
    <Button onClick={props.submitSignIn} disabled={props.email.length < 1 ? true : false} color="primary" className="btn btn-block btn-primary btn-primary-lrg" type="submit">
      Create
    </Button>
  </Form>



  <p className="mb-0 font-size-sm text-center text-muted">
    Don't have an account? <Link to="/auth/sign-up">Sign Up</Link>
  </p>

</div>
  </React.Fragment>
);

export default EmailPassword;
