import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Link,useNavigate,Navigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';
import Sidebar from './sidebar';
import { Container } from 'react-bootstrap';
import '../css/home_page.css'


function Home(props) {

    // " ` ", this character is used inside headers to use variables inside string
    const axiosInstance = axios.create({
        baseURL: '/api/',
        headers: {'Content-Type':'application/json'},
        timeout: 1000
    })

    const [data,setData] = useState([{  
        name: 'Ayaan',  
        age: 26  
        },{  
         name: 'Ahana',  
         age: 22  
         },{  
         name: 'Peter',  
         age: 40      
         },{  
         name: 'Virat',  
         age: 30  
         },{  
         name: 'Rohit',  
         age: 32  
         },{  
         name: 'Dhoni',  
         age: 37  
         }] )


    //axiosInstance.defaults.headers.get['Authorization']  = `JWT ${localStorage.getItem('access')}`;



    const [loggedUser,setLoggedUser] = useState('');
    const navigate = useNavigate(); //Navigation object to navigate to different address
    //const [refreshToken, setRefreshToken] = useState('')
    const [sampleText, setSampleText] = useState('Nothing');
    const [accessValid,setAccessValid] = useState(true);

    const refreshTheToken = async() => {
        console.log("TOken refreshing")
        let refreshToken = localStorage.getItem('refresh');
        if(refreshToken)
        {
            await axiosInstance
                .post('/token/refresh/',{'refresh': refreshToken})
                .then(res => {
                    let accessToken = res.data['access'];
                    localStorage.setItem('access',accessToken);
                    setAccessValid(true);
                })
                .catch(err => {
                    setAccessValid(false)
                    console.log("cannot refresh token");
                })
        }
    }

    axiosInstance.interceptors.response.use(
        response => {
            console.log("Interceptor working")
            return response
        },
        error => {
            console.log("Error catched by interceptor");
            if(error.response.status == 401)
            {
                refreshTheToken();
                return Promise.reject(error);
            }
        }
    )

    axiosInstance.interceptors.request.use(
        request => {
            if(request.method ==='get')
            {
                request.headers['Authorization'] = `JWT ${localStorage.getItem('access')}`;
        
            }
            return request;
        },
        error => {
            return Promise.reject(error);
        }
    )

    const requestForText = async () => {
        let access_token = localStorage.getItem('access')
        if(access_token)
        {
            //let test = 'Authorization: JWT '+ access_token
            //console.log("Auth token "+test)
            await axiosInstance
            .get('/hello')
            //.get('/hello',{headers: {'Content-Type':'application/json', 'Authorization':'JWT '+ access_token }} )
            .then(res => {
                    //console.log("here"+flag);
                //console.log(res.data)
                setSampleText(res.data['hello'])
            })
            .catch(err => {
                if(err.response.status === 401)
                console.log(err)
            })
        }
        //console.log("tokenRequest function completed, accessValid value: "+accessValid);
        
    }

    const clearText = () => {
        setSampleText('Empty');
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

    //Refresh the access token every 1 minute
    const [count, setCount] = useState(0);

    useEffect(() => {
     const timeout = setTimeout(() => {
        setCount(count+1);
        refreshTheToken();
      }, 60000);
  
     return () => clearTimeout(timeout);
    },[count]);
    

    useLayoutEffect(()=> {
                //console.log("hello")
                console.log("useEFect working")
                //requestWithToken();
                refreshTheToken();
                console.log(accessValid);
            },[]
            )

    if(accessValid && localStorage.getItem('access')) //Check if user is logged in
    {
        //requestWithToken();
        return(
            <div className='dashboard'>
                <Sidebar/>
                
                <Container>
                <h1>{localStorage.getItem('loggedUser')} is logged in</h1>
                <h1>{sampleText}</h1> 
                <button className='btn btn-danger' type='button' onClick={logOutUser}>Logout</button>
                <button className='btn btn-secondary' type='button' onClick={requestForText}>Click Me</button>
                <button className='btn btn-secondary' type='button' onClick={clearText}>Clear Text</button>
                </Container>
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

export default Home;