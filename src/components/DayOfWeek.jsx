import React from "react";
import dateFns from "date-fns";

const DayOfWeek = ({ startDate, dateFormat, i }) => {
  return (
    <div className="col col-center" key={i}>
      {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
    </div>
  );
};

export default DayOfWeek;
