import React, { useState, useEffect } from 'react';
import alice from './alice.png';
import Header from './header';

export default function Owner1() {
  const [accounts, setAccounts] = useState([]);
  const [counterparty, setCounterparty] = useState('dan');
  const [amount, setAmount] = useState('100');
  const [message, setMessage] = useState('hello dan!');

  // Function to handle GET request
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://localhost:9200/api/v1/owner/accounts');
        const data = await response.json();
        if (data.payload && data.payload.length > 0) {
          setAccounts(data.payload);
        } else {
          setAccounts([{ balance: [{ value: 0, code: 'tokens' }] }]);
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
        setAccounts([{ balance: [{ value: 0, code: 'tokens' }] }]);
      }
    };

    fetchAccounts();
  }, []);

  // Function to handle POST request
  const handlePostRequest = async () => {
    try {
      const response = await fetch('http://localhost:9200/api/v1/owner/accounts/alice/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: { code: 'TOK', value: parseFloat(amount) },
          counterparty: { node: 'owner2', account: counterparty },
          message: message,
        }),
      });
      const data = await response.json();
      console.log('POST response:', data);
    } catch (error) {
      console.error('Error in POST request:', error);
    }
  };

  return (
    <div>
      <Header />
      <h1>Owner 1 Page</h1>
      <img src = {alice}  height = {200} width = {200}/>
      <h2>Accounts</h2>
      {accounts.map((account, index) => (
        <div key={index}>
          {account.balance.map((bal, balIndex) => (
            <p key={balIndex}>
              {bal.code}: {bal.value}
            </p>
          ))}
        </div>
      ))}
      <h2>Counter Party</h2>
      <input
        value={counterparty}
        onChange={(e) => setCounterparty(e.target.value)}
        placeholder="Counterparty (e.g., dan)"
      />
      <h2>Amount</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (e.g., 100)"
      />
      <h2>Message</h2>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message (e.g., hello dan!)"
      />
      <button onClick={handlePostRequest}>Submit</button>
    </div>
  );
}
