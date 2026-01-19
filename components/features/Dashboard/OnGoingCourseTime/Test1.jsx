import moment from "moment-timezone";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Test1() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    // Do something with the selected date in Europe Time
    setSelectedDate(date);
  };

  return (
    <div>
      <h1>Pick a Date and Time in Europe Time (e.g., Italy)</h1>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        className="p-2 border-2 border-P-primary"
        showTimeSelect
        timeFormat="HH:mm aa"
        // timeIntervals={15}
        timeCaption="Time"
        // dateFormat="MMMM d, yyyy h:mm aa"

        // timeZone="Europe/Rome" // Set the time zone to Europe/Rome (Italy)
      />

      {selectedDate && (
        <div>
          <h2>Date and Time Selected:</h2>
          <p>
            Europe Time (Italy):{" "}
            {moment.tz("Europe/Rome").format("MMMM D, YYYY h:mm A Z")}
          </p>
          <p>
            Your Local Time:{" "}
            {moment(selectedDate).local().format("MMMM D, YYYY h:mm A Z")}
          </p>
        </div>
      )}
    </div>
  );
}

export default Test1;
