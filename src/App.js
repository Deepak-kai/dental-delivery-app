// src/App.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import ExportPDF from './ExportPDF';

const totalLocations = 17;
const dropdownOptions = ['give', 'given', 'take', 'taken', 'none'];

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentSelections, setCurrentSelections] = useState({});
  const [locationNames, setLocationNames] = useState({});

  useEffect(() => {
    if (selectedDate) {
      const stored = localStorage.getItem(selectedDate);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCurrentSelections(parsed.selections || {});
        setLocationNames(parsed.names || {});
      } else {
        let defaults = {};
        for (let i = 1; i <= totalLocations; i++) {
          defaults[`loc${i}`] = "";
        }
        setCurrentSelections({});
        setLocationNames(defaults);
      }
    }
  }, [selectedDate]);

  const handleSelection = (locKey, value) => {
    setCurrentSelections((prev) => ({
      ...prev,
      [locKey]: value,
    }));
  };

  const handleNameChange = (locKey, value) => {
    setLocationNames((prev) => ({
      ...prev,
      [locKey]: value,
    }));
  };

  const handleSave = () => {
    if (selectedDate) {
      const data = {
        selections: currentSelections,
        names: locationNames,
      };
      localStorage.setItem(selectedDate, JSON.stringify(data));
      alert('Saved!');
    }
  };

  const handleBack = () => {
    setSelectedDate(null);
  };

  const handleExportPDF = () => {
    ExportPDF('pdf-content', `${selectedDate || 'delivery'}.pdf`);
  };

  return (
    <div className="App">
      {!selectedDate ? (
        <div className="calendar-container">
          <h2>Select a Date</h2>
          <Calendar onClickDay={(date) => setSelectedDate(date.toISOString().split('T')[0])} />
        </div>
      ) : (
        <div className="form-container">
          <div className="top-bar">
            <button className="back-button" onClick={handleBack}>← Back</button>
            <h2>{selectedDate}</h2>
          </div>

          <div id="pdf-content">
            {[...Array(totalLocations)].map((_, i) => {
              const locKey = `loc${i + 1}`;
              return (
                <div key={locKey} className="location-row">
                  <input
                    type="text"
                    placeholder={`Enter name for Location ${i + 1}`}
                    value={locationNames[locKey] || ''}
                    onChange={(e) => handleNameChange(locKey, e.target.value)}
                    className="location-input"
                  />
                  <select
                    value={currentSelections[locKey] || 'none'}
                    onChange={(e) => handleSelection(locKey, e.target.value)}
                  >
                    {dropdownOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>

          <div className="button-group">
            <button className="save-button" onClick={handleSave}>Save</button>
            <button className="pdf-button" onClick={handleExportPDF}>Export PDF</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
