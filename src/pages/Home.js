import React from 'react';
import { useStoreContext } from "../utils/GlobalState";

import SearchBar from '../components/SearchBar';
import NewsContainer from '../components/NewsContainer';

import Container from 'react-bootstrap/Container';

const Home = () => {
  const [state, dispatch] = useStoreContext();

  const fetchNews = (searchQuery, sorting) => {
    if (searchQuery) {
      const apiKey = 'e4481f7edf634ba0b3755068bd11dfa9';
      fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&sortBy=${sorting === 'recent' ? 'publishedAt' : 'relevancy'}&language=en&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(json => handleAPIData(json))
        .catch(error => console.error(error))
    } else {
      return;
    }
  }

  const handleAPIData = (json) => {
    if (json.totalResults > 0) {
      dispatch({
        type: 'DATA_STORE',
        newsAPIData: json.articles
      });
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