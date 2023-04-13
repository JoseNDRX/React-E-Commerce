import React, { useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading } from '../store/slices/isLoading.slice';
import { getCartThunk, cartCheckoutThunk } from '../store/slices/cart.slice';
import axios from 'axios';
import getConfig from '../helpers/GetConfig';

const CartSidebar = ( { show, handleClose } ) => {
  const dispatch = useDispatch()
  const cart = useSelector( state => state.cart )
  const [ totalInCart, setTotalInCart ] = useState( [] )

  useEffect( () => {
    dispatch( getCartThunk() ) 
  }, []);

  const addQuantity = (product) => {
    const data = {
      "quantity": product.quantity + 1
    }
    dispatch( setIsLoading( true ) )
    axios
      .put( `https://e-commerce-api-v2.academlo.tech/api/v1/cart/${product.id}`, data, getConfig() )
      .then( () => dispatch( getCartThunk() ) )
      .catch( error => console.error( error ) )
      .finally( () => dispatch (setIsLoading( false ) ) )
  }
  const decreaseQuantity = ( product ) => {
    const data = {
      "quantity": product.quantity - 1
    }
    dispatch( setIsLoading( true ) )
    axios
      .put( `https://e-commerce-api-v2.academlo.tech/api/v1/cart/${product.id}`, data, getConfig() )
      .then( () => dispatch( getCartThunk() ) )
      .catch( error => console.error( error ) )
      .finally( () => dispatch ( setIsLoading( false ) ) )
  }
  const deleteProduct = (id) => {
    dispatch( setIsLoading( true ) )
    axios
      .delete( `https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}/`, getConfig() )
      .then( () => dispatch( getCartThunk() ) )
      .catch( error => console.error( error ) )
      .finally( () => dispatch ( setIsLoading( false ) ) )
  }
  useEffect( () => {
    setTotalInCart(cart?.map( product => {
      return product.quantity * product.product?.price
    }))
  }, [cart])
  const getTotal = () =>{
    let totalAmount = 0
    for (let index = 0; index < totalInCart.length; index++) {
      totalAmount += totalInCart[index]      
    }
    return totalAmount
  }
  
  return (
    <Offcanvas show={show} onHide={handleClose} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Products in Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ul style={{ listStyle: 'none'}}>
          {
            cart.map( product => (
             <li key={ product.id }>
              <img style={{ width: 70}}src={ product.product?.images?.[0].url} alt="" />
              <h6>{ product.product?.title.slice(0, 35) } </h6>

              <div className='cartQtyControls'>
                <Button disabled={product.quantity < 2} variant="success" onClick={() => decreaseQuantity(product)}>-</Button>
                <p>{product.quantity}</p>
                <Button variant="success" onClick={() => addQuantity(product)}>+</Button>
              </div>

              <p>Subtotal: ${ product.quantity * product.product?.price }</p>

              <div className='deleteProduct'>
                <i onClick={() => deleteProduct(product.id)} className='bx bx-trash'></i>
              </div>
              
             </li> 
            ) )
          
          }
        </ul>
        <p>Total: ${getTotal().toFixed(2)}</p>
        <button className='checkout' onClick={ () => dispatch( cartCheckoutThunk() ) }><i className='bx bxs-credit-card'></i>CheckOut</button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartSidebar;