import React from "react";
import Modal from "react-bootstrap/Modal";

const EventModal = ({
  show,
  handleClose,
  handleMonthChange,
  handleDayChange,
  handleYearChange,
  handleEventChange,
  monthValue,
  dayValue,
  yearValue,
  eventValue,
  addEvent
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton />
      <Modal.Title>Add Event</Modal.Title>
      <Modal.Footer>
        <form onSubmit={addEvent}>
          Month:
          <input type="text" value={monthValue} onChange={handleMonthChange} />
          Day:
          <input type="text" value={dayValue} onChange={handleDayChange} />
          Year:
          <input type="text" value={yearValue} onChange={handleYearChange} />
          Event:
          <input type="text" value={eventValue} onChange={handleEventChange} />
          <button variant="success" size="lg" type="submit">
            Save Event
          </button>
        </form>
      </Modal.Footer>
    </Modal>
  );
  // }
};

export default EventModal;
