import React from 'react';
import { useStoreContext } from "../utils/GlobalState";

import Sorting from '../components/Sorting';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const SearchBar = ({ fetchNews, spinner }) => {
  const [state, dispatch] = useStoreContext();
  const { sorting, filterBy } = state;

  const Spinner = () => {
    return (
      <div className='loading-animation'>
        <div className='spinner'>
          {/* Mask of the quarter of circle */}
          <div className='mask'>
            {/* Inner masked circle */}
            <div className='masked-circle'>
            </div>
          </div>
        </div>
      </div>
    )
  }  

  return (
    <>
      <Row>
        <Col xs={7}>
          <div className='d-flex fetch-news'>
            <h3 className='btn-heading'>
              Get articles
            </h3>
            {!spinner ? <Button 
              variant='dark'
              onClick={() => fetchNews(sorting, filterBy)}
              className='btn-fetch'
            >
              ↳
            </Button> : <Button className='btn-fetch'><Spinner/></Button>}
          </div>
        </Col>
        <Col xs={5}>
          <Sorting/>
        </Col>
      </Row>
    </>
  );
};

export default SearchBar;