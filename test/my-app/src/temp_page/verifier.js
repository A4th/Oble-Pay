import React, { useState } from 'react';

function App() {
  const [connectionId, setConnectionId] = useState('3531ed61-3a7c-4f34-985e-bec1860eb349');

  const [nam, setName] = useState("")
  const [studNum, setNum] = useState("")
  const [upEmail, setMail] = useState("")
  const [showCredentials, setShowCredentials] = useState(false);

  const [nameChecked, setNameChecked] = useState(false);
  const [studentNumberChecked, setStudentNumberChecked] = useState(false);
  const [upEmailChecked, setUpEmailChecked] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);
  const [showProofDisabled, setShowProofDisabled] = useState(true);

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
            cred_def_id: 'GdPtmM3zCyh7qZeHHaQLvp:3:CL:749956:default',
          },
        ],
      };
    }

    if (studentNumberChecked) {
      requestedAttributes['0_studentNumber_uuid'] = {
        name: 'studentNumber',
        restrictions: [
          {
            cred_def_id: 'GdPtmM3zCyh7qZeHHaQLvp:3:CL:749956:default',
          },
        ],
      };
    }

    if (upEmailChecked) {
      requestedAttributes['0_upEmail_uuid'] = {
        name: 'upMail',
        restrictions: [
          {
            cred_def_id: 'GdPtmM3zCyh7qZeHHaQLvp:3:CL:749956:default',
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
        <h4>Name: {showCredentials ? nam : ""}</h4>
        <h4>Student Number: {showCredentials ? studNum : ""}</h4>
        <h4>UP Email: {showCredentials ? upEmail : ""}</h4>
        <br />
        <button onClick={handleRequestClick} disabled={isDisabled}>Send Request</button>
        <br />
        <button type = "button" onClick={handleProofClick} disabled={false}>Show Proof</button>
      </form>
    </div>
  );
}

export default App;