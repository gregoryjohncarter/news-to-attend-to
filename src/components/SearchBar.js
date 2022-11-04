import React from 'react';
import { useStoreContext } from "../utils/GlobalState";

import Sorting from '../components/Sorting';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const SearchBar = ({ fetchNews }) => {
  const [state, dispatch] = useStoreContext();
  const { sorting, filterBy } = state;

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
              onClick={() => fetchNews(sorting, filterBy)}
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