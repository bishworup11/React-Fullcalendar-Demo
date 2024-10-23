# React FullCalendar Demo

This project is a demo application that showcases the integration of the FullCalendar library with React. It includes features such as adding, viewing, and deleting events, toggling weekends, and selecting different time zones and locales. The application is designed to be user-friendly and provides a comprehensive example of how to use FullCalendar in a React application.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Add Events**: Select dates on the calendar to add new events. A modal will appear allowing you to enter the event title and description.
- **View Events**: Click on an event to view its details. A modal will display the event title, description, start time, and end time.
- **Delete Events**: In the event details modal, you can delete the event by clicking the "Delete Event" button.
- **Toggle Weekends**: Use the sidebar to toggle the visibility of weekends on the calendar.
- **Time Zones**: Select different time zones from the sidebar to adjust the calendar's time zone.
- **Locales**: Select different locales from the sidebar to change the language and formatting of the calendar.
- **Drag and Drop**: Drag, drop, and resize events on the calendar for easy scheduling.

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/bishworup11/React-Fullcalendar-Demo.git
    cd React-Fullcalendar-Demo
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start the development server**:

    ```bash
    npm start
    ```

4. **Open your browser and navigate to `http://localhost: 5173`**.

## Usage

1. **Select Dates**: Click and drag on the calendar to select a date range. This will open a modal to add a new event.
2. **Add Event**: Fill in the event details (title and description) and click "Add Event".
3. **View Event**: Click on an event to view its details. This will open a modal showing the event details.
4. **Delete Event**: In the event details modal, click "Delete Event" to remove the event from the calendar.
5. **Toggle Weekends**: Use the sidebar to toggle the visibility of weekends on the calendar.
6. **Change Time Zone**: Select a different time zone from the sidebar.
7. **Change Locale**: Select a different locale from the sidebar.

## Components

### `MyCalendar`

The main calendar component that integrates FullCalendar with React. It handles event creation, viewing, and deletion. This component uses various FullCalendar plugins to provide a rich set of features, including day grid, time grid, interaction, multi-month year view, and moment timezone support.

### `Sidebar`

A sidebar component that provides controls for toggling weekends, selecting time zones, and locales, and viewing all events. The sidebar includes dropdown menus for selecting time zones and locales, as well as a list of all events currently on the calendar.

### `Modal`

A custom modal component used for adding and viewing event details. The modal includes input fields for the event title and description, as well as buttons for adding, canceling, or deleting events.

## Dependencies

- **React**: A JavaScript library for building user interfaces.
- **FullCalendar**: A JavaScript event calendar.
- **Moment Timezone**: A library for handling time zones.
- **React Icons**: A library for using icons in React.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
