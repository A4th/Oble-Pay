import { useState, useEffect } from 'react';

function App() {

  const URL = "http://localhost:8052/credentials";
  const [nam, setName] = useState("")
  const [studNum, setNum] = useState("")
  const [upEmail, setMail] = useState("")
  const [showCredentials, setShowCredentials] = useState(false);

  useEffect(() =>{
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
  }, [])

  const showClick = () => {
    setShowCredentials(true);
  };
  const hideClick = () => {
    setShowCredentials(false);
  };

  return (
    <div className="App">
      <h1>User</h1>
      <h4>Name: {showCredentials ? nam : ""}</h4>
      <h4>Student Number: {showCredentials ? studNum : ""}</h4>
      <h4>UP Email: {showCredentials ? upEmail : ""}</h4>
      <button onClick={showClick}>View Credentials</button><br />
      <button onClick={hideClick}>Hide Credentials</button>
    </div>
  );
}

export default App;