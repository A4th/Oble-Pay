import React, { useState } from 'react';

function App() {
  const [connectionId, setConnectionId] = useState('3531ed61-3a7c-4f34-985e-bec1860eb349');
  const [nameChecked, setNameChecked] = useState(false);
  const [studentNumberChecked, setStudentNumberChecked] = useState(false);
  const [upEmailChecked, setUpEmailChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

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
    if (nameChecked) {
      requestedAttributes['0_name_uuid'] = {
        name: 'name',
        restrictions: [
          {
            cred_def_id: 'GdPtmM3zCyh7qZeHHaQLvp:2:UP Credentials:1.0',
          },
        ],
      };
    }

    if (studentNumberChecked) {
      requestedAttributes['0_studentNumber_uuid'] = {
        name: 'studentNumber',
        restrictions: [
          {
            cred_def_id: 'GdPtmM3zCyh7qZeHHaQLvp:2:UP Credentials:1.0',
          },
        ],
      };
    }

    if (upEmailChecked) {
      requestedAttributes['0_upEmail_uuid'] = {
        name: 'upEmail',
        restrictions: [
          {
            cred_def_id: 'GdPtmM3zCyh7qZeHHaQLvp:2:UP Credentials:1.0',
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

  return (
    <div>
      <h1>Present Proof Request</h1>
      <form>
        <label>
          <input type="checkbox" checked={nameChecked} onChange={handleNameChange} />
          Name
        </label>
        <br />
        <label>
          <input type="checkbox" checked={studentNumberChecked} onChange={handleStudentNumberChange} />
          Student Number
        </label>
        <br />
        <label>
          <input type="checkbox" checked={upEmailChecked} onChange={handleUpEmailChange} />
          UP Email
        </label>
        <br />
        <button onClick={handleRequestClick} disabled={isDisabled}>Send Request</button>
      </form>
    </div>
  );
}

export default App;