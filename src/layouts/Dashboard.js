import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter,useParams } from "react-router-dom";
import * as userActions from '../redux/actions/userActions'
import * as projectActions from '../redux/actions/projectActions'
import {bindActionCreators} from 'redux'
import {signOut} from '../redux/actions/userActions'
import Wrapper from "../components/Wrapper";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Settings from "../components/Settings";
import {ActionCableProvider,ActionCable} from 'react-actioncable-provider'
import {notification} from 'antd'

import {Col,Row} from 'reactstrap'

import Auth from '../auth'
class Dashboard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loggedIn: 'yes'
    }
    this.sign_out = this.sign_out.bind(this)
  }

  componentDidMount(){
    const { subdomain } = this.props.match.params
    this.props.actions.retrieveUserAccount(subdomain)
  }

  sign_out(e){
    e.preventDefault()
    this.props.actions.signOut()
  }

  handleOnline (response) {
      console.log(response)
      notification.open({
        message: response.user.email
      })
  }

  render(){
    const acc = Auth.fetchToken()['access-token']
    const cli = Auth.fetchToken()['client']
    const ui = Auth.fetchToken()['uid']
    const childrenWithProps = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, "test")
    })

    return(
      <React.Fragment>
    {/*}  <ActionCableProvider url={`http://localhost:3001/cable?uid=${ui}&token=${acc}&client=${cli}`}>
      <ActionCable
        ref={'onlineChannel'}
        channel={{ channel: 'OnlineChannel',account: this.props.account.id }}
        onReceived={this.handleOnline}
          >*/}
{
            this.props.account.init_account ? (
              <Main className="d-flex w-100 justify-content-center auth-main">
                  <Row className="h-100">
                    <Col sm="10" md="10" lg="10" className="mx-auto d-table h-100">
                      <div className="d-table-cell align-middle">
                      {childrenWithProps}
                      </div>
                    </Col>
                  </Row>

              </Main>



          ) : (
            <Wrapper>
              <Sidebar />
              <Main>
                <Navbar
                  account={this.props.account}
                  account_owner={this.props.account_owner}
                  account_users={this.props.account_users}
                  user={this.props.user}
                  sign_Out={this.sign_out} />
                <Content>
                {childrenWithProps}
                </Content>
                <Footer />
              </Main>
            </Wrapper>
          )
        }

      {/*}  </ActionCable>
        </ActionCableProvider>*/}
        <Settings />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, props) => ({
  user: state.user.user,
  account: state.user.account,
  account_users: state.user.account_users,
  account_owner: state.user.account_owner,
  pending_invites: state.user.pending_invites
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, userActions, projectActions), dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);
