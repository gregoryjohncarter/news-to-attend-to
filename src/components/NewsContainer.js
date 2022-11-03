import React, { useState, useEffect } from 'react';
import { useStoreContext } from "../utils/GlobalState";

import Article from '../components/Article';
import Pagination from '../components/Pagination';

const NewsContainer = () => {
  const [state, dispatch] = useStoreContext();
  const { currentPage, totalPages, newsAPIData } = state;

  return (
    <>
      {newsAPIData.map((article, index) => {
        return <Article title={article.title} description={article.description} key={index}/>
      })}
      <Pagination/>
    </>
  );
};

export default NewsContainer;