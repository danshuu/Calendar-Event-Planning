import React from "react";
import dateFns from "date-fns";

const Day = ({
  monthStart,
  selectedDate,
  day,
  cloneDay,
  formattedDate,
  onDateClick,
  dayEvents
}) => {
  return (
    <div
      className={`col cell ${
        !dateFns.isSameMonth(day, monthStart)
          ? "disabled"
          : dateFns.isSameDay(day, selectedDate)
          ? "selected"
          : ""
      }`}
      onClick={() => onDateClick(dateFns.parse(cloneDay))}
    >
      <span className="number">{formattedDate}</span>
      <span className="bg">{formattedDate}</span>
      {dayEvents}
    </div>
  );
};

export default Day;
