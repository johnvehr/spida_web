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
import Logo from '../../assets/img/logo/fffdf6.png';

const CreateSubdomain = (props) => (
  <React.Fragment>
  <div className="col-8 col-md-6 col-lg-7 offset-md-1 order-md-2 mt-auto mt-md-0 pt-8 pb-4 py-md-11">
    <div data-aos="fade-left">
      <img src={Illu2} alt="..." class="img-fluid"/>
    </div>
  </div>

<div className="col-12 col-md-3 col-lg-3 order-md-1 mb-auto mb-md-0 pb-8 py-md-11">
  <img src={Logo} className="auth-main-logo" />
  <h1 className="mb-0 font-weight-bold text-center auth-title">
    Last Step
  </h1>
  <p className="mb-6 text-center text-muted">
    Nice work creating your new Hub! Your personal access link is now <span className="new-access-link">app.cilio.com/{props.subdomain}</span>
  </p>

  <Form>
    <Form.Item>
      <Input
        name='full_name'
        value={props.full_name}
        onChange={props.signUpChange(props.full_name)}
        size="large"
        placeholder="Full Name"
      />
  </Form.Item>
    <Form.Item>
    <Input
      name='email'
      value={props.email}
      onChange={props.signUpChange(props.email)}
      size="large"
      placeholder="Email"
    />
    </Form.Item>
    <Form.Item>
    <Input
      name='password'
      type='password'
      value={props.password}
      onChange={props.signUpChange(props.password)}
      size="large"
      placeholder="Password"
    />
    </Form.Item>
    <Button onClick={props.pickSubscription} disabled={props.email.length < 1 ? true : false} color="primary" className="btn btn-block btn-primary btn-primary-lrg" type="submit">
      Create
    </Button>
  </Form>



  <p className="mb-0 font-size-sm text-center text-muted">
    Already Have an Account? <Link to="/auth/sign-in">Sign in</Link>
  </p>

</div>
  </React.Fragment>
);

export default CreateSubdomain;
