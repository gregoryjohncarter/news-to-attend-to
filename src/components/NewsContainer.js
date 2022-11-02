import React, { useState, useEffect } from 'react';
// import { useStoreContext } from "../utils/GlobalState";

import Article from '../components/Article';
import Pagination from '../components/Pagination';

const NewsContainer = () => {
  // const [state, dispatch] = useStoreContext();
  // const { newsAPIData, currentPage } = state;
  
  return (
    <>
    {/* Map articles */}
      <Article/>
      <Pagination/>
    </>
  );
};

export default NewsContainer;