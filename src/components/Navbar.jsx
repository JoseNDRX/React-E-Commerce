import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import CartSidebar from './CartSidebar';

const NavBar = () => {
  const [ show, setShow ] = useState(false)
  const handleClose = () => {
    setShow(false)
  }
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to ='/'>E-Commerce</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to ='/login'><i className='bx bx-user'></i> LOGIN</Nav.Link>
            <Nav.Link as={Link} to ='/purchases'><i className='bx bx-shopping-bag'></i> PURCHASES</Nav.Link>
            <Nav.Link onClick={ () => setShow( true ) }><i className='bx bx-cart'></i> CARRITO</Nav.Link>
          </Nav>
        </Container>
      </Navbar>      
      <CartSidebar
        show={ show }
        handleClose={ handleClose }
      />
    </>
    
  );
};

export default NavBar;