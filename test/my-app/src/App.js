import React, { useState, useEffect } from 'react';
import axios from 'axios';


const URL = 'http://localhost:9200/api/v1/owner/accounts';


function App() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    // Function to fetch accounts data
    const fetchAccounts = async () => {
      const result = await fetch(URL)
      result.json().then(json =>{
        console.log(json)

      })

    };

    // Call the fetchAccounts function when the component mounts
    fetchAccounts();

    // Cleanup function to prevent memory leaks
    return () => {
      // Cleanup code (if any)
    };
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div>
      <h1>OblePay!</h1>
      <h2>Your Amount </h2>
    
      <h2>Counter Party</h2>
      <input></input>
      <h2>Amount</h2>
      <input></input>
    </div>
  );
}

export default App;
