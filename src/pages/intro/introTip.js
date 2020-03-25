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
  Item,
  notification
} from "antd"
import Illu from "../../assets/img/photos/chart.svg";
const IntroTip = (props) => {
  return(
    <section className="section-border border-primary">
    <div className="container d-flex flex-column">

      <div className="row align-items-center justify-content-center no-gutters min-vh-100">
   <div className="col-8 col-md-6 col-lg-7 offset-md-1 order-md-2 mt-auto mt-md-0 pt-8 pb-4 py-md-11">
        <div data-aos="fade-left">
          <img src={Illu} alt="..." class="img-fluid"/>
        </div>
      </div>

    <div className="col-12 col-md-3 col-lg-3 order-md-1 mb-auto mb-md-0 pb-8 py-md-11">

    <p className="auth-mute-small mb-6 text-center text-muted">
      When you layout a project on a whiteboard - you likely do it like this person. So thats how we display our tasks to you. Displayed in a hierarchy format which ultimately becomes your 'Spida Gram'
    </p>

        <Button onClick={props.gotIt} color="primary" className="btn btn-block btn-primary btn-primary-lrg" type="submit">
          Cool
        </Button>



    </div></div>
    </div>

    </section>
  )
}

export default IntroTip
