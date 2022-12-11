import axios from "axios";
import {React,useState} from "react";
import NavBar from "./NavBar";
import {useNavigate,Navigate} from 'react-router-dom'
import '../css/test_login.css';
import userlogo from '../img/userlogo.png';
import { Link } from "react-router-dom";

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

    const submitForm = (e) => {
      e.preventDefault();
        if(validateForm())
        {
            axios
            .post('/api/user/create/', {'username':username,'email':email,'password':password},{headers: {'Content-Type':'application/json'}})
            .then(res => {
                alert('User created successfully. Now login using the registered credentials');
                navigate('/login');
            })
            .catch(err => {
                alert(err);
            })
        }
    }
    if(!localStorage.getItem('access'))
    {
      /*
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

    */
    return(
      <div>
      <NavBar/>
      <div className="container-fluid">
      <div className="row main-content bg-success text-center">
        <div className="col-md-4 text-center company__info">
          <img src={userlogo}/>
        </div>
        <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
          <div className="container-fluid">
            <div className="row">
              <h2>Register User</h2>
            </div>
            <div className="row">
              <form control="" className="form-group">
                <div className="row">
                  <input type="text" name="username" id="username" className="form__input" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="row">
                  <input type="email" name="email" id="email" className="form__input" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="row">
                  {/*<span className="fa fa-lock"></span>*/}
                  <input type="password" name="password" id="password" className="form__input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
  
                <div className="row">
                  <input type="submit" value="Submit" className="btn_login" onClick={(e)=>submitForm(e)} />
                  <input type="reset" value="Reset" className="btn_login" />
                </div>
              </form>
            </div>
            <div className="row">
              <p>Already have an account? <Link to='/login'>Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
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