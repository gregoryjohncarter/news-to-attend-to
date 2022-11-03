import React from 'react';
import Moment from 'react-moment';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Article = ({ title, description, url, publishedAt, source, keyIndex }) => {
  return (
    <Row key={keyIndex}>
      <Col xs={12}>
        <div className={keyIndex % 2 === 0 ? 'alternate' : 'article'}>
          <h2 className='title'>
            {title}
          </h2>
          <p className='description'>
            {description}
          </p>
          <a href={url} target='_blank' className='trim'>
            {url}
          </a>
          <p>
            <span style={{fontSize: '1rem'}}><Moment format='LL'>{publishedAt}</Moment></span> <span style={{color: 'gray'}}><Moment format='hh:mm A'>{publishedAt}</Moment></span>
          </p>
          <h3 className='float-right source'>
            {source}
          </h3>
        </div>
      </Col>
    </Row>
  );
};

export default Article;