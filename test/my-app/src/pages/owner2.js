import React, { useState, useEffect } from 'react';

import Header from './header';

export default function Owner1() {
  const [accounts, setAccounts] = useState([]);
  const [counterparty, setCounterparty] = useState('alice');
  const [amount, setAmount] = useState('100');
  const [message, setMessage] = useState('');
  const [tokenname, setTokenname] = useState('');
  const [connectionId, setConnectionId] = useState('28479b3f-d90d-40c3-b0e9-1fe33a60004f');

  const [nam, setName] = useState("")
  const [studNum, setNum] = useState("")
  const [upEmail, setMail] = useState("")
  const [showCredentials, setShowCredentials] = useState(false);

  const [nameChecked, setNameChecked] = useState(false);
  const [studentNumberChecked, setStudentNumberChecked] = useState(false);
  const [upEmailChecked, setUpEmailChecked] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);
  const [showProofDisabled, setShowProofDisabled] = useState(true);

  // Function to handle GET request
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('http://localhost:9300/api/v1/owner/accounts');
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
      const response = await fetch('http://localhost:9300/api/v1/owner/accounts/dan/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: { code: tokenname, value: parseFloat(amount) },
          counterparty: { node: 'owner1', account: counterparty },
          message: message,
        }),
      });
      const data = await response.json();
      console.log('POST response:', data);
    } catch (error) {
      console.error('Error in POST request:', error);
    }
  };

  const handleNameChange = (event) => {
    setNameChecked(event.target.checked);
  };

  const handleStudentNumberChange = (event) => {
    setStudentNumberChecked(event.target.checked);
  };

  const handleUpEmailChange = (event) => {
    setUpEmailChecked(event.target.checked);
  };

  const handleRequestClick = () => {
    const requestedAttributes = {};
    setIsDisabled(true);
    setShowProofDisabled(false);
    if (nameChecked) {
      requestedAttributes['0_name_uuid'] = {
        name: 'name',
        restrictions: [
          {
            cred_def_id: 'UZi2SG17xuT3Z8A76xQq6X:3:CL:905215:default',
          },
        ],
      };
    }

    if (studentNumberChecked) {
      requestedAttributes['0_studentNumber_uuid'] = {
        name: 'studentNumber',
        restrictions: [
          {
            cred_def_id: 'UZi2SG17xuT3Z8A76xQq6X:3:CL:905215:default',
          },
        ],
      };
    }

    if (upEmailChecked) {
      requestedAttributes['0_upEmail_uuid'] = {
        name: 'upMail',
        restrictions: [
          {
            cred_def_id: 'UZi2SG17xuT3Z8A76xQq6X:3:CL:905215:default',
          },
        ],
      };
    }

    const requestBody = {
      connection_id: connectionId,
      proof_request: {
        name: 'Proof of UP Credentials',
        version: '1.0',
        requested_attributes: requestedAttributes,
        requested_predicates: {},
      },
    };

    fetch('http://localhost:8053/present-proof/send-request', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  const handleProofClick = () => {

    const url = "http://localhost:8053/present-proof/records";
    const params = {
      role: "verifier",
      state: "verified"
    };

    const fetchData = async () => {
      const response = await fetch(`${url}?${new URLSearchParams(params)}`, {
        headers: {
          accept: "application/json"
        }
      });
      const data = await response.json(); // assuming the response data has a "records" property
      const resData = data.results;

      const sortedData = resData.sort((a, b) => {
      const dateA = new Date(a.updated_at);
      const dateB = new Date(b.updated_at);
      return dateB - dateA; // sort in ascending order (newest first)
    });
    if (nameChecked) {
      setName(sortedData[0].presentation.requested_proof.revealed_attrs['0_name_uuid']['raw']);
    }
    if (studentNumberChecked) {
      setNum(sortedData[0].presentation.requested_proof.revealed_attrs['0_studentNumber_uuid']['raw']);
    }
    if (upEmailChecked) {
      setMail(sortedData[0].presentation.requested_proof.revealed_attrs['0_upEmail_uuid']['raw']);
    }
    console.log(sortedData);
    }
    fetchData();

    setShowCredentials(true);
    setIsDisabled(false);
    setShowProofDisabled(true);
  };




  return (
    <div>
    <Header />
    <h1 className='font-bold text-[4em] font-serif'>Dan</h1>
    <br/>
    <div className='flex'>
    <div className='flex-1 w-64 text-center'>
    <h1 className='font-bold text-[2em] font-serif'>Present Proof Request</h1>
      <form>
        <label className='font-bold text-[1em] font-serif' >
          <input type="checkbox" checked={nameChecked} onChange={handleNameChange} />
          Name
        </label>
        <br />
        <label className='font-bold text-[1em] font-serif'>
          <input type="checkbox" checked={studentNumberChecked} onChange={handleStudentNumberChange} />
          Student Number
        </label>
        <br />
        <label className='font-bold text-[1em] font-serif'>
          <input type="checkbox" checked={upEmailChecked} onChange={handleUpEmailChange} />
          UP Email
        </label>
        <h4 className='font-bold text-[2em] font-serif'>Name: {showCredentials ? nam : ""}</h4>
        <h4 className='font-bold text-[2em] font-serif'>Student Number: {showCredentials ? studNum : ""}</h4>
        <h4 className='font-bold text-[2em] font-serif'>UP Email: {showCredentials ? upEmail : ""}</h4>
        <br />
        <button className='bg-red-900 rounded-full min-w-80' onClick={handleRequestClick} disabled={isDisabled}>Send Request</button>
        <br />
        <br />
        <button className='bg-red-900 rounded-full min-w-80' type = "button" onClick={handleProofClick} disabled={showProofDisabled}>Show Proof</button>
      </form>


    
      </div>

      <div className='flex-1 w-64 text-center'>
      <h2 className='font-bold text-[2em] font-serif'>Token balance</h2>
    {accounts.map((account, index) => (
      <div key={index}>
        {account.balance.map((bal, balIndex) => (
          <h1 key={balIndex} className='font-bold text-[2em] font-serif' >
            {bal.value} {bal.code}
          </h1>
        ))}
      </div>
    ))}


      </div >

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
