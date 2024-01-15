import React, { useState, useEffect } from 'react';

import { format } from 'date-fns';
import { saveAs } from 'file-saver';

import './ReservationForm.css'; // Import the CSS file for styling

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    selectedDate: '',
    startTime: '',
    endTime: '',
    location: '',
  });

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  useEffect(() => {
    // Extract date parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const dateParam = urlParams.get('date');

    // Set the date in the form data if it exists
    if (dateParam) {
      setFormData((prevData) => ({ ...prevData, selectedDate: dateParam }));
      setIsPopUpOpen(true); // Optionally open the pop-up
    }
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateSelection = (selectedDate) => {
    setFormData((prevData) => ({ ...prevData, selectedDate }));
    setIsPopUpOpen(true);
  };

  const handlePopUpClose = () => {
    setIsPopUpOpen(false);
  };
  const handleTimeChangeClick = () => {
    setIsPopUpOpen(true);
  };
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = () => {
    const { selectedDate, startTime, endTime } = formData;

    // Check if all required fields are filled
    if (!selectedDate || !startTime || !endTime) {
      alert('Please select date, start time, and end time.');
      return;
    }

    // Generate .ics content
    const formattedDate = selectedDate.replace(/-/g, '');
    const startT = startTime.replace(/:/g, '');
    const endT = endTime.replace(/:/g, '');

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
TZID:Eastern Standard Time
SUMMARY:Appointment Scheduled for ${formData.name}
DTEND;TZID="Eastern Standard Time":${formattedDate}T${endT}00
DTSTART;TZID="Eastern Standard Time":${formattedDate}T${startT}00
LOCATION: ${formData.location}

DTSTART:${format(new Date(`${selectedDate}T${startTime}`), 'yyyyMMddTHHmmss')}
DTEND:${format(new Date(`${selectedDate}T${endTime}`), 'yyyyMMddTHHmmss')}
DESCRIPTION:Reservation for ${formData.name} - ${formData.email} for the selected time ${startTime} to ${endTime}

BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:Reminder
END:VALARM
END:VEVENT
END:VCALENDAR`;

    // Create Blob and trigger file download
    const fileName = `${formData.name}reservation.ics`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    saveAs(blob, fileName);

    // Reset form data after submission
    setFormData({
      name: '',
      email: '',
      selectedDate: '',
      startTime: '',
      endTime: '',
      location: '',
    });
    setIsPopUpOpen(false); // Close the pop-up after submission
  };

  return (
    <div>
      <h2 id="texts">Input your information accordingly:</h2>
      <label id="texts">Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />

      <label id="texts">Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} />

      <label id="texts">Location:</label>
      <input type="text" name="location" value={formData.location} onChange={handleChange} />
      <label id="texts">Date:</label>
      <input type="date" name="selectedDate" value={formData.selectedDate} onChange={handleDateChange} />

      <br></br><button onClick={handleTimeChangeClick}>Change Reservation Time</button>


      {/* Render pre-decided dates as buttons */}
     

      {/* Time selection pop-up */}
      <div className={`popup ${isPopUpOpen ? 'visible' : ''}`}>
      <button className="close-button" onClick={handlePopUpClose}>
          &times; {/* Use the "times" symbol (X) for the close button */}
        </button>
        <h3>Please select your time of reservation:</h3>
        <label id="texts">Start Time:</label>
        <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} />

        <label id="texts">End Time:</label>
        <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} />

        <button onClick={handlePopUpClose}>Done</button>
      </div>
      <br></br>
      <h2 id="texts">Please review the information before submission</h2>
     
      <label>Date Selected: <b>{formData.selectedDate}</b></label>
      
      <center>
      <p className= "pTime" >Start Time: <b>{formData.startTime}</b></p>
      
      <p className= "pTime" >End Time:<b>{formData.endTime}</b></p>
      </center>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ReservationForm;
