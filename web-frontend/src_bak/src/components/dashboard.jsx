import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Link,useNavigate,Navigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';
function Dashboard(props) {

    const [loggedUser,setLoggedUser] = useState('');
    const navigate = useNavigate(); //Navigation object to navigate to different address
    const [refreshToken, setRefreshToken] = useState('')
    const [sampleText, setSampleText] = useState('Nothing');
    const [accessValid,setAccessValid] = useState(true);


    const requestWithToken = async() => {
        //console.log(res.data['access'])
        let access_token = localStorage.getItem('access')
        if(access_token)
        {
            let test = 'Authorization: JWT '+ access_token
            console.log("Auth token "+test)
            await axios
            .get('/api/hello/',{headers: {'Content-Type':'application/json', 'Authorization':'JWT '+ access_token }} )
            .then(res => {
                    //console.log("here"+flag);
                //console.log(res.data)
                setSampleText(res.data['hello'])
                console.log("Now setting accessValid to true")
                setAccessValid(true);
                //setLoggedState(true);
            })
            .catch(err => {
                console.log("catch part Now setting accessValid to false")
                setAccessValid(false);
            })
        }
        else
        {
            console.log("function else part Now setting accessValid to false")
            setAccessValid(false)
        }
        console.log("tokenRequest function completed, accessValid value: "+accessValid);
        
    }
    const logOutUser = () => {
        if(localStorage.getItem('access'))
        {
            setSampleText('');
            setLoggedUser('');
            setAccessValid(false);
            localStorage.clear();
            console.log("logout function called");
            //navigate('/login'); //Go to login page after logging out
        }
    }

    /*if(props.text && props.loggedUser) //This is only true when user logs in and renders the Dashboard component with props
    {
        localStorage.setItem('loggedUser',props.loggedUser)
        localStorage.setItem('text',props.text)
    }
    */
    /*useEffect(()=>{        //console.log("hello")
        console.log("useEFect working")
        requestWithToken();
        console.log(accessValid);
    },[]        //console.log("hello")
        console.log("useEFect working")
        requestWithToken();
        console.log(accessValid);
    },[]
        requestWithToken();
    },[accessValid]) */

    /*useEffect(()=> {
        //console.log("hello")
        console.log("useEFect working")
        requestWithToken();
        console.log(accessValid);
    },[])
    */
    useLayoutEffect(()=> {
                //console.log("hello")
                console.log("useEFect working")
                requestWithToken();
                console.log(accessValid);
            },[]
            )

    if(accessValid && localStorage.getItem('access')) //Check if user is logged in
    {
        //requestWithToken();
        return(
            <div className="dashboard">
                <h1>{localStorage.getItem('loggedUser')} is logged in</h1>
                <h1>{sampleText}</h1>
                <button className='btn btn-danger' type='button' onClick={logOutUser}>Logout</button>
            </div>
        )
    }
    else if(!accessValid && localStorage.getItem('access'))
    {
        logOutUser();
        return(
            <Navigate to='/login' />
        )
    }
    else
    {
        return(
            <Navigate to='/login' />
        )
    }
}

export default Dashboard;