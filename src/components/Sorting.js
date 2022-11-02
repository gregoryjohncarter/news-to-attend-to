import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';

const Sorting = () => {
  const [sortingInput, setSortingInput] = useState('recent');

  return (
    <Form.Select 
      aria-label="Sorting by"
      onChange={(e) => setSortingInput(e.target.value)}
      name='sortingInput'
      value={sortingInput}
      style={{fontSize:'.9rem'}}
    >
      <option value='recent'>Recent</option>
      <option value='relevant'>Relevant</option>
    </Form.Select>
  );
};

export default Sorting;