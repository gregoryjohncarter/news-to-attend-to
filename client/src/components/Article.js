import React from 'react';
import Moment from 'react-moment';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Article = ({ title, description, url, publishedAt, source, keyIndex, img }) => {
  return (
    <Row>
      <Col xs={12}>
        <div className={keyIndex % 2 === 0 ? 'alternate' : 'article'}>
          <h2 className='title'>
            {title}
          </h2>
          <p className='description'>
            {description}
          </p>
          {img && <img style={keyIndex % 2 === 0 ? {height: '190px', width: '275px', border: '10px groove darkcyan'} : {height: '200px', width: '250px', border: '10px groove darkblue'}} src={img} alt={url}></img>}
          <a href={url} target='_blank' rel='noopener noreferrer' className='trim'>
            {url}
          </a>
          <p>
            <span style={{fontSize: '1rem'}}><Moment format='LL'>{publishedAt}</Moment></span> <span style={{color: 'gray'}}><Moment format='hh:mm A'>{publishedAt}</Moment></span>
          </p>
          <h3 className='float-right source'>
            ∟ {source}
          </h3>
        </div>
      </Col>
    </Row>
  );
};

export default Article;