import React, { useState, useEffect, useRef } from 'react';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import multiMonthYear from '@fullcalendar/multimonth';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import moment from 'moment-timezone';
import Sidebar from './Sidebar';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import 'moment-timezone/data/packed/latest.json';

// Custom Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {children}
        <div className="absolute top-4 right-4">
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default function MyCalendar() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState('local');
  const [selectedLocale, setSelectedLocale] = useState('en-US');
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isViewEventModalOpen, setIsViewEventModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const calendarRef = useRef(null);
  const [selectInfo, setSelectInfo] = useState(null);

  useEffect(() => {
    const deviceTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'; 
    setSelectedTimeZone(deviceTimeZone);
    const browserLocale = navigator.language;
    setSelectedLocale(browserLocale);
  }, []);

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleDateSelect(selectInfo) {
    setSelectInfo(selectInfo);
    setNewEvent({
      title: '',
      description: '',
      start: moment(selectInfo.startStr).format(),
      end: moment(selectInfo.endStr).format(),
    });
    setIsAddEventModalOpen(true);
  }

  function handleAddEvent() {
    if (newEvent.title && selectInfo) {
      const calendarApi = selectInfo.view.calendar;
      
      calendarApi.addEvent({
        id: createEventId(),
        title: newEvent.title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        extendedProps: {
          description: newEvent.description
        },
        allDay: selectInfo.allDay
      });

      setIsAddEventModalOpen(false);
      setNewEvent({ title: '', description: '', start: '', end: '' });
      setSelectInfo(null);
      calendarApi.unselect();
    }
  }

  function handleEventClick(clickInfo) {
    setSelectedEvent({
      title: clickInfo.event.title,
      description: clickInfo.event.extendedProps?.description || '',
      start: moment(clickInfo.event.start).format('MMMM Do YYYY, h:mm a'),
      end: moment(clickInfo.event.end).format('MMMM Do YYYY, h:mm a'),
      eventObj: clickInfo.event
    });
    setIsViewEventModalOpen(true);
  }

  function handleDeleteEvent() {
    if (confirm(`Are you sure you want to delete the event '${selectedEvent.title}'`)) {
      selectedEvent.eventObj.remove();
      setIsViewEventModalOpen(false);
    }
  }

  function handleEvents(events) {
    setCurrentEvents(events);
    console.log(events);
  }

  const handleEventNavigation = (date) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(date);
  };

  return (
    <div className="demo-app">
      <Sidebar
        weekendsVisible={weekendsVisible}
        handleWeekendsToggle={handleWeekendsToggle}
        currentEvents={currentEvents}
        selectedTimeZone={selectedTimeZone}
        selectedLocale={selectedLocale}
        handleTimeZoneChange={(e) => setSelectedTimeZone(e.target.value)}
        handleLocalChange={(e) => setSelectedLocale(e.target.value)}
        onEventClick={handleEventNavigation}
      />
      
      <div className="demo-app-main">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthYear, momentTimezonePlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView="dayGridMonth"
          themeSystem="solar"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS}
          select={handleDateSelect}
          eventContent={(eventInfo) => renderEventContent(eventInfo, selectedTimeZone)}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          timeZone={selectedTimeZone}
          locale={selectedLocale}
        />

        {/* Add Event Modal */}
        <Modal 
          isOpen={isAddEventModalOpen} 
          onClose={() => {
            setIsAddEventModalOpen(false);
            setSelectInfo(null);
          }}
        >
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Add New Event</h2>
            <p className="text-gray-600">Enter event details below</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Event title"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Event description"
                className="w-full px-3 py-2 border rounded-md"
                rows="3"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <button
              onClick={() => {
                setIsAddEventModalOpen(false);
                setSelectInfo(null);
              }}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleAddEvent}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Event
            </button>
          </div>
        </Modal>

        {/* View/Delete Event Modal */}
        <Modal 
          isOpen={isViewEventModalOpen} 
          onClose={() => setIsViewEventModalOpen(false)}
        >
          {selectedEvent && (
            <>
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Event Details</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <p className="px-3 py-2 bg-gray-50 rounded-md">{selectedEvent.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <p className="px-3 py-2 bg-gray-50 rounded-md">{selectedEvent.description}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Start Time</label>
                  <p className="px-3 py-2 bg-gray-50 rounded-md">{selectedEvent.start}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Time</label>
                  <p className="px-3 py-2 bg-gray-50 rounded-md">{selectedEvent.end}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={() => setIsViewEventModalOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  Close
                </button>
                <button
                  onClick={handleDeleteEvent}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete Event
                </button>
              </div>
            </>
          )}
        </Modal>
      </div>
    </div>
  );
}

function renderEventContent(eventInfo,timeZone) {
  // const timeZone = eventInfo.view.calendar.getOption('timeZone') || 'UTC';
  // const formattedTime = moment(eventInfo.event.start).tz(timeZone).format('hh:mm A')
  // const formattedTime = moment(eventInfo.event.start)
  //   .tz(eventInfo.view.calendar.getOption('timeZone'))
  //   .format('hh:mm A');

  return (
    <>
        {/* <b>{formattedTime}</b> */}
       {/* <b>{eventInfo.timeText}</b> */}

       {/* <b>
        {formatDate(eventInfo.timeText, {
          timeZone: timeZone || "UTC",
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        })}
      </b> */}
      {eventInfo.event.allDay ? <b>All Day</b> :  <b>
        {formatDate(eventInfo.event.start, {
          timeZone: timeZone || "UTC",
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        })}
      </b>}
      
      <i className='overflow-hidden'>{eventInfo.event.title}</i>
    </>
  );
}