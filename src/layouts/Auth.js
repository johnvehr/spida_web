import React from "react";

import { Col, Container, Row } from "reactstrap";

import Main from "../components/Main";
import Settings from "../components/Settings";

const Auth = ({ children }) => (
  <React.Fragment>
    <Main className="d-flex w-100 justify-content-center auth-main">
        <Row className="h-100">
          <Col sm="10" md="10" lg="10" className="mx-auto d-table h-100">
            <div className="d-table-cell align-middle">{children}</div>
          </Col>
        </Row>

    </Main>

  </React.Fragment>
);

export default Auth;
