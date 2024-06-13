import React, { useState, useEffect } from 'react';
import alice from './alice.png';
import Header from './header';

export default function Owner1() {
  const [accounts, setAccounts] = useState([]);
  const [counterparty, setCounterparty] = useState('dan');
  const [amount, setAmount] = useState('100');
  const [message, setMessage] = useState('');
  const [tokenname, setTokenname] = useState('');
  const URL = "http://localhost:8052/credentials";
  const [nam, setName] = useState("")
  const [studNum, setNum] = useState("")
  const [upEmail, setMail] = useState("")
  const [showCredentials, setShowCredentials] = useState(false);

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

    const fetchData = async () => {
      const result = await fetch(URL, {
        headers: {
          'accept': 'application/json'
        }
      });
      result.json().then(json => {
        setName(json.results[0].attrs.name)
        setNum(json.results[0].attrs.studentNumber)
        setMail(json.results[0].attrs.upMail)
        console.log (json)
      })

    }
    fetchData();





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
          amount: { code: tokenname, value: parseFloat(amount) },
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

  const showClick = () => {
    setShowCredentials(true);
  };
  const hideClick = () => {
    setShowCredentials(false);
  };




  return (
    <div>
      <Header />
      <h1 className='font-bold text-[4em] font-serif'>Alice</h1>
      <br/>
      <div className='flex'>
      <div className='flex-1 w-64 text-center'>
      <h1>User</h1>
      <h4>Name: {showCredentials ? nam : ""}</h4>
      <h4>Student Number: {showCredentials ? studNum : ""}</h4>
      <h4>UP Email: {showCredentials ? upEmail : ""}</h4>
      <button onClick={showClick}>View Credentials</button><br />
      <button onClick={hideClick}>Hide Credentials</button>

      <h2 className='font-bold text-[3em] font-serif'>Token balance</h2>
      {accounts.map((account, index) => (
        <div key={index}>
          {account.balance.map((bal, balIndex) => (
            <h1 key={balIndex} className='font-bold text-[2em] font-serif' >
              {bal.value} {bal.code}
            </h1>
          ))}
        </div>
      ))}


      
        </div>

        <div className='flex-1 w-64 text-center'>
        <h2 className='font-bold text-[2em] font-serif'>Counter Party</h2>
      <input
        value={counterparty}
        onChange={(e) => setCounterparty(e.target.value)}
        className='bg-zinc-400'
      />
      <h2 className='font-bold text-[2em] font-serif'>Amount</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Integers only"
        className='bg-zinc-400'
      />

      <h2 className='font-bold text-[2em] font-serif'>Token</h2>
      <input
        value={tokenname}
        onChange={(e) => setTokenname(e.target.value)}
        placeholder="Choose from the left hand side"
        className='bg-zinc-400'
      />

      <h2 className='font-bold text-[2em] font-serif'>Message</h2>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
        className='bg-zinc-400'
      />
      <br />
      <br />
      <button onClick={handlePostRequest} className='bg-red-900 rounded-full min-w-80'>Submit</button>
      </div>
      </div>
     
    </div>
  );
}
