import React, { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import { TIME_ZONES, Locales } from "./event-utils";
import { FaChevronDown } from "react-icons/fa";

const Sidebar = ({
  weekendsVisible = true,
  handleWeekendsToggle,
  currentEvents = [],
  selectedTimeZone = "UTC",
  selectedLocale = "en",
  handleTimeZoneChange,
  handleLocalChange,
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuItems = [
    {
      id: "instructions",
      label: "Instructions",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      ),
    },
    {
      id: "weekends",
      label: "Toggle Weekends",
      content: (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
            className="form-checkbox h-4 w-4 text-blue-500"
          />
          <span>Toggle weekends</span>
        </label>
      ),
    },
    {
      id: "locales",
      label: "Locales",
      submenu: [
        {
          label: "Select a different locale:",
          options: Locales,
        },
      ],
    },
    {
      id: "timezones",
      label: "Time Zones",
      submenu: [
        {
          label: "Select a different time zone:",
          options: TIME_ZONES,
        },
      ],
    },
    {
      id: "events",
      label: `All Events (${currentEvents.length})`,
      content: (
        <ul className="space-y-2">
          {currentEvents.map((event) => (
            <SidebarEvent
              key={event.id}
              event={event}
              timeZone={selectedTimeZone}
            />
          ))}
        </ul>
      ),
    },
  ];

  const toggleDropdown = (id) => {
    setActiveDropdown((prevDropdown) => (prevDropdown === id ? null : id));
  };

  return (
    <div className="w-64 bg-gray-800 text-white max-h-full p-4 mt-11">
      <h1 className="text-xl font-bold mb-6">Calendar Demo</h1>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => toggleDropdown(item.id)}
              className="w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-700 rounded-md transition-colors"
            >
              <span className="font-medium">{item.label}</span>
              <FaChevronDown
                className={`w-4 h-4 transition-transform ${
                  activeDropdown === item.id ? "transform rotate-180" : ""
                }`}
              />
            </button>
            <RenderDropdownContent
              item={item}
              activeDropdown={activeDropdown}
              selectedTimeZone={selectedTimeZone}
              selectedLocale={selectedLocale}
              handleTimeZoneChange={handleTimeZoneChange}
              handleLocaleChange={handleLocalChange}
            />
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

const RenderDropdownContent = ({
  item,
  activeDropdown,
  selectedTimeZone,
  selectedLocale,
  handleTimeZoneChange,
  handleLocaleChange,
}) => {
  if (activeDropdown !== item.id) return null;

  if (item.submenu && item.id === "timezones") {
    return (
      <div className="ml-4 mt-2 bg-gray-900 rounded-md p-4">
        <p className="text-sm text-gray-100 mb-2">{item.submenu[0].label}</p>
        <select
          value={selectedTimeZone}
          onChange={handleTimeZoneChange}
          className="w-full bg-gray-800 text-white px-2 py-1 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
        >
          {item.submenu[0].options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        
      </div>
    );
  } else if (item.submenu && item.id === "locales") {
    return (
      <div className="ml-4 mt-2 bg-gray-900 rounded-md p-4">
        <p className="text-sm text-gray-100 mb-2">{item.submenu[0].label}</p>
        <select
          value={selectedLocale}
          onChange={handleLocaleChange}
          className="w-full bg-gray-800 text-white px-2 py-1 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
        >
          {item.submenu[0].options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        
      </div>
    );
  }

  return (
    <div className="ml-4 mt-2 bg-gray-900 rounded-md p-4 text-left">
      {item.content}
    </div>
  );
};

const SidebarEvent = ({ event, timeZone }) => {
  if (!event || !event.start) return null;

  return (
    <li className="py-1">
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
          timeZone: timeZone || "UTC",
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        })}
      </b>
      <i className="ml-2">{event.title}</i>
    </li>
  );
};
