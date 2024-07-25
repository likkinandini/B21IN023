import React, { useState } from 'react';
import './App.css';

function App() {
  const [numbers, setNumbers] = useState([]);
  const [average, setAverage] = useState(null);

  const handleInputChange = (event) => {
    const { value } = event.target;
    const parsedValue = parseFloat(value);
    setNumbers([...numbers, parsedValue]);
  };

  const calculateAverage = async () => {
    try {
      const response = await fetch('http://localhost:5000/numbers/1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numbers }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setAverage(data.average.toFixed(2)); // Display average with two decimal places
    } catch (error) {
      console.error('Error calculating average:', error);
    }
  };

  return (
    <div className="App">
      <h1>Average Calculator</h1>
      <div>
        <label>Enter Number:</label>
        <input type="number" onChange={handleInputChange} />
        <button onClick={calculateAverage}>Add Number</button>
      </div>
      {average !== null && (
        <div>
          <p>Average: {average}</p>
        </div>
      )}
    </div>
  );
}

export default App;
