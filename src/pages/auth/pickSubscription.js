import React from "react";
import { Link } from "react-router-dom";

import AOS from 'aos'
import 'aos/dist/aos.css';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";
import {
  Form,
  Icon,
  Input,
  Item
} from "antd"
import Illu2 from "../../assets/img/photos/sign_up.svg";
import Logo from '../../assets/img/logo/fffdf6.png';
import { CheckSquare } from "react-feather";


const PickSubscription = (props) => {
  return (
        <React.Fragment>
          <div class="col-12 col-md-5 col-lg-10 py-8 py-md-11">
            <h1 class="mb-0 font-weight-bold text-center">
              Sign up
            </h1>
            <p class="mb-6 text-center text-muted">
              Simplify your workflow in minutes.
            </p>
            <div className="row align-items-center justify-content-center">
              <div class="col-12 col-md-5 col-lg-4 py-8 py-md-11">
              <Card>
                <CardBody>
                <div class="text-center mb-3">
                  <span class="badge badge-pill badge-primary-soft">
                    <span class="h6 text-uppercase">Basic</span>
                  </span>
                </div>
                <div class="d-flex justify-content-center">
                  <span class="h2 mb-0 mt-2">$</span>
                  <span class="price display-2 mb-0" data-annual="0" data-monthly="0">8</span>
                  <span class="h2 align-self-end mb-1">/mo</span>
                </div>
                <p class="text-center text-muted mb-5">
                  Includes 2 Guest
                </p>
                <div class="d-flex">
                  <div class="badge badge-rounded-circle badge-success-soft mt-1 mr-4">
                    <CheckSquare />
                  </div>
                  <p>
                    Real Time Collaboration
                  </p>
                </div>
                <div class="d-flex">
                  <div class="badge badge-rounded-circle badge-success-soft mt-1 mr-4">
                    <CheckSquare />
                  </div>
                  <p>
                    Unlimited Projects
                  </p>
                </div>
                <Button onClick={(e)=> props.submitSignUp(e,1)}>Get Started For Free</Button>

                </CardBody>
              </Card>
              </div>
              <div class="col-12 col-md-5 col-lg-4 py-8 py-md-11">
                <Card>
                  <CardBody>
                  <div class="text-center mb-3">
                    <span class="badge badge-pill badge-primary-soft">
                      <span class="h6 text-uppercase">Basic</span>
                    </span>
                  </div>
                  <div class="d-flex justify-content-center">
                    <span class="h2 mb-0 mt-2">$</span>
                    <span class="price display-2 mb-0" data-annual="0" data-monthly="0">55</span>
                    <span class="h2 align-self-end mb-1">/mo</span>
                  </div>
                  <p class="text-center text-muted mb-5">
                  Includes Up To 25 Team Members
                </p>
                <div class="d-flex">


                  <div class="badge badge-rounded-circle badge-success-soft mt-1 mr-4">
                    <i class="fe fe-check"></i>
                  </div>


                  <p>
                    Rich landing pages
                  </p>

                </div>
                <Button onClick={(e)=> props.submitSignUp(e,0)}>Get Started For Free</Button>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>


        </React.Fragment>
  )
}

export default PickSubscription
