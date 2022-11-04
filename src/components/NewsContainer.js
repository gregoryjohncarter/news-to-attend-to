import React, { useEffect, useState } from 'react';
import { useStoreContext } from "../utils/GlobalState";

import Article from '../components/Article';
import Pagination from '../components/Pagination';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const NewsContainer = ({ renderData }) => {
  const [state, dispatch] = useStoreContext();
  const { newsAPIData, currentRender, filterBy, totalPages } = state;

  const [filterQuery, setFilterQuery] = useState('');
  // console.log(filterQuery);
  
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

  // const renderFilterBy = useEffect(() => {
  //   console.log('test')
  //   renderData(newsAPIData, 1, totalPages, filterBy);
  // }, [filterBy])

  return (
    <div className='news-container'>
      <div className='filter-area'>
        <Col xs={7}>
          <Form className='padding-right'>
            <Form.Control 
              size='sm'
              type='text'
              placeholder='Enter filter term'
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
        {currentRender.map((article, index) => {
          return <Article 
            title={article.title}
            description={article.description} 
            url={article.url}
            publishedAt={article.publishedAt}
            source={article.source.name}
            keyIndex={index}
          />
        })}
        </div>
      </div>
      <Pagination renderData={renderData}/>
    </div>
  );
};

export default NewsContainer;