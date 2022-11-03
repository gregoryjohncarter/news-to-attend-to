import React from 'react';
import { useStoreContext } from "../utils/GlobalState";

import Form from 'react-bootstrap/Form';

const Sorting = () => {
  const [state, dispatch] = useStoreContext();
  let { sorting } = state;
  
  const handleSorting = (value) => {
    dispatch({
      type: 'TOGGLE_SORTING',
      sortingInput: value
    });
  }

  return (
    <Form.Select 
      aria-label="Sorting by"
      onChange={(e) => handleSorting(e.target.value)}
      name='sortingInput'
      value={sorting}
      style={{fontSize:'.9rem'}}
      default='general'
      className='overflow sorting'
    >
      <option value='all'>All recent</option>
      <option value='business' className='overflow'>Business</option>
      <option value='entertainment' className='overflow'>Entertainment</option>
      <option value='general'>General</option>
      <option value='health'>Health</option>
      <option value='science'>Science</option>
      <option value='sports'>Sports</option>
      <option value='technology' className='overflow'>Technology</option>
    </Form.Select>
  );
};

export default Sorting;