
import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useNavigate,
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import Form from 'react-bootstrap/Form';
import '../css/form_style.css'
import axios from "axios"
import NavBar from "./NavBar";
import Dashboard from "./dashboard";


function Login(props){

  const navigate = useNavigate();
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

  const requestWithToken = () => {
      //console.log(res.data['access'])
      let access_token = localStorage.getItem('access')
      let test = 'Authorization: JWT '+ access_token
      console.log(test)
      axios.get('/api/hello/',{headers: {'Content-Type':'application/json', 'Authorization':'JWT '+ access_token }} )
      .then(res => {
        //console.log(res.data)
        setSampleText(res.data['hello'])
        setLoggedState(true);
        //localStorage.setItem('hello',res.data['hello']);
        //props.func(res.data['hello']);
      })
  }
  const submitForm = async(e) => {
    e.preventDefault();
    if(validateForm())
    {
      await axios
      .post('api/token/obtain/', {'username':username,'password':password},{headers: {'Content-Type':'application/json'}})
      .then(res =>{
        localStorage.setItem('access',res.data['access']);
        localStorage.setItem('loggedUser',username);
        requestWithToken();
        <Navigate to="/home"/>

      } )
      .catch(err => {
        console.log(err)
      })
      //console.log(loggedState)
    }
    
  }

  const gotoRegistration = () => {
    navigate('/register');
  }
  if(!localStorage.getItem('access'))
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
          <button type="submit" className="m-3 btn btn-primary" id="submit_button" onClick={(e)=>submitForm(e)}>Login</button>
          <button type="button" className="m-0 btn btn-secondary" id="register_button" onClick={gotoRegistration}>Register</button>
        </div>
      </form>
    </div>
  )
  }
  else
  {
    //props.func(sampleText,username) //Calling the 'func' props to return value to parent component
    return(
      <Navigate to='/home'/>
    
    )
  }
}

export default Login;