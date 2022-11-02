import React, { useState } from 'react';

import Sorting from '../components/Sorting';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SearchBar = () => {
  return (
    <>
      <Row>
        <Col xs={8}>
          <Form className='d-flex'>
            <Form.Control size="lg" type="text" placeholder="Filter by headline"/>
            <Button variant="dark">✘</Button>
          </Form>
        </Col>
        <Col xs={4}>
          <Sorting/>
        </Col>
      </Row>
    </>
  );
};

export default SearchBar;