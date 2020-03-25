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
} from "reactstrap";
import {
  Form,
  Icon,
  Input,
  Item,
  notification
} from "antd"
import Illu from "../../assets/img/photos/task.svg";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';



const IntroTask = (props) => {
    return (
      <section className="section-border border-primary">
      <div className="container d-flex flex-column">

        <div className="row align-items-center justify-content-center no-gutters min-vh-100">
     <div className="col-8 col-md-6 col-lg-7 offset-md-1 order-md-2 mt-auto mt-md-0 pt-8 pb-4 py-md-11">
          <div data-aos="fade-left">
            <img src={Illu} alt="..." class="img-fluid"/>
          </div>
        </div>

      <div className="col-12 col-md-3 col-lg-3 order-md-1 mb-auto mb-md-0 pb-8 py-md-11">
      <h1 className="mb-0 font-weight-bold text-center auth-title">
        Lets invite some people
      </h1>
      <p className="auth-mute-small mb-6 text-center text-muted">
        Your Hub is your main control room. Target might name their Hub..Target
      </p>
        <Form>
          <Form.Item>
          <Input
            name='invite_email'
            value=''

            size="large"
            placeholder="Email"
          />
          </Form.Item>

          <Button   color="primary" className="btn btn-block btn-primary btn-primary-lrg" type="submit">
            Next
          </Button>
        </Form>

      </div></div>
      </div>

      </section>
    )
  }



export default IntroTask
