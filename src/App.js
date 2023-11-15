import './App.css';
import Main from './Components/Main';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  // Controls the data state
  const [data, setData] = useState({ hourlyNeAliasdata: [], dailyNeAliasdata: [], hourlyNeTypedata: [],  dailyNeTypedata: []});

  useEffect(() => {
    // Make a GET request to the API endpoint
    axios.get('https://localhost:7192/api/DataResult')
      .then(response => {
        // Update the state with the data received from the API
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <Main data={data}/>
    </div>
  );
}

export default App;
