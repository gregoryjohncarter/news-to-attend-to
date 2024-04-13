import React, { useState, useEffect } from 'react';
import { useStoreContext } from "../utils/GlobalState";

import SearchBar from '../components/SearchBar';
import NewsContainer from '../components/NewsContainer';

import Container from 'react-bootstrap/Container';

const Home = () => {
  const [state, dispatch] = useStoreContext();
  const [spinner, setSpinner] = useState(false);

  const handleRenderData = (articles, current, pageCount, filterByToggle) => {
    articles = articles.filter((article) => {
      return article.title !== "[Removed]"
    });
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
        newsAPIData: json.articles.filter((article) => {
         return article.title !== "[Removed]" 
        })
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

  const fetchNews = async (sorting, filterBy) => {
    if (spinner) {
      return;
    }
    setSpinner(true);
    const response = await fetch(`/search`, {
      method: 'POST',
      body: JSON.stringify({
        sorting,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();
    const render = await handleAPIData(json);
    if (render) {
      setTimeout(() => {
        setSpinner(false);
      }, 1000);
    }
    handleRenderData(json.articles, 1, json.pageCount, filterBy);
  }

  return (
    <>
      <h2 className='newsfeed-title'>
        <span className='newsfeed-url'>
          newsapi.org
        </span>
      </h2>
      <Container fluid='md' className='container-margin'>
        <SearchBar fetchNews={fetchNews} spinner={spinner}/>
        <NewsContainer renderData={handleRenderData}/>
      </Container>
    </>
  );
};

export default Home;