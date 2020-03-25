import React from "react";
import classnames from "classnames";

import {
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap";

import {DatePicker,Divider,Form,Input,Item,Badge,Button,Icon,Radio,Slider,Select} from 'antd'

import { Home, Settings, MessageSquare,Users,GitMerge,Plus } from "react-feather";

import PopoverNodeAdd from './popoverNodeAdd'
import PopoverNodeDetail from './popoverNodeDetail'
import PopoverNodeActionHeader from './popoverNodeActionHeader'
const {TextArea} = Input
const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
class PopoverNode extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  onChange = (date, dateString) => {
  console.log(date, dateString);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    console.log(this.props)

    const {className} = this.props
    return (
    this.props.type_id == 'root' ? (
      <div className={"tab " + className}>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              <Home />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              <Plus />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              <Users />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "4" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              <GitMerge/>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>

          <TabPane tabId="1">
          <PopoverNodeDetail
            props={this.props}
          />
          </TabPane>

          <TabPane tabId="2">
            <PopoverNodeAdd
              props={this.props}
            />
          </TabPane>

          <TabPane tabId="3">

          </TabPane>

        </TabContent>
      </div>
    ): (
      <div style={{background: '#fffdf4'}} className={"tab " + className}>
        <Nav tabs style={{background: '#fffdf4'}}>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              <Home />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              <Plus />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              <Users />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "4" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              <GitMerge/>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent style={{background: '#fffdf4'}} activeTab={this.state.activeTab}>

          <TabPane tabId="1">
          <PopoverNodeActionHeader
            props={this.props}
          />
          <PopoverNodeDetail
            props={this.props}
          />
          </TabPane>

          <TabPane tabId="2">
            <PopoverNodeAdd
              props={this.props}
            />
          </TabPane>

          <TabPane tabId="3">

          </TabPane>

        </TabContent>
      </div>
    )
  )

  }
}

export default PopoverNode
