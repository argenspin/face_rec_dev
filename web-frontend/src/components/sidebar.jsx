import React from "react";
import '../css/sidebar.css';
import { Link } from "react-router-dom";
import { Nav,NavLink,Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faHome,faUser,faSchool, faBook } from "@fortawesome/free-solid-svg-icons";
function Sidebar(){
    return(
        <div className="sidebar">
            <Nav className="flex-column pt-2">

                <NavLink className='d-flex align-items-center justify-content-center'>
                <FontAwesomeIcon icon={faHome}  size='3x' />
                </NavLink>
                <br/>
                <br/>

                <NavLink activeClassName="active" className='d-flex align-items-center justify-content-center'>
                <FontAwesomeIcon icon={faSchool}  size='xl' />
                <span className="m-2 sidebar-option">Dashboard</span>
                </NavLink>

                <NavLink activeClassName="active" className='d-flex align-items-center justify-content-center'>
                <FontAwesomeIcon icon={faUser}  size='xl' />
                <span className="m-2 sidebar-option">Students</span>
                </NavLink>

                <NavLink activeClassName="active" className='d-flex align-items-center justify-content-center'>
                <FontAwesomeIcon icon={faUser}  size='xl' />
                <span className="m-2 sidebar-option">Teachers</span>
                </NavLink>

                <NavLink activeClassName="active" className='d-flex align-items-center justify-content-center'>
                <FontAwesomeIcon icon={faBook}  size='xl' />
                <span className="m-2 sidebar-option">Attendance</span>
                </NavLink>
            </Nav>
        </div>
        
    )
}

export default Sidebar;