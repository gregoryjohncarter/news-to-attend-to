import React, { useEffect, useState } from 'react';
import { useStoreContext } from "../utils/GlobalState";

import Article from '../components/Article';
import Pagination from '../components/Pagination';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const NewsContainer = ({ renderData }) => {
  const [state, dispatch] = useStoreContext();
  const { newsAPIData, currentRender, filterBy, totalPages } = state;

  // filter by text declarations - input & results
  const [filterQuery, setFilterQuery] = useState('');
  const [searchList, setSearchList] = useState([]);
  
  // change between recent and alphabetical ordering
  const handleFilterBy = (value) => {
    if (value === filterBy) {
      return;
    }

    dispatch({
      type: 'TOGGLE_FILTER_BY',
      filterByInput: value
    });

    dispatch({
      type: 'CHANGE_PAGE',
      pageInput: 1
    });

    renderData(newsAPIData, 1, totalPages, value);
  }

  // react hook being used to store a separate, filtered list to state
  useEffect(() => {
    if (newsAPIData.length && filterQuery.length) {
      // first filter to sort out null entries
      const notNull = newsAPIData.filter((article) => {
        return article.title !== null && article.description !== null && article.source.name !== null
      })
      // then check against the controlled input
      const results = notNull.filter((article) => {
        return article.title.toLowerCase().includes(filterQuery.toLowerCase())
        || article.description.toLowerCase().includes(filterQuery.toLowerCase())
        || article.source.name.toLowerCase().includes(filterQuery.toLowerCase());
      })
      if (filterBy === 'recently') {
        setSearchList(results);
      } else {
        setSearchList(results.slice().sort(function(a, b) {
          let textA = a.title.toUpperCase();
          let textB = b.title.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }));
      }
    }
  }, [newsAPIData, filterQuery, filterBy])

  return (
    <div className='news-container'>
      <div className='filter-area'>
        <Col xs={7}>
          <Form className='padding-right'>
            <Form.Control 
              size='sm'
              type='text'
              placeholder='Filter results'
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className='filter-by sorting'
            />
          </Form>
        </Col>
        <Col xs={5}>
          <Form.Select
            size='sm'
            aria-label="filter By"
            onChange={(e) => handleFilterBy(e.target.value)}
            name='filterByInput'
            value={filterBy}
            style={{fontSize:'.9rem'}}
            className='overflow sorting'
          >
            <option value='recently' className='overflow'>By recent</option>
            <option value='alphabetically' className='overflow'>By alphabet</option>
          </Form.Select>
        </Col>
      </div>
      <div className='inner-news-container'>
        <div className='inner-container'>
          {/* whenever there is a filter query present, prioritize that render */}
          {filterQuery.length && newsAPIData.length ? searchList.map((article, index) => {
            return <Article 
              title={article.title}
              description={article.description} 
              url={article.url}
              publishedAt={article.publishedAt}
              source={article.source.name}
              key={index}
              keyIndex={index}
            />
          }) : currentRender.map((article, index) => {
            return <Article 
              title={article.title}
              description={article.description} 
              url={article.url}
              publishedAt={article.publishedAt}
              source={article.source.name}
              key={index}
              keyIndex={index}
            />
          })}
        </div>
      </div>
      <Pagination renderData={renderData} combineSearch={filterQuery}/>
    </div>
  );
};

export default NewsContainer;