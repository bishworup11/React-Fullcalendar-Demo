import React, { useState, useEffect } from 'react';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import multiMonthYear from '@fullcalendar/multimonth';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import moment from 'moment-timezone'; // Ensure moment is imported
import Sidebar from './Sidebar';
import { INITIAL_EVENTS, createEventId } from './event-utils';

export default function MyCalendar() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState('local');
  const [selectedLocale, setSelectedLocale] = useState('en-US');

  useEffect(() => {
    const deviceTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setSelectedTimeZone(deviceTimeZone);
    
    const browserLocale = navigator.language;
    setSelectedLocale(browserLocale);
  }, []);

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleDateSelect(selectInfo) {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: moment(selectInfo.startStr).utc().format(), 
        end: moment(selectInfo.endStr).utc().format(),
        hour: "numeric",
        minute: "2-digit",
        meridiem: "short",
        allDay: selectInfo.allDay
      });
    }
  }

  function handleEventClick(clickInfo) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events);
  }

  function handleTimeZoneChange(e) {
    setSelectedTimeZone(e.target.value);
  }

  function handleLocalChange(e) {
    setSelectedLocale(e.target.value);
  }

  return (
    <div className='demo-app'>
      <Sidebar
        weekendsVisible={weekendsVisible}
        handleWeekendsToggle={handleWeekendsToggle}
        currentEvents={currentEvents}
        selectedTimeZone={selectedTimeZone}
        selectedLocale={selectedLocale}
        handleTimeZoneChange={handleTimeZoneChange}
        handleLocalChange={handleLocalChange}
      />
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthYear, momentTimezonePlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          themeSystem='solar'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS} 
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          timeZone={selectedTimeZone}
          locale={selectedLocale}
        />
      </div>
    </div>
  );
}

function renderEventContent(eventInfo) {
  const formattedTime = moment(eventInfo.event.start).format('hh:mm A');
  return (
    <>
       <b>{formattedTime}</b>
      {/* <b>{eventInfo.timeText}</b> */}
      <i>{eventInfo.event.title}</i>
    </>
  );
}
