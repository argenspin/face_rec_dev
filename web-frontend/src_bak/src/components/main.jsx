import React, { useState } from "react";
import Dashboard from "./dashboard";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";
import NavBar from './NavBar';
import Login from './login';
import Registration from "./registration";
import Monitoring from "./monitoring";
function Main(){

    //const [loggedUser, setLoggedUser] = useState('None')
    //const [text, setText] = useState('');

    //Function to return value from parent to child
    /*const getTextFromChild = (recievedText,recievedLoggedUser) =>{
        setText(recievedText);
        setLoggedUser(recievedLoggedUser);
        console.log(recievedText)
    }
    */


        return (
            <div>
            
            <Router>
                <Routes>
                    <Route exact path='/' element={<Monitoring/>} />
                    <Route exact path='/login' element={<Login /*func={getTextFromChild} */ />} />
                    <Route exact path='/home' element={<Dashboard /*text={text} loggedUser={loggedUser} */ />} />
                    <Route exact path='/register' element={<Registration/>}/>
                </Routes>
            </Router>
            </div>
        )
}

export default Main;