import axios from "axios";
import {React,useState} from "react";
import NavBar from "./NavBar";
import {useNavigate,Navigate} from 'react-router-dom'

function Registration(){

    const navigate = useNavigate();
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const validateForm = () => {
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
        {
          //valid=false
          alert("Invalid Email address")
          return false;
        }
        if(password==='' || username==='')
        {
          //valid=false;
          alert("Fields cannot be empty")
          return false;
        }
        return true;
      }

    const submitForm = () => {
        if(validateForm())
        {
            axios
            .post('/api/user/create/', {'username':username,'email':email,'password':password},{headers: {'Content-Type':'application/json'}})
            .then(res => {
                alert('User created successfully. Now login using the registered credentials');
                navigate('/login');
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
    if(!localStorage.getItem('access'))
    {
    return(
        <div>
        <NavBar/>
        <br/><br/>
        <form className="text-center m-5">
        
        <div>
            <label>Username:</label>
            <input className="m-2" type="text" id="reg_username" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div>
            <label>Email:</label>
            <input className="m-2" type="email" id="reg_email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
          </div>
        <br/>
          <div>
            <label> Password: </label>
            <input className="m-2" type="password" id="reg_pass" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div>
            <button type="button" className="m-3 btn btn-primary" id="submit_button" onClick={submitForm}>Submit</button>
            <button type="reset" className="m-0 btn btn-secondary" id="reset_button">Reset</button>
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

export default Registration;