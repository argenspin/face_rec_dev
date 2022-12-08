import React, { useState } from "react";
import Dashboard from "./dashboard";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
  } from "react-router-dom";
import NavBar from './NavBar';
import Login from './login';
function Main(){

    const [text, setText] = useState('');
    const getTextFromChild = (recievedText) =>{
        setText(recievedText);
        console.log(recievedText)
    }
        return (
            <div>
            
            <Router>
                <Routes>
                    
                    <Route exact path='/login' element={<Login func={getTextFromChild} />} />
                    <Route exact path='/home' element={<Dashboard text={text} />} />
                </Routes>
            </Router>
            </div>
        )
}

export default Main;