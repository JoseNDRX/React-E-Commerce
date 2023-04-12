import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useSelector, useDispatch } from 'react-redux';
import { filterCategoriesThunk, filterTitleThunk, getProductsThunk } from '../store/slices/products.slice';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const products = useSelector( state => state.products )
  const dispatch = useDispatch()
  const [ categories, setCategories ] = useState( [ ] )
  const [ inputSearch, setInputSearch ] = useState ("")

  useEffect( () => {
    dispatch( getProductsThunk ())

    axios
      .get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
      .then( resp => setCategories( resp.data ) )
      .catch( error => console.error( error ) )
  }, [])

  return (
    <div>
      <Container>
        { /* categorias */}
        <Row className='py-3'>
          <Col>
                <Button
                  variant="dark"
                  className='w-100'
                  onClick={ () => dispatch( getProductsThunk() ) }>
                    All
                </Button>
          </Col>
          {
            categories.map( category => (
              <Col key={ category.id }>
                <Button
                  variant="dark"
                  className='w-100'
                  onClick={ () => dispatch( filterCategoriesThunk( category.id ) ) }>
                    { category.name }
                </Button>
              </Col>
            ))
          }
        </Row>
        {/* input de busqueda */}
        <Row className='py-3'>
        <InputGroup className="mb-3">
          <Button
            onClick={ () => dispatch( filterTitleThunk( inputSearch ) )}
            variant="dark">
            <i className='bx bx-search'></i>
          </Button>
          <Form.Control
            placeholder="Busca un producto..."
            aria-label="product"
            aria-describedby="basic-addon1"
            value={ inputSearch }
            onChange={ e => setInputSearch ( e.target.value )}
          />
        </InputGroup>
        </Row>
        {/* Card de productos */}
        <Row xs={1} md={2} lg={3} className='py-3'>
          {
            products.map( product => (
              <Col className='mb-3' key={ product.id }>
              <Card>
                <Card.Img variant="top" src={ product.images[0]?.url} style={{height: 200, objectFit: 'cover'}}/>
                <Card.Body>
                  <Card.Title>{ product.title }</Card.Title>
                  <Card.Text>${ product.price }</Card.Text>
                  <Button
                  as={ Link } to={`/products/${product.id}`}
                  variant="primary">
                    Ver detalle...
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            ))
          } 
        </Row>        
      </Container>
    </div>
  );
};

export default Home;