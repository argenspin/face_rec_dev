
import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import Form from 'react-bootstrap/Form';
import '../css/form_style.css'
import axios from "axios"
import NavBar from "./NavBar";
import Dashboard from "./dashboard";

function Login(props){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loggedState,setLoggedState] = useState(false)
  const [sampleText, setSampleText] = useState('empty')

  const validateForm = () => {
    let valid = true; 
    /*if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
    {
      valid=false
      alert("Invalid Email address")
    }*/
    if(password==='' || username==='')
    {
      valid=false;
      alert("Fields cannot be empty")
    }
    return valid;
  }
  const submitForm = () => {
    if(validateForm())
    {
      axios
      .post('api/token/obtain/', {'username':username,'password':password},{headers: {'Content-Type':'application/json'}})
      .then(res => {
        //console.log(res.data['access'])
        let test = 'Authorization: JWT '+res.data['access']
        console.log(test)
        axios.get('/api/hello/',{headers: {'Content-Type':'application/json', 'Authorization':'JWT '+ res.data['access'] }} )
        .then(res => {
          console.log(res.data)
          setSampleText(res.data['hello'])
          setLoggedState(true);
          props.func(res.data['hello']);
          <Navigate to="/home"/>
        })
      })
      .catch(err => {
        console.log(err)
      })
      console.log(loggedState)
    }
    
  }
  if(!loggedState)
  {
  return (
    <div>
      <NavBar/>
      <br/><br/>
      <form className="text-center m-5">
        <div>
          <label>Email:</label>
          <input className="m-2" type="text" id="login_username" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)}/>
        </div>
      <br/>
        <div>
          <label> Password: </label>
          <input className="m-2" type="password" id="login_pass" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div>
          <button type="button" className="m-3 btn btn-primary" id="submit_button" onClick={submitForm}>Login</button>
          <button type="button" className="m-0 btn btn-secondary" id="submit_button">Register</button>
        </div>
      </form>
    </div>
  )
  }
  else
  {
    return(
      <Navigate to='/home'/>
    
    )
  }
}

export default Login;