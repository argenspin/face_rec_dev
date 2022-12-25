import {React,useLayoutEffect,useState} from "react";
import '../css/sidebar.css';
import { Link } from "react-router-dom";
import { Nav,NavLink,Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faHome,faUser,faSchool, faBook } from "@fortawesome/free-solid-svg-icons";
import {logOutUser} from './home'
import { axiosInstance } from "./axiosinstance";

function Sidebar(){

    const [studClassName, setStudClassName] = useState('');
    const [userType,setUserType] = useState('')

    const getUserTypeAndStudClassName = async() => {
        await axiosInstance
        .get('usertypestudclass/retrieve/')
        .then(res => {
            setUserType(res.data['user_type']);
            setStudClassName(res.data['stud_class_name']);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useLayoutEffect(()=> {
        getUserTypeAndStudClassName();
    },[])

    if(userType==='admin')
    {
    return(
        <div className="bg-slate-800 sidebar">
            <Nav className="flex-column pt-2 px-1">

                <Link className='active d-flex align-items-center justify-content-center' to='/home'>
                <FontAwesomeIcon icon={faHome}  size='3x' />
                </Link>
                <br/>
                <br/>

                <Link className='hover:bg-slate-700 bg-green-400 rounded d-flex align-items-center justify-content-center'>
                <FontAwesomeIcon icon={faSchool}  size='xl' />
                <span className="m-2 sidebar-option text-3xl text-teal-700 font-bold ">Dashboard</span>
                </Link>
                <br/>
                <Link className='hover:bg-slate-700 bg-green-400 rounded d-flex align-items-center justify-content-center' to='students'>
                <FontAwesomeIcon icon={faUser}  size='xl' />
                <span className="m-2 sidebar-option text-3xl text-teal-700 font-bold">Students</span>
                </Link>
                <br/>
                <Link className='hover:bg-slate-700 bg-green-400 rounded d-flex align-items-center justify-content-center' to='teachers'>
                <FontAwesomeIcon icon={faUser}  size='xl' />
                <span className="m-2 sidebar-option text-3xl text-teal-700 font-bold">Teachers</span>
                </Link>
                <br/>
                <Link  className='hover:bg-slate-700 bg-green-400 rounded d-flex align-items-center justify-content-center'>
                <FontAwesomeIcon icon={faBook}  size='xl' />
                <span className="m-2 sidebar-option text-3xl text-teal-700 font-bold">Attendance</span>
                </Link>

            </Nav>
            

        </div>
        
    )
    }
    else if(userType==='teacher')
    {
        return(
            <div className="bg-slate-800 sidebar">
            <Nav className="flex-column pt-2 px-1">

                <Link className='active d-flex align-items-center justify-content-center' to='/home'>
                <FontAwesomeIcon icon={faHome}  size='3x' />
                </Link>
                <br/>
                <br/>

                <Link className='hover:bg-slate-700 bg-green-400 rounded d-flex align-items-center justify-content-center'>
                <FontAwesomeIcon icon={faSchool}  size='xl' />
                <span className="m-2 sidebar-option text-3xl text-teal-700 font-bold ">Dashboard</span>
                </Link>
                <br/>
                <Link className='hover:bg-slate-700 bg-green-400 rounded d-flex align-items-center justify-content-center' to='students'>
                <FontAwesomeIcon icon={faUser}  size='xl' />
                <span className="m-2 sidebar-option text-3xl text-teal-700 font-bold">Students</span>
                </Link>
                <br/>
                <Link  className='hover:bg-slate-700 bg-green-400 rounded d-flex align-items-center justify-content-center'>
                <FontAwesomeIcon icon={faBook}  size='xl' />
                <span className="m-2 sidebar-option text-3xl text-teal-700 font-bold">Attendance</span>
                </Link>

            </Nav>
            

        </div>
        )
    }

}

export default Sidebar;