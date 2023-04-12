import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice'

export const productsSlice = createSlice({ 
  name: 'products', 
  initialState: [], 
  reducers: { 
      setProducts: (state, action) => {
          const products = action.payload;
          return products
      }
  } 
}) 

export const getProductsThunk = () => dispatch => {
  dispatch( setIsLoading( true ) )
  axios
    .get('https://e-commerce-api-v2.academlo.tech/api/v1/products')
    .then( resp => dispatch( setProducts( resp.data ) ) )
    .catch( error => console.error( error ) )
    .finally( () => dispatch (setIsLoading( false ) ) )
}

export const filterCategoriesThunk = id => dispatch => {
  dispatch( setIsLoading( true ) )
  axios
    .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
    .then( resp => dispatch( setProducts( resp.data ) ) )
    .catch( error => console.error( error ) )
    .finally( () => dispatch (setIsLoading( false ) ) )
}

export const filterTitleThunk = valueInput => dispatch => {
  dispatch( setIsLoading( true ) )
  axios
    .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${valueInput}`)
    .then( resp => dispatch( setProducts( resp.data ) ) )
    .catch( error => console.error( error ) )
    .finally( () => dispatch (setIsLoading( false ) ) )
}

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;