import React, { useState } from 'react';

import Sorting from '../components/Sorting';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SearchBar = () => {
  return (
    <>
      <Row>
        <Col s={12} m={7}>
          <div>
          </div>
        </Col>
        <Col s={12} m={5}>
          <Sorting/>
        </Col>
      </Row>
    </>
  );
};

export default SearchBar;