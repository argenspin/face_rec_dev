import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-bootstrap';
import ihrdlogo from '../img/ihrdlogo.png';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";
import Login from './login';
function NavBar() {
  return (
    <div className='mw-100 bg-success'>

<Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/"><img src={ihrdlogo}/></Navbar.Brand>
          <Nav className="me-auto">
            <NavLink href="/"><h4>Monitoring</h4></NavLink>
            <NavLink href="/login"><h4>Login</h4></NavLink>
            <NavLink href="/about"><h4>About</h4></NavLink>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}
export default NavBar;
