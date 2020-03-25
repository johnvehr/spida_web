import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter,useParams } from "react-router-dom";
import {retrieveUserAccount} from '../../redux/actions/userActions'
import {Button} from 'antd'
import { ShoppingCart, Activity, DollarSign, ShoppingBag } from "react-feather";
import {Container,Col,Row,Card,CardBody, Media} from 'reactstrap'
import {ActionCable} from 'react-actioncable-provider'

const first_name = (full_name) => {
  return full_name
}
const Hub = (props) => (
  <Container fluid className="p-0">
  <Row className="mb-2 mb-xl-4">
    <Col xs="auto" className="d-none d-sm-block">
      <h3>Welcome back, {props.user.full_name}!</h3>
    </Col>
  </Row>
  <Row>
    <Col md="6" xl>
      <Card className="flex-fill">
        <CardBody className="py-4">
          <Media>
            <div className="d-inline-block mt-2 mr-3">
              <ShoppingCart className="feather-lg text-primary" />
            </div>
            <Media body>
              <h3 className="mb-2">{props.projects.length}</h3>
              <div className="mb-0">Active Projects</div>
            </Media>
          </Media>
        </CardBody>
      </Card>
    </Col>
    <Col md="6" xl>
      <Card className="flex-fill">
        <CardBody className="py-4">
          <Media>
            <div className="d-inline-block mt-2 mr-3">
              <Activity className="feather-lg text-warning" />
            </div>
            <Media body>
              <h3 className="mb-2">17.212</h3>
              <div className="mb-0">Visitors Today</div>
            </Media>
          </Media>
        </CardBody>
      </Card>
    </Col>
    <Col md="6" xl>
      <Card className="flex-fill">
        <CardBody className="py-4">
          <Media>
            <div className="d-inline-block mt-2 mr-3">
              <DollarSign className="feather-lg text-success" />
            </div>
            <Media body>
              <h3 className="mb-2">$ 24.300</h3>
              <div className="mb-0">Total Earnings</div>
            </Media>
          </Media>
        </CardBody>
      </Card>
    </Col>
    <Col md="6" xl>
      <Card className="flex-fill">
        <CardBody className="py-4">
          <Media>
            <div className="d-inline-block mt-2 mr-3">
              <ShoppingBag className="feather-lg text-danger" />
            </div>
            <Media body>
              <h3 className="mb-2">43</h3>
              <div className="mb-0">Pending Orders</div>
            </Media>
          </Media>
        </CardBody>
      </Card>
    </Col>
    <Col md="6" xl className="d-none d-xxl-flex">
      <Card className="flex-fill">
        <CardBody className="py-4">
          <Media>
            <div className="d-inline-block mt-2 mr-3">
              <DollarSign className="feather-lg text-info" />
            </div>
            <Media body>
              <h3 className="mb-2">$ 18.700</h3>
              <div className="mb-0">Total Revenue</div>
            </Media>
          </Media>
        </CardBody>
      </Card>
    </Col>
  </Row>
  </Container>

)

const mapStateToProps = (state) => ({
    user: state.user.user,
    account: state.user.account,
    projects: state.project.projects
});

//const mapDispatchToProps = {  fetchSearchData};

export default connect(mapStateToProps,null)(Hub)
