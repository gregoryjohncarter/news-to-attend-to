import React from 'react';

import SearchBar from '../components/SearchBar';
import NewsContainer from '../components/NewsContainer';

import Container from 'react-bootstrap/Container';

const Home = () => {
  return (
    <>
      <Container fluid='md'>
        <SearchBar/>
        <NewsContainer/>
      </Container>
    </>
  );
};

export default Home;