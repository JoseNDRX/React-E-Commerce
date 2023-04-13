import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../helpers/GetConfig';
import { setIsLoading } from './isLoading.slice'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: ( state, action ) => {
          return action.payload
        }
    }
})

export const getCartThunk = () => dispatch => {
  dispatch( setIsLoading( true ) )
  axios
    .get('https://e-commerce-api-v2.academlo.tech/api/v1/cart', getConfig() )
    .then( resp => dispatch( setCart( resp.data ) ) )
    .catch( error => console.error( error ) )
    .finally( () => dispatch (setIsLoading( false ) ) )
}

export const addProductThunk = data => dispatch => {
  dispatch( setIsLoading( true ) )
  axios
    .post('https://e-commerce-api-v2.academlo.tech/api/v1/cart', data, getConfig() )
    .then( () => dispatch( getCartThunk() ) )
    .catch( error => console.error( error ) )
    .finally( () => dispatch (setIsLoading( false ) ) )
}
export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;