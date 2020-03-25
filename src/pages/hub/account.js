import React from "react"
import {connect} from "react-redux"
import {withRouter,Link} from "react-router-dom"
import {bindActionCreators} from 'redux';
import * as userActions from "../../redux/actions/userActions"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
  UncontrolledDropdown
} from "reactstrap";
import {Table, Badge, Menu, Icon } from 'antd'

import classnames from "classnames";

import { MoreHorizontal } from "react-feather";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import avatar1 from "../../assets/img/avatars/avatar.jpg";

const Navigation = ({state,toggle}) => (
  <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        General
      </CardTitle>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem tag="a" action className={classnames({ active: state.activeTab === "1" })} onClick={() => {
        toggle("1");
      }}>
        Account
      </ListGroupItem>
      <ListGroupItem tag="a" action className={classnames({ active: state.activeTab === "2" })} onClick={() => {
        toggle("2");
      }}>
        Team
      </ListGroupItem>
      <ListGroupItem tag="a" action className={classnames({ active: state.activeTab === "3" })} onClick={() => {
        toggle("3");
      }}>
        Privacy & Notifications
      </ListGroupItem>

    </ListGroup>
  </Card>
);

const Invite = (props) => (
  <Card>
    <CardHeader>
      <div className="card-actions float-right">
        <UncontrolledDropdown>
          <DropdownToggle tag="a">
            <MoreHorizontal />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem>Something else here</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <CardTitle tag="h5" className="mb-0">
        Team
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Form>
        <Row>
          <Col md="8">
            <FormGroup>
              <Label for="inputUsername">Email</Label>
              <Input
              name="invite_email"
              value={props.invite_email}
              onChange={props.inviteChange(props.invite_email)}
              />
            </FormGroup>

          </Col>
          <Col md="4">
            <small>Pending Invites</small>

          </Col>
        </Row>

        <Button color="primary" onClick={props.sendInvite}>Send Invite</Button>
      </Form>
    </CardBody>
  </Card>
);

const Team = ({props,columns,data}) => (
  <Card>
    <CardHeader>
      <div className="card-actions float-right">
        <UncontrolledDropdown>
          <DropdownToggle tag="a">
            <MoreHorizontal />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem>Something else here</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <CardTitle tag="h5" className="mb-0">
        Team
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Table
      className="components-table-demo-nested"
      columns={columns}

      dataSource={data}
      />
    </CardBody>
  </Card>
);

const PrivateInfo = () => (
  <Card>
    <CardHeader>
      <div className="card-actions float-right">
        <UncontrolledDropdown>
          <DropdownToggle tag="a">
            <MoreHorizontal />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem>Something else here</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <CardTitle tag="h5" className="mb-0">
        Private info
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Form>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="firstName">First name</Label>
              <Input
                type="text"
                name="text"
                id="firstName"
                placeholder="First name"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="lastName">Last name</Label>
              <Input
                type="text"
                name="text"
                id="lastName"
                placeholder="Last name"
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" placeholder="Email" />
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input
            type="text"
            name="address"
            id="address"
            placeholder="1234 Main St"
          />
        </FormGroup>
        <FormGroup>
          <Label for="address2">Address 2</Label>
          <Input
            type="text"
            name="address2"
            id="address2"
            placeholder="Apartment, studio, or floor"
          />
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="city">City</Label>
              <Input type="text" name="city" id="city" />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="state">State</Label>
              <Input type="select" name="state" id="state">
                <option>Choose...</option>
                <option>...</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for="zipcode">Zip</Label>
              <Input type="text" name="zip" id="zipcode" />
            </FormGroup>
          </Col>
        </Row>

        <Button color="primary">Save changes</Button>
      </Form>
    </CardBody>
  </Card>
);

class Settings extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      activeTab: "1",
      invite_email: ''
    }
    this.inviteChange = this.inviteChange.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  toggle(tab) {
    console.log(tab)
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  inviteChange = input => e => {
    const name = e.target.name
    this.setState({
      [name]: e.target.value
    })
  }

  sendInvite = () => {
    const invt = {
      invite: this.state.invite_email,
      subdomain: this.props.account.subdomain
    }
    this.props.actions.sendInvite(invt)
  }

  render(){
    console.log(this.props.pending_invites)
    console.log(this.props.account_users)
    const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Department', dataIndex: 'department', key: 'department' },
    { title: 'Email', dataIndex: 'email', key: 'email' }
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: 'Joe Doe',
      department: 'Engineering',
      email: 'example@example.com'
    });
  }
    let accountProfile
    switch(this.state.activeTab){
      case '1':
      accountProfile = <PrivateInfo />
      break;
      case '2':
      accountProfile = <div>
      <Invite sendInvite={this.sendInvite} invite_email={this.state.invite_email} inviteChange={this.inviteChange} />
      <Team columns={columns} data={this.props.account_users} sendInvite={this.sendInvite} invite_email={this.state.invite_email} inviteChange={this.inviteChange} />

      </div>
      break;
    }

    return(
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Settings</h1>

        <Row>
          <Col md="3" xl="2">
            <Navigation state={this.state} toggle={this.toggle}  />
          </Col>
          <Col md="9" xl="10">
            {accountProfile}
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state, props) => ({
  account: state.user.account,
  account_users: state.user.account_users,
  account_owner: state.user.account_owner,
  pending_invites: state.user.pending_invites
})

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Settings)
)
