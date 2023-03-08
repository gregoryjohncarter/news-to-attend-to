import React, { useEffect, useState } from 'react';
import { useStoreContext } from "../utils/GlobalState";

import Article from '../components/Article';
import Pagination from '../components/Pagination';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

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
      // change null entries to empty strings
      const notNull = (newsData) => {
        newsData.forEach((article) => {
          if (article.title === null) {
            article.title = "";
          }
          if (article.description === null) {
            article.description = "";
          }
          if (article.source.name === null) {
            article.source.name= "";
          }
        })
        return newsData
      }
      // check against the input
      const results = notNull(newsAPIData).filter((article) => {
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

  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: '✗', value: '1' },
    { name: '✔️', value: '2' }
  ];

  return (
    <div className='news-container'>
      <div className='filter-area'>
        <Col xs={5}>
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
        <Col xs={3}>
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          <p>Thumbnails</p>
        </Col>
        <Col xs={4}>
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
      {newsAPIData.length > 0 && <hr></hr>}
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
              img={radioValue === '2' ? article.urlToImage : null}
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
              img={radioValue === '2' ? article.urlToImage : null}
            />
          })}
        </div>
      </div>
      <Pagination renderData={renderData} combineSearch={filterQuery}/>
    </div>
  );
};

export default NewsContainer;