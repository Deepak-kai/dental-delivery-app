import React, { useState, useEffect } from 'react';

const statusOptions = ['none', 'give', 'given', 'take', 'taken'];

const LocationEditor = () => {
  const [locations, setLocations] = useState(
    Array.from({ length: 17 }, (_, i) => ({
      name: '',
      status: 'none',
    }))
  );

  // Load from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem('locationsData');
    if (saved) {
      setLocations(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage on every update
  useEffect(() => {
    localStorage.setItem('locationsData', JSON.stringify(locations));
  }, [locations]);

  const handleChange = (index, field, value) => {
    const updated = [...locations];
    updated[index][field] = value;
    setLocations(updated);
  };

  return (
    <div>
      {locations.map((loc, index) => (
        <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '10px' }}>
          <label>
            <strong>Location {index + 1} Name:</strong>
            <input
              type="text"
              value={loc.name}
              onChange={(e) => handleChange(index, 'name', e.target.value.slice(0, 100))}
              placeholder="Enter location name"
              style={{ width: '100%', marginTop: '5px', padding: '5px' }}
            />
          </label>
          <br />
          <label style={{ marginTop: '10px', display: 'block' }}>
            <strong>Status:</strong>
            <select
              value={loc.status}
              onChange={(e) => handleChange(index, 'status', e.target.value)}
              style={{ width: '100%', marginTop: '5px', padding: '5px' }}
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </label>
        </div>
      ))}
    </div>
  );
};

export default LocationEditor;
