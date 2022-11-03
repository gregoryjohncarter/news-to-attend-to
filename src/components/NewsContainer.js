import React, { useState, useEffect } from 'react';
import { useStoreContext } from "../utils/GlobalState";

import Article from '../components/Article';
import Pagination from '../components/Pagination';

const NewsContainer = ({ renderData }) => {
  const [state, dispatch] = useStoreContext();
  const { currentRender } = state;
  console.log(currentRender)

  return (
    <div className='news-container'>
      {currentRender.map((article, index) => {
        return <Article title={article.title} description={article.description} keyIndex={index}/>
      })}
      <Pagination renderData={renderData}/>
    </div>
  );
};

export default NewsContainer;