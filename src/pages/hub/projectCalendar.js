import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Container } from "reactstrap";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

require("fullcalendar");
const $ = require("jquery");

class ProjectCalendar extends React.Component {
  constructor(){
    super()

  }

  render() {
      const calendarComponentRef = React.createRef()
    return (
      <Container fluid className="p-0">

      <FullCalendar
    defaultView="dayGridMonth"
    header={{
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    }}
    plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
    ref={ this.calendarComponentRef }
    events={[
      { title: 'event 1', start: '2020-03-01' , end: '2020-03-02'},
      { title: 'event 2', date: '2020-03-02' }
  ]}


    />

      </Container>
    );
  }
}

export default ProjectCalendar;
