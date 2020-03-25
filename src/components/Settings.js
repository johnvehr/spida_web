import React from "react";
import { connect } from "react-redux";

import { toggleBoxedLayout } from "../redux/actions/layoutActions";
import { toggleStickySidebar } from "../redux/actions/sidebarActions";
import { toggleSidebar } from "../redux/actions/sidebarActions";
import { enableClassicTheme } from "../redux/actions/themeActions";
import { enableCorporateTheme } from "../redux/actions/themeActions";
import { enableModernTheme } from "../redux/actions/themeActions";
  import { Timeline } from 'antd';
import { Badge, Button } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import { Settings as SettingsIcon } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faShoppingCart
} from "@fortawesome/free-solid-svg-icons";

import screenshotClassic from "../assets/img/screenshots/theme-classic-small.png";
import screenshotCorporate from "../assets/img/screenshots/theme-corporate-small.png";
import screenshotModern from "../assets/img/screenshots/theme-modern-small.png";

class Settings extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false
    };
  }

  toggleSidebar() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isOpen } = this.state;
    const { layout, sidebar, dispatch } = this.props;

    return (
      <div className={"settings " + (isOpen ? "open" : "")}>
        <div className="settings-toggle" onClick={() => this.toggleSidebar()}>
          <SettingsIcon />
        </div>

        <div className="settings-panel">
          <div className="settings-content">
            <PerfectScrollbar>
              <div className="settings-title">
                <Button close onClick={() => this.toggleSidebar()} />

                <h4>Settings</h4>
              </div>

              <div className="settings-section">
                <small className="d-block text-uppercase font-weight-bold text-muted mb-2">
                  Activity
                </small>

                <ul className="settings-layouts">
                  <li>
                    <span
                      className="settings-layouts-item"
                      onClick={() =>
                        dispatch(toggleStickySidebar(), this.toggleSidebar())
                      }
                    >
                      {sidebar.isSticky ? "Static Sidebar" : "Sticky Sidebar"}
                      <Badge tag="small" className="float-right mt-1">
                        <FontAwesomeIcon icon={faAngleRight} />
                      </Badge>
                    </span>
                  </li>

                </ul>
              </div>

              <div className="settings-section">
                <small className="d-block text-uppercase font-weight-bold text-muted mb-2">
                Activity
                </small>

                <Timeline mode="alternate">
                  <Timeline.Item>Accepted invite 2015-09-01</Timeline.Item>
                  <Timeline.Item color="green">Viewed task 2015-09-01</Timeline.Item>
                  <Timeline.Item dot={<FontAwesomeIcon
                    icon={faShoppingCart}
                    className="text-white"
                   style={{ fontSize: '16px' }} />}>
                    John Marked Arch done.
                  </Timeline.Item>
                  <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
                  <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                  <Timeline.Item dot={<FontAwesomeIcon
                    icon={faShoppingCart}
                    className="text-white"
                   style={{ fontSize: '16px' }} />}>
                    Technical testing 2015-09-01
                  </Timeline.Item>
                </Timeline>



                <Button
                  color="primary"
                  block
                  size="lg"
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                >
              {/*}    <span className="align-middle">
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      className="text-white"
                    />{" "}
                  </span>*/}
                  <span className="align-middle">Upgrade</span>
                </Button>
              </div>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(store => ({
  layout: store.layout,
  sidebar: store.sidebar
}))(Settings);
