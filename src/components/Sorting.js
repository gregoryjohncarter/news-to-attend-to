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
    >
      <option value='recent'>Recent</option>
      <option value='relevant'>Relevant</option>
    </Form.Select>
  );
};

export default Sorting;