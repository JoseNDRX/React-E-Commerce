import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { setIsLoading } from '../store/slices/isLoading.slice'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProductDetail = () => {
  const { id } = useParams()
  const [ detail, setDetail ] = useState({})
  const dispatch = useDispatch()
 
  useEffect( () => {
    dispatch( setIsLoading( true ) )
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then( (resp) => {setDetail( resp.data ), console.log(resp.data) } )
      .catch( error => console.error( error ) )
      .finally( () => dispatch (setIsLoading( false ) ) )
  }, [])

  return (
    <div>
      <Card >
      <Card.Img variant="top" src={ detail.images?.[0].url} style={{height: 300, objectFit: 'cover'}}/>
      <Card.Body>
        <Card.Title>{ detail.title }</Card.Title>
        <Card.Text>${ detail.price }</Card.Text>
        <Card.Text>{ detail.description }</Card.Text>
        <Button variant="primary">Add to cart...</Button>
      </Card.Body>
    </Card>
      
      
    </div>
  );
}

export default ProductDetail;