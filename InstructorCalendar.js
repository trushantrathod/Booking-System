import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function InstructorCalendar() {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDates([...selectedDates, date]);
  };

  const saveAvailability = async () => {
    try {
      const response = await fetch("http://localhost:5002/api/availability/set-availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instructorId: "123",
          availableDates: selectedDates,
        }),
      });
      if (response.ok) {
        alert("Availability saved!");
      } else {
        alert("Failed to save availability");
      }
    } catch (error) {
      console.error("Error saving availability:", error);
    }
  };

  return (
    <div>
      <h2>Select Your Availability</h2>
      <Calendar onClickDay={handleDateChange} />
      <button onClick={saveAvailability}>Save Availability</button>
    </div>
  );
}

export default InstructorCalendar;
