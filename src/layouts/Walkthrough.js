import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter,useParams } from "react-router-dom";
import * as userActions from '../redux/actions/userActions'
import * as projectActions from '../redux/actions/projectActions'
import {bindActionCreators} from 'redux'
import {ActionCableProvider,ActionCable} from 'react-actioncable-provider'

import { Col, Container, Row } from "reactstrap";

import Main from "../components/Main";
import Settings from "../components/Settings";
import NavbarSimple from '../components/NavbarSimple'

const Walkthrough = ({children}) => {
    return(
      <React.Fragment>
        <Main className="d-flex w-100 justify-content-center auth-main">
        <NavbarSimple />
            <Row className="h-100">
              <Col sm="10" md="10" lg="10" className="mx-auto d-table h-100">
                <div className="d-table-cell align-middle">{children}</div>
              </Col>
            </Row>

        </Main>

      </React.Fragment>
    )
  }

export default Walkthrough
