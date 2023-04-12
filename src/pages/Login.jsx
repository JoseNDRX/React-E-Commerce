import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Login = () => {
  return (
    <div>
      Bienvenido, por favor ingresa tu usuario y contraseña
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="username"
          aria-label="username"
          aria-describedby="basic-addon2"
        />
        <Form.Control
          placeholder="password"
          aria-label="password"
          aria-describedby="basic-addon2"
        />
      </InputGroup>
      <Button variant="outline-secondary" id="button-addon2">
        Access
      </Button>
    </div>
  );
};

export default Login;