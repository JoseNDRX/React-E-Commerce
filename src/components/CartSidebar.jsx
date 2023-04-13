import React, { useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk } from '../store/slices/cart.slice';

const CartSidebar = ( { show, handleClose } ) => {
  const dispatch = useDispatch()
  const cart = useSelector( state => state.cart )

  useEffect( () => {
    dispatch( getCartThunk() ) 
  }, []);

  return (
    <Offcanvas show={show} onHide={handleClose} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Products in Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ul>
          {
            cart.map( product => (
             <li key={ product.id }>
              Product
             </li> 
            ) )
          
          }
        </ul>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartSidebar;