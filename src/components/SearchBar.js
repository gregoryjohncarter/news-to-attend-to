import React, { useState } from 'react';

import Sorting from '../components/Sorting';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SearchBar = ({ fetchNews }) => {
  const [searchInput, setSearchInput] = useState('');

  return (
    <>
      <Row>
        <Col xs={8}>
          <Form className='d-flex'>
            <Form.Control
              size='lg'
              type='text'
              placeholder='Key word, phrase'
              name='searchInput'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button 
              variant='dark'
              onClick={() => fetchNews(searchInput)}
            >
              ↳
            </Button>
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