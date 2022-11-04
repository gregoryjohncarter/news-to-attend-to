import React from 'react';
import { useStoreContext } from "../utils/GlobalState";

import SearchBar from '../components/SearchBar';
import NewsContainer from '../components/NewsContainer';

import Container from 'react-bootstrap/Container';

const Home = () => {
  const [state, dispatch] = useStoreContext();

  const handleRenderData = (articles, current, pageCount, filterByToggle) => {
    let displayDataStart;
    if (current === 1) {
      displayDataStart = 0;
    } else {
      // where to start rendering based on index
      displayDataStart = (15 * current) - 15;
    }

    let displayDataEnd;
    // determine final index for slice
    if (current === pageCount) {
      displayDataEnd = articles.length
    } else {
      displayDataEnd = 15 * current;
    }

    if (articles.length <= 15) {
      if (filterByToggle === 'alphabetically') {
        let filter = articles.slice().sort(function(a, b) {
          let textA = a.title.toUpperCase();
          let textB = b.title.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        dispatch({
          type: 'DATA_TO_RENDER',
          dataToRender: filter
        });
      } else {
        dispatch({
          type: 'DATA_TO_RENDER',
          dataToRender: articles
        });
      }
    } else {
      if (filterByToggle === 'alphabetically') {
        let filter = articles.slice().sort(function(a, b) {
          let textA = a.title.toUpperCase();
          let textB = b.title.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        let slice = filter.slice(displayDataStart, displayDataEnd);
        dispatch({
          type: 'DATA_TO_RENDER',
          dataToRender: slice
        });
      } else {
        // sets the boundaries for the current range displayed
        let slice = articles.slice(displayDataStart, displayDataEnd);
        dispatch({
          type: 'DATA_TO_RENDER',
          dataToRender: slice
        });
      }
    }
  }

  const handleAPIData = (json) => {
    if (json.totalResults > 0) {
      dispatch({
        type: 'DATA_STORE',
        newsAPIData: json.articles
      });

      if (json.totalResults % 15 === 0) {
        const pageCount = json.totalResults / 15;
        json.pageCount = pageCount;
      } else {
        const pageCount = Math.floor(json.totalResults / 15) + 1;
        json.pageCount = pageCount;
      }
      
      dispatch({
        type: 'SET_TOTAL_PAGES',
        setTotalPages: json.pageCount
      });

      dispatch({
        type: 'CHANGE_PAGE',
        pageInput: 1
      });

      return json;
    }
  }

  const fetchNews = (sorting, filterBy) => {
    const apiKey = 'e4481f7edf634ba0b3755068bd11dfa9';

    if (sorting === 'general') {
      fetch(`https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(json => handleAPIData(json))
        .then(render => handleRenderData(render.articles, 1, render.pageCount, filterBy))
        .catch(error => console.error(error))
    } else {
      fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${sorting}&pageSize=100&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(json => handleAPIData(json))
        .then(render => handleRenderData(render.articles, 1, render.pageCount, filterBy))
        .catch(error => console.error(error))
    }
  }

  return (
    <>
      <h2 className='newsfeed-title'>Top US Headlines-  
        <span className='newsfeed-url'>
          https://newsapi.org/
        </span>
      </h2>
      <Container fluid='md' className='container-margin'>
        <SearchBar fetchNews={fetchNews}/>
        <NewsContainer renderData={handleRenderData}/>
      </Container>
    </>
  );
};

export default Home;