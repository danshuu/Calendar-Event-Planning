import React from "react";
import Event from "./Event";
const buttonStyle = {
  backgroundColor: "green"
};

const inputStyle = {
  width: "10%"
};

const EditEvent = ({ date, theEvent, handleEditEvent, events, index }) => {
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (
          event.target.month.value &&
          event.target.day.value &&
          event.target.year.value &&
          event.target.theEvent.value
        ) {
          //delete event
          let eventsCopy = { ...events };
          eventsCopy[date].splice(index, 1);
          eventsCopy[date] = [...eventsCopy[date]];
          //add event back in with potentially new values
          const newEventDate = `${event.target.month.value}/${
            event.target.day.value
          }/${event.target.year.value}`;
          const myEvent = (
            <Event
              key={newEventDate + new Date().getTime()}
              eventName={event.target.theEvent.value}
            />
          );
          if (!eventsCopy[newEventDate]) eventsCopy[newEventDate] = [myEvent];
          else
            eventsCopy[newEventDate] = [...eventsCopy[newEventDate], myEvent];
          handleEditEvent(eventsCopy);
        }
      }}
    >
      Month:
      <input
        type="text"
        style={inputStyle}
        placeholder={new Date(date).getMonth() + 1}
        name="month"
      />
      Day:
      <input
        type="text"
        style={inputStyle}
        placeholder={new Date(date).getDate()}
        name="day"
      />
      Year:
      <input
        type="text"
        style={inputStyle}
        placeholder={new Date(date).getFullYear()}
        name="year"
      />
      Event:
      <input
        type="text"
        placeholder={theEvent.props.eventName}
        name="theEvent"
      />
      <button variant="success" size="lg" type="submit" style={buttonStyle}>
        Save Event
      </button>
      <button
        style={buttonStyle}
        onClick={event => {
          event.preventDefault();

          let eventsCopy = { ...events };
          eventsCopy[date].splice(index, 1);
          eventsCopy[date] = [...eventsCopy[date]];
          handleEditEvent(eventsCopy);
        }}
      >
        Delete Event
      </button>
    </form>
  );
};

export default EditEvent;
