import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Article = ({ title, description, key}) => {
  return (
    <Row key={key}>
      <Col xs={12}>
        <div className='article'>
          <h2 className='title'>
            {title}
          </h2>
          <p className='description'>
            {description}
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default Article;