import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css'; // Make sure you have styles or modify as needed

const DeliveryCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [deliveryNote, setDeliveryNote] = useState('');
  const [notes, setNotes] = useState({});

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('deliveryNotes');
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  // Update delivery note when date changes
  useEffect(() => {
    const key = selectedDate.toDateString();
    setDeliveryNote(notes[key] || '');
  }, [selectedDate, notes]);

  const handleNoteChange = (e) => {
    setDeliveryNote(e.target.value);
  };

  const handleSave = () => {
    const newNotes = {
      ...notes,
      [selectedDate.toDateString()]: deliveryNote
    };
    setNotes(newNotes);
    localStorage.setItem('deliveryNotes', JSON.stringify(newNotes));
    alert('Saved successfully!');
  };

  return (
    <div className="calendar-container">
      <h2>📅 Delivery Calendar</h2>
      <Calendar onChange={setSelectedDate} value={selectedDate} />
      <h3>{selectedDate.toDateString()}</h3>
      <textarea
        rows="5"
        cols="50"
        placeholder="Enter delivery details here..."
        value={deliveryNote}
        onChange={handleNoteChange}
      />
      <br />
      <button onClick={handleSave}>💾 Save Note</button>
    </div>
  );
};

export default DeliveryCalendar;

