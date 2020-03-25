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
import Illu from "../../assets/img/photos/choose.svg";


const Subdomain = (props) => (
  <React.Fragment>
  <div className="col-8 col-md-6 col-lg-7 offset-md-1 order-md-2 mt-auto mt-md-0 pt-8 pb-4 py-md-11">
    <div data-aos="fade-left">
      <img src={Illu} alt="..." class="img-fluid"/>
    </div>
  </div>

<div className="col-12 col-md-5 col-lg-4 order-md-1 mb-auto mb-md-0 pb-8 py-md-11">
<img className="auth-main-logo" src={props.logo} />
  <h1 className="mb-0 font-weight-bold text-center">
    Choose Your Account
  </h1>

  <Form>
  <Form.Item>

    <Button onClick={props.goToAccount(props.account.subdomain)} className="btn btn-block btn-primary btn-primary-lrg" type="submit">
      {props.account.subdomain}
    </Button>


  </Form.Item>
    <Form.Item>
    {props.accounts.map((a) => (
      <Button onClick={props.goToAccount(a.subdomain)} className="btn btn-block btn-primary btn-primary-lrg" type="submit">
        {a.subdomain}
      </Button>
    ))}

    </Form.Item>
  </Form>




</div>
  </React.Fragment>
);

export default Subdomain;
