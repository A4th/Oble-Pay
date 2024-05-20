import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    // Function to fetch accounts data
    const fetchAccounts = async () => {
      try {
        // Make GET request to the API endpoint
        const response = await axios.get('http://localhost:9200/api/v1/owner/accounts');

        // Set the accounts state with the response data
        setAccounts(response.data);
      } catch (error) {
        // Handle error if request fails
        console.error('Error fetching accounts:', error);
      }
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
      <h2>Your Amount</h2>
      <h2>Counter Party</h2>
      <input></input>
      <h2>Amount</h2>
      <input></input>
    </div>
  );
}

export default App;
