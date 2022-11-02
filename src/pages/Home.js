import React from 'react';

import SearchBar from '../components/SearchBar';
import NewsContainer from '../components/NewsContainer';

import Container from 'react-bootstrap/Container';

const Home = () => {

  // fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&sortBy=${sorting === 'recent' ? 'publishedAt' : 'relevancy'}&language=en&apiKey=${apiKey}`)
  
  async function fetchNews(searchQuery) {
    if (searchQuery) {
      const apiKey = 'e4481f7edf634ba0b3755068bd11dfa9';
      fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&sortBy=publishedAt&language=en&apiKey=${apiKey}`)
      .then(response => response.json())
      .then(json => console.log(json))
    } else {
      return;
    }
  }

  return (
    <>
      <h2 style={{paddingLeft: '25px'}}>Newsfeed by-  
        <span style={{fontStyle:'italic', color: 'orange'}}>
          https://newsapi.org/
        </span>
      </h2>
      <Container fluid='md'>
        <SearchBar fetchNews={fetchNews}/>
        <NewsContainer/>
      </Container>
    </>
  );
};

export default Home;