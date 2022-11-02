import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';

const Sorting = () => {
  return (
    <div>
      <Form.Select aria-label="Sorting by">
        <option value='recently'>Sort by most recent</option>
        <option value='alphabetically'>Sort alphabetically</option>
      </Form.Select>
    </div>
  );
};

export default Sorting;