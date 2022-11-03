import React, { useState, useEffect } from 'react';
import { useStoreContext } from "../utils/GlobalState";

import Article from '../components/Article';
import Pagination from '../components/Pagination';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NewsContainer = ({ renderData }) => {
  const [state, dispatch] = useStoreContext();
  const { currentRender, filterBy } = state;
  console.log(currentRender)

  const [filterQuery, setFilterQuery] = useState('');
  // console.log(filterQuery);
  // console.log(filterBy + 'filterBy');
  
  const handleFilterBy = (value) => {
    dispatch({
      type: 'TOGGLE_FILTER_BY',
      filterByInput: value
    });
  }

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
          return <Article title={article.title} description={article.description} keyIndex={index}/>
        })}
        </div>
      </div>
      <Pagination renderData={renderData}/>
    </div>
  );
};

export default NewsContainer;