import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { setIsLoading } from '../store/slices/isLoading.slice'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { addProductThunk } from '../store/slices/cart.slice'

const ProductDetail = () => {
  const { id } = useParams()
  const [ detail, setDetail ] = useState({})
  const dispatch = useDispatch()
  const [ counter, setCounter ] = useState(1)
 
  useEffect( () => {
    dispatch( setIsLoading( true ) )
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then( (resp) => setDetail( resp.data ) )
      .catch( error => console.error( error ) )
      .finally( () => dispatch (setIsLoading( false ) ) )
  }, [])

  const addProduct = () => {
    const data = {
      "quantity" : counter,
      "productId" : id
    }
    dispatch(addProductThunk(data))
  }

  return (
    <div>
      <Card >
      <Card.Img variant="top" src={ detail.images?.[0].url} style={{height: 300, objectFit: 'cover'}}/>
      <Card.Body>
        <Card.Title>{ detail.title }</Card.Title>
        <Card.Text>${ detail.price }</Card.Text>
        <Card.Text className="text-muted mb-5 d-inline-block">{ detail.description }</Card.Text>
        <Container>
          <Row className='mb-3'>
            <Col>
              <Button onClick={ () => counter>= 2 ? setCounter( counter - 1) : setCounter(1) }>-</Button>
              { counter }
              <Button onClick={ () => setCounter( counter + 1)}>+</Button>
            </Col>
            <Col>
              <Button onClick={ addProduct } variant="primary">
                <i className='bx bx-cart-add'></i> Add to cart...
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
      
      
    </div>
  );
}

export default ProductDetail;