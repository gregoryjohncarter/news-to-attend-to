import React, { useState } from 'react';
import { useStoreContext } from "../utils/GlobalState";

import Sorting from '../components/Sorting';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SearchBar = ({ fetchNews }) => {
  const [searchInput, setSearchInput] = useState('');

  const [state, dispatch] = useStoreContext();
  const { sorting } = state;

  return (
    <>
      <Row>
        <Col xs={7}>
          <div className='d-flex fetch-news'>
            <h3 className='btn-heading'>
              Retrieve articles
            </h3>
            <Button 
              variant='dark'
              onClick={() => fetchNews(searchInput, sorting)}
              className='btn-fetch'
            >
              ↳
            </Button>
          </div>
        </Col>
        <Col xs={5}>
          <Sorting/>
        </Col>
      </Row>
    </>
  );
};

export default SearchBar;