import React, { Component } from "react";
import dateFns from "date-fns";
import Day from "./Day";
import DayOfWeek from "./DayOfWeek";
import Navigation from "./Navigation";
import EventModal from "./EventModal";
import Event from "./Event";
import EditEvent from "./EditEvent";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date(),
      currentYear: new Date().getFullYear(),
      selectedDate: new Date(),
      clicked: "false",
      events: {},
      showModal: false,
      monthValue: new Date().getMonth() + 1,
      dayValue: new Date().getDate(),
      yearValue: new Date().getFullYear(),
      eventValue: ""
    };
    this.onDateClick = this.onDateClick.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleEditEvent = this.handleEditEvent.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }

  addEvent(event) {
    event.preventDefault();
    const eventDate = `${this.state.monthValue}/${this.state.dayValue}/${
      this.state.yearValue
    }`;
    let eventCopy = { ...this.state.events };
    const theEvent = (
      <Event
        key={eventDate + this.state.eventValue}
        eventName={this.state.eventValue}
      />
    );
    if (this.state.eventValue) {
      if (!eventCopy[eventDate]) eventCopy[eventDate] = [theEvent];
      else eventCopy[eventDate] = [...eventCopy[eventDate], theEvent];

      this.setState({ events: eventCopy, eventValue: "", showModal: false });
    }
  }

  handleEditEvent(eventsCopy) {
    this.setState({ events: eventsCopy });
  }

  handleMonthChange(event) {
    this.setState({ monthValue: event.target.value });
  }

  handleDayChange(event) {
    this.setState({ dayValue: event.target.value });
  }

  handleYearChange(event) {
    this.setState({ yearValue: event.target.value });
  }

  handleEventChange(event) {
    this.setState({ eventValue: event.target.value });
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  handleShow() {
    this.setState({ showModal: true });
  }

  renderHeader() {
    return (
      <Navigation
        prevMonth={this.prevMonth}
        nextMonth={this.nextMonth}
        currentMonth={this.state.currentMonth}
      />
    );
  }

  renderDaysOfWeek() {
    const dateFormat = "dddd";
    const daysOfWeek = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      daysOfWeek.push(
        <DayOfWeek
          startDate={startDate}
          dateFormat={dateFormat}
          key={i}
          i={i}
        />
      );
    }
    return <div className="days row">{daysOfWeek}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const dateFormat = "D";
    const weeks = [];

    let week = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        const eventDate = `${day.getMonth() +
          1}/${day.getDate()}/${day.getFullYear()}`;
        week.push(
          <Day
            monthStart={monthStart}
            selectedDate={selectedDate}
            key={day}
            day={day}
            cloneDay={cloneDay}
            formattedDate={formattedDate}
            onDateClick={this.onDateClick}
            dayEvents={this.state.events[eventDate]}
          />
        );
        day = dateFns.addDays(day, 1);
      }
      weeks.push(
        <div className="row" key={day}>
          {week}
        </div>
      );
      week = [];
    }
    return <div className="body">{weeks}</div>;
  }

  renderEvents() {
    let allEvents = [];
    let keys = Object.keys(this.state.events);
    keys = keys.sort((a, b) => new Date(a) - new Date(b));
    keys.forEach(date => {
      this.state.events[date].forEach((theEvent, index) => {
        allEvents.push(
          <EditEvent
            key={date + theEvent.props.eventName + new Date().getTime()}
            date={date}
            theEvent={theEvent}
            handleEditEvent={this.handleEditEvent}
            events={this.state.events}
            index={index}
          />

          // <form
          //   key={date + theEvent.props.eventName + new Date().getTime()}
          //   onSubmit={event => {
          //     event.preventDefault();
          //     //delete event
          //     let eventsCopy = { ...this.state.events };
          //     eventsCopy[date].splice(index, 1);
          //     eventsCopy[date] = [...eventsCopy[date]];
          //     //add event back in with potentially new values
          //     const newEventDate = `${event.target.month.value}/${
          //       event.target.day.value
          //     }/${event.target.year.value}`;
          //     const myEvent = (
          //       <Event
          //         key={newEventDate + new Date().getTime()}
          //         eventName={event.target.theEvent.value}
          //       />
          //     );
          //     if (!eventsCopy[newEventDate])
          //       eventsCopy[newEventDate] = [myEvent];
          //     else
          //       eventsCopy[newEventDate] = [
          //         ...eventsCopy[newEventDate],
          //         myEvent
          //       ];
          //     this.setState({ events: eventsCopy });
          //   }}
          // >
          //   Month:
          //   <input
          //     type="text"
          //     style={inputStyle}
          //     placeholder={new Date(date).getMonth() + 1}
          //     name="month"
          //   />
          //   Day:
          //   <input
          //     type="text"
          //     style={inputStyle}
          //     placeholder={new Date(date).getDate()}
          //     name="day"
          //   />
          //   Year:
          //   <input
          //     type="text"
          //     style={inputStyle}
          //     placeholder={new Date(date).getFullYear()}
          //     name="year"
          //   />
          //   Event:
          //   <input
          //     type="text"
          //     placeholder={theEvent.props.eventName}
          //     name="theEvent"
          //   />
          //   <button
          //     variant="success"
          //     size="lg"
          //     type="submit"
          //     style={buttonStyle}
          //   >
          //     Save Event
          //   </button>
          //   <button
          //     style={buttonStyle}
          //     onClick={event => {
          //       event.preventDefault();

          //       let eventsCopy = { ...this.state.events };
          //       eventsCopy[date].splice(index, 1);
          //       eventsCopy[date] = [...eventsCopy[date]];
          //       this.setState({ events: eventsCopy });
          //     }}
          //   >
          //     Delete Event
          //   </button>
          // </form>
        );
      });
    });
    return <div>{allEvents}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day,
      monthValue: day.getMonth() + 1,
      dayValue: day.getDate(),
      yearValue: day.getFullYear(),
      eventValue: ""
    });
    this.handleShow();
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1),
      currentYear: dateFns.addMonths(this.state.currentMonth, 1).getFullYear()
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1),
      currentYear: dateFns.subMonths(this.state.currentMonth, 1).getFullYear()
    });
  };

  render() {
    return (
      <div>
        <div className="calendar">
          {this.renderHeader()}
          {this.renderDaysOfWeek()}
          {this.renderCells()}
          <EventModal
            show={this.state.showModal}
            handleClose={this.handleClose}
            events={this.state.events}
            monthValue={this.state.monthValue}
            dayValue={this.state.dayValue}
            yearValue={this.state.yearValue}
            eventValue={this.state.eventValue}
            handleMonthChange={this.handleMonthChange}
            handleDayChange={this.handleDayChange}
            handleYearChange={this.handleYearChange}
            handleEventChange={this.handleEventChange}
            addEvent={this.addEvent}
          />
        </div>
        <div style={{ textAlign: "center" }}>UPCOMING EVENTS</div>
        {this.renderEvents()}
      </div>
    );
  }
}

export default Calendar;
