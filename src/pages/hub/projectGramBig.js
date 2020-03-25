import React from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import PopoverNode from './popoverNode'
import { Badge, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import {
  Tooltip,
  Popover,
  Dropdown,
  Popconfirm,
  Message,
  Button,
  Drawer,
  Form,
  Input,
  Item,
  Icon,
  Menu,
  Progress
} from 'antd'
import { Group } from '@vx/group';
import { Tree } from '@vx/hierarchy';
import { LinearGradient } from '@vx/gradient';
import {Zoom} from '@vx/zoom'
import {localPoint} from '@vx/event'
import {scaleLinear} from '@vx/scale'
import { hierarchy } from 'd3-hierarchy';
import { pointRadial } from 'd3-shape';
import { RectClipPath } from '@vx/clip-path';
import {
  LinkHorizontal,
  LinkVertical,
  LinkRadial,
  LinkHorizontalStep,
  LinkVerticalStep,
  LinkRadialStep,
  LinkHorizontalCurve,
  LinkVerticalCurve,
  LinkRadialCurve,
  LinkHorizontalLine,
  LinkVerticalLine,
  LinkRadialLine
} from '@vx/shape';

const ProjectGramBig = ({
  changeTranslate,
  retrieveTask,
  user,
  deleteTask,
  newStatus,
  task_details,
  newtaskChange,
  newAssignTo,
  newDueType,
  newPriority,
  addTaskToParent,
  project,
  account_users,
  project_team_members,
  forceUpdate,
  data,
  assignedPipeline,
  spida_filter,
  checkLinkScope,
  spida_tasks,
  dateRange,
  addTaskTags,
  state, props, theme }) => {
  console.log(data)
  console.log(account_users)
  const {
    width = 1000,
    height = 1000,
    margin = {
      top: 10,
      left: 10,
      right: 10,
      bottom: 10
    }
  } = props;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const { layout, orientation, linkType, stepPercent } = state;
  let origin;
  let sizeWidth;
  let sizeHeight;
  if (state.layout === 'polar') {
    origin = {
      x: innerWidth / 2,
      y: innerHeight / 2
    };
    sizeWidth = 2 * Math.PI;
    sizeHeight = Math.min(innerWidth, innerHeight) / 2;
  } else {
    origin = { x: 0, y: 0 };
    if (orientation === 'vertical') {
      sizeWidth = innerWidth;
      sizeHeight = innerHeight;
    } else {
      sizeWidth = innerHeight;
      sizeHeight = innerWidth;
    }
  }

  return (
    <div>
        <Zoom
          width={width}
          height={height}
          scaleXMin={1 / 2}
          scaleXMax={4}
          scaleYMin={1 / 2}
          scaleYMax={4}
          transformMatrix={spida_tasks.children > 0 ? state.initialTransform : {scaleX: 1.27,
          scaleY: 1.27,
          translateX: width / 2,
          translateY: 0,
          skewX: 0,
          skewY: 0}}
        >
        {zoom => {
          return(
            <svg width={width} height={height} style={{ cursor: zoom.isDragging ? 'grabbing' : 'grab' }}>
              <RectClipPath id="zoom-clip" width={800} height={800} />
              <LinearGradient  id="lg" from="#fd9b93" to="#fe6e9e" />\

              <rect onWheel={zoom.handleWheel}
                      onMouseDown={zoom.dragStart}
                      onMouseMove={zoom.dragMove}
                      onMouseUp={zoom.dragEnd}
                      onMouseLeave={() => {
                        if (!zoom.isDragging) return;
                        zoom.dragEnd();
                      }} width={width} height={height} rx={14} fill="#f3f0e3" />

              <Group transform={zoom.toString()} top={margin.top} left={margin.left}>
                <Tree
                  root={hierarchy(spida_tasks,d => (d.isExpanded ? null : d.children))}
                  size={[sizeWidth, sizeHeight]}
                  separation={(a, b) => (a.parent == b.parent ? 1 : 0.5) / a.depth}

                >
                  {spida_tasks => (
                    <Group top={origin.y} left={origin.x}>
                      {spida_tasks.links().map((link, i) => {
                        let LinkComponent;

                        if (layout === 'polar') {
                          if (linkType === 'step') {
                            LinkComponent = LinkRadialStep;
                          } else if (linkType === 'curve') {
                            LinkComponent = LinkRadialCurve;
                          } else if (linkType === 'line') {
                            LinkComponent = LinkRadialLine;
                          } else {
                            LinkComponent = LinkRadial;
                          }
                        } else {
                          if (orientation === 'vertical') {
                            if (linkType === 'step') {
                              LinkComponent = LinkVerticalStep;
                            } else if (linkType === 'curve') {
                              LinkComponent = LinkVerticalCurve;
                            } else if (linkType === 'line') {
                              LinkComponent = LinkVerticalLine;
                            } else {
                              LinkComponent = LinkVertical;
                            }
                          } else {
                            if (linkType === 'step') {
                              LinkComponent = LinkHorizontalStep;
                            } else if (linkType === 'curve') {
                              LinkComponent = LinkHorizontalCurve;
                            } else if (linkType === 'line') {
                              LinkComponent = LinkHorizontalLine;
                            } else {
                              LinkComponent = LinkHorizontal;
                            }
                          }
                        }

                        return (
                          <LinkComponent
                            data={link}
                            percent={+stepPercent}
                            stroke={checkLinkScope(link.target.data.assigned_to,'link')}
                            strokeDasharray={'2,2'}
                            strokeWidth="1"
                            fill="none"
                            key={i}
                            onClick={() => console.log(link)}
                          />
                        );
                      })}

                      {spida_tasks.descendants().map((node, key) => {
                        //const add_to = node.children ? node.children.length * 20 : 0
                        //const width = add_to + 180
                        //const height = add_to + 50
                        const width = node.depth == 1 ? 180 : 120;
                        const height = node.depth == 1 ? 70 : 50;

                        let top;
                        let left;
                        if (layout === 'polar') {
                          const [radialX, radialY] = pointRadial(node.x, node.y);
                          top = radialY;
                          left = radialX;
                        } else {
                          if (orientation === 'vertical') {
                            top = node.y;
                            left = node.x;
                          } else {
                            top = node.x;
                            left = node.y;
                          }
                        }


                        return (

                          <Group top={top} left={left} key={key}>
                            {node.depth === 0 && (
                                <Popover placement="rightTop" content={(<div>
                                  <PopoverNode
                                    name="Vertical icon"
                                    className="tab-vertical"
                                    retrieveTask={retrieveTask}
                                    user={user}
                                    node={node}
                                    update={forceUpdate}
                                    deleteTask={deleteTask}
                                    task_details={task_details}
                                    newDueType={newDueType}
                                    newAssignTo={newAssignTo}
                                    newtaskChange={newtaskChange}
                                    newPriority={newPriority}
                                    newStatus={newStatus}
                                    addTaskToParent={addTaskToParent}
                                    project={project}
                                    account_users={account_users}
                                    project_team_members={project_team_members}
                                    dateRange={dateRange}
                                    type_id='root'

                                  />
                                  </div>)} trigger="click">
                                  <Dropdown overlay={<Menu>
                                    <Menu.Item key="1">1st menu item</Menu.Item>
                                    <Menu.Item key="2">2nd menu item</Menu.Item>
                                    <Menu.Item key="3">3rd menu item</Menu.Item>
                                  </Menu>} trigger={['contextMenu']}>
                                  <circle
                                    r={15}
                                    fill="#060125"

                                  />
                                  </Dropdown>
                              </Popover>
                            )}
                            {node.depth !== 0 && (
                              <Popover placement="rightTop" content={(<div>
                                <PopoverNode
                                  name="Vertical icon"
                                  className="tab-vertical"
                                  retrieveTask={retrieveTask}
                                  user={user}
                                  node={node}
                                  update={forceUpdate}
                                  deleteTask={deleteTask}
                                  task_details={task_details}
                                  newtaskChange={newtaskChange}
                                  newDueType={newDueType}
                                  newAssignTo={newAssignTo}
                                  newPriority={newPriority}
                                  newStatus={newStatus}
                                  addTaskToParent={addTaskToParent}
                                  project={project}
                                  account_users={account_users}
                                  project_team_members={project_team_members}
                                  dateRange={dateRange}
                                  type_id='sub'
                                  addTaskTags={addTaskTags}

                                />
                              </div>)} trigger="click">
                              <Dropdown overlay={<Menu>
                                <Menu.Item onClick={()=> {
                                  node.data.isExpanded = !node.data.isExpanded
                                  this.forceUpdate()
                                }}
                           key="1">Expand</Menu.Item>
                                <Menu.Item key="2">2nd menu item</Menu.Item>
                                <Menu.Item key="3">3rd menu item</Menu.Item>
                              </Menu>} trigger={['contextMenu']}>
                              <rect
                                height={height}
                                width={width}
                                y={-height / 2}
                                x={-width / 2}
                                fill={checkLinkScope(node.data.assigned_to,'rect')}
                                stroke={node.data.children.length < 1 ? '#fffdf4' : '#fffdf4'}
                                strokeWidth={1}
                                strokeDasharray={node.data.children.length < 1 ? '2,2' : '0'}
                                strokeOpacity={node.data.children.length < 1 ? 0.6 : 1}
                                rx={!node.data.children.length < 1 ? 4 : 10}
                                onClick={()=> console.log(node)}

                              />
                              </Dropdown>
                              </Popover>
                            )}
                            <text
                              dy={'.33em'}
                              fontSize={20}
                              fontFamily="sans-serif"
                              textAnchor={'middle'}
                              style={{ pointerEvents: 'none' }}
                              fill={node.depth === 0 ? '#5e5c57' : node.children ? '#5e5c57' : '#5e5c57'}
                            >
                              {node.data.task_title}
                            </text>
                          </Group>

                        );
                      })}
                    </Group>

                  )}
                </Tree>
              </Group>
            </svg>
          )
        }}

            </Zoom>
        </div>

  );
};

export default connect(store => ({
  theme: store.theme.currentTheme
}))(ProjectGramBig);
