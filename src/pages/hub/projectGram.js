import React from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import PopoverNode from './popoverNode'
import { Badge, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import {
  Tooltip,
  Popover,
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

const ProjectGram = ({
  changeTranslate,
  retrieveTask,
  deleteTask,
  newStatus,
  task_details,
  newtaskChange,
  newPriority,
  addTaskToParent,
  account_users,
  forceUpdate,
  data,
  state, props, theme }) => {
  console.log(props)
  console.log(account_users)
  const {
    width = 700,
    height = 400,
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
    <Card className="flex-fill w-100">
      <CardHeader>
        <Badge color="primary" className="float-right">
          Overview
        </Badge>
        <CardTitle tag="h5" className="mb-0">
          SpidaGram
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="chart chart-lg">
        <Zoom
          width={width}
          height={height}
          scaleXMin={1 / 2}
          scaleXMax={4}
          scaleYMin={1 / 2}
          scaleYMax={4}
          transformMatrix={state.initialTransform}
        >
        {zoom => {
          return(
            <svg width={width} height={height} style={{ cursor: zoom.isDragging ? 'grabbing' : 'grab' }}>
              <RectClipPath id="zoom-clip" width={800} height={800} />
              <LinearGradient  id="lg" from="#fd9b93" to="#fe6e9e" />
              <rect onWheel={zoom.handleWheel}
                      onMouseDown={zoom.dragStart}
                      onMouseMove={zoom.dragMove}
                      onMouseUp={zoom.dragEnd}
                      onMouseLeave={() => {
                        if (!zoom.isDragging) return;
                        zoom.dragEnd();
                      }} width={width} height={height} rx={14} fill="#fafafa" />

              <Group transform={zoom.toString()} top={margin.top} left={margin.left}>
                <Tree
                  root={hierarchy(data, d => (d.isExpanded ? null : d.children))}
                  size={[sizeWidth, sizeHeight]}
                  separation={(a, b) => (a.parent == b.parent ? 1 : 0.5) / a.depth}

                >
                  {data => (
                    <Group top={origin.y} left={origin.x}>
                      {data.links().map((link, i) => {
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
                            stroke={link.target.children ? '#e40000' : '#e40000'}
                            strokeWidth="1"
                            fill="none"
                            key={i}
                            onClick={() => console.log(link)}
                          />
                        );
                      })}

                      {data.descendants().map((node, key) => {
                        const width = 140;
                        const height = 50;

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
                                    node={node}
                                    update={forceUpdate}
                                    deleteTask={deleteTask}
                                    task_details={task_details}
                                    newtaskChange={newtaskChange}
                                    newPriority={newPriority}
                                    newStatus={newStatus}
                                    addTaskToParent={addTaskToParent}
                                    account_users={account_users}
                                    type='root'

                                  />
                                  </div>)} trigger="click">
                              <circle
                                r={15}
                                fill="#fbd24b"

                              />
                              </Popover>
                            )}
                            {node.depth !== 0 && (
                              <Popover placement="rightTop" content={(<div>
                                <PopoverNode
                                  name="Vertical icon"
                                  className="tab-vertical"
                                  retrieveTask={retrieveTask}
                                  node={node}
                                  update={forceUpdate}
                                  deleteTask={deleteTask}
                                  task_details={task_details}
                                  newtaskChange={newtaskChange}
                                  newPriority={newPriority}
                                  newStatus={newStatus}
                                  addTaskToParent={addTaskToParent}
                                  account_users={account_users}
                                  type='sub'


                                />
                              </div>)} trigger="click">
                              <rect
                                height={height}
                                width={width}
                                y={-height / 2}
                                x={-width / 2}
                                fill={'#faf8f0'}
                                stroke={node.data.children.length < 1 ? '#060125' : '#060125'}
                                strokeWidth={1}
                                strokeDasharray={node.data.children.length < 1 ? '2,2' : '0'}
                                strokeOpacity={node.data.children.length < 1 ? 0.6 : 1}
                                rx={!node.data.children.length < 1 ? 4 : 10}

                                onClick={()=> console.log(node)}
                              />
                              </Popover>
                            )}
                            <text
                              dy={'.33em'}
                              fontSize={20}
                              fontFamily="FontAwesome"
                              textAnchor={'middle'}
                              style={{ pointerEvents: 'none' }}
                              fill={node.depth === 0 ? '#000' : node.children ? '#000' : '#000'}
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
      </CardBody>
    </Card>
  );
};

export default connect(store => ({
  theme: store.theme.currentTheme
}))(ProjectGram);
