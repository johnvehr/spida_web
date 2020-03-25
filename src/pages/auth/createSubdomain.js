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
import Illu from "../../assets/img/photos/timeline.svg";
import Logo from '../../assets/img/logo/fffdf6.png'


const CreateSubdomain = (props) => (
  <React.Fragment>
  <div className="col-8 col-md-6 col-lg-7 offset-md-1 order-md-2 mt-auto mt-md-0 pt-8 pb-4 py-md-11">
    <div data-aos="fade-left">
      <img src={Illu} alt="..." class="img-fluid"/>
    </div>
  </div>

<div className="col-12 col-md-3 col-lg-3 order-md-1 mb-auto mb-md-0 pb-8 py-md-11">
<img src={Logo} className="auth-main-logo" />
  <h1 className="mb-0 font-weight-bold text-center auth-title">
    Create Your Hub
  </h1>
  <p className="auth-mute-small mb-6 text-center text-muted">
    Your Hub is your main control room. Target might name their Hub..Target
  </p>

  <Form>
    <Form.Item>
    <Input
      name='subdomain'
      value={props.subdomain}
      onChange={props.signUpChange(props.subdomain)}
      size="large"
      placeholder="My Hub Name"
    />
    </Form.Item>
    <Button onClick={props.nextStep} color="primary" className="btn btn-block btn-primary btn-primary-lrg" type="submit">
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
