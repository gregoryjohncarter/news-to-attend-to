import React, { useState, useEffect } from 'react';
import { useStoreContext } from "../utils/GlobalState";
import usePagination, { DOTS } from "../hooks/usePagination";
import { nanoid } from 'nanoid'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Pagination = ({ renderData, combineSearch }) => {
  const [state, dispatch] = useStoreContext();
  const { newsAPIData, currentPage, totalPages } = state;

  const paginationRange = usePagination({
    currentPage,
    totalPages
  });

  const [disabledLeft, setDisabledLeft] = useState(true);
  const [disabledRight, setDisabledRight] = useState(false);

  // conditionals for when the next and previous buttons are enabled/disabled
  const checkButtons = (currentPage, totalPages) => {
    if (currentPage === totalPages) {
      setDisabledRight(true);
    } else {
      setDisabledRight(false);
    }
    if (currentPage === 1) {
      setDisabledLeft(true);
    } else {
      setDisabledLeft(false);
    }
  }

  useEffect(() => {
    checkButtons(currentPage, totalPages);
  }, [currentPage, totalPages])

  const onPageChange = (value) => {
    dispatch({
      type: 'CHANGE_PAGE',
      pageInput: value
    });
    renderData(newsAPIData, value, totalPages);
  }

  const onNext = (value) => {
    dispatch({
      type: 'NEXT_PAGE',
      pageInput: value
    });
    renderData(newsAPIData, (value + 1), totalPages);
  };

  const onPrevious = (value) => {
    dispatch({
      type: 'PREVIOUS_PAGE',
      pageInput: value
    });
    renderData(newsAPIData, (value - 1), totalPages);
  };
  
  return (
    <Row>
      <Col s={12}>
        <ul 
          aria-label='pagination list'
          className='d-flex'
          style={{listStyle: 'none'}}
        >
          {/* left arrow */}
          <li key='left' className='pagination-item'>
            <Button
              variant='light'
              className='arrow-btn left'
              aria-label='Goto previous page'
              onClick={() => onPrevious(currentPage)}
              disabled={combineSearch.length ? true : disabledLeft}
            >
              &lt;
            </Button>
          </li>

          {/* when filtering by search, limit to 1 page results */}
          {combineSearch.length ? (
            <li
              key='single'
              className='pagination-item'
            >
              <Button variant='light'>
                1
              </Button>
            </li>
          ) : ( paginationRange.map((pageNumber) => { /* ELSE mid range w/ updated page nums. */
            const key = nanoid();
            if (pageNumber === DOTS) {
              return (
                <li key={key} className="dots">
                  &#8230;
                </li>
              );
            }
            return (
              <li
                key={key}
                className='pagination-item'
                aria-current={pageNumber === currentPage ? "page" : "false"}
              >
                <Button
                  variant='light'
                  aria-label={`Goto page ${pageNumber}`}
                  onClick={() => onPageChange(pageNumber)}
                  style={pageNumber === currentPage ? {backgroundColor:'azure', borderRadius: '30px', padding: '10px'} : {}}
                >
                  {pageNumber}
                </Button>
              </li>
            );
          }) )}

          {/* right arrow */}
          <li key='right' className="pagination-item">
            <Button
              variant='light'
              className='arrow-btn right'
              aria-label='Goto next page'
              onClick={() => onNext(currentPage)}
              disabled={combineSearch.length ? true : disabledRight}
            >
              &gt;
            </Button>
          </li>
        </ul>
      </Col>
    </Row>
  );
};

export default Pagination;