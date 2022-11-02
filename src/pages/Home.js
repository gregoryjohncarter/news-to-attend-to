import React from 'react';

import SearchBar from '../components/SearchBar';
import NewsContainer from '../components/NewsContainer';

import Container from 'react-bootstrap/Container';

const Home = () => {
  return (
    <>
      <h2 style={{paddingLeft: '25px'}}>Newsfeed by-  
        <span style={{fontStyle:'italic', color: 'orange'}}>
          https://newsapi.org/
        </span>
      </h2>
      <Container fluid='md'>
        <SearchBar/>
        <NewsContainer/>
      </Container>
    </>
  );
};

export default Home;