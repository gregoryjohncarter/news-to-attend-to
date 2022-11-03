import React, { useState, useEffect } from 'react';
import { useStoreContext } from "../utils/GlobalState";
import usePagination, { DOTS } from "../hooks/usePagination";
import { nanoid } from 'nanoid'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Pagination = () => {
  const [state, dispatch] = useStoreContext();
  const { currentPage, totalPages } = state;

  const paginationRange = usePagination({
    currentPage,
    totalPages
  });

  const [disabledLeft, setDisabledLeft] = useState();
  const [disabledRight, setDisabledRight] = useState();

  // conditionals for when the next and previous buttons are enabled/disabled
  const buttonsEnabled = useEffect(() => {
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
  }, [currentPage]);

  const onPageChange = (number) => {
    dispatch({
      type: 'CHANGE_PAGE',
      currentPage: number
    });
  }

  const onNext = () => {
    dispatch({
      type: 'NEXT_PAGE',
      currentPage: currentPage + 1
    });
  };

  const onPrevious = () => {
    dispatch({
      type: 'PREVIOUS_PAGE',
      currentPage: currentPage - 1
    });
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
              onClick={onPrevious}
              disabled={disabledLeft}
            >
              &lt;
            </Button>
          </li>

          {/* mid range (page nums.) */}
          {paginationRange.map((pageNumber) => {
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
                key={pageNumber}
                className='pagination-item'
                aria-current={pageNumber === currentPage ? "page" : "false"}
              >
                <Button
                  variant='light'
                  className=''
                  aria-label={`Goto page ${pageNumber}`}
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </Button>
              </li>
            );
          })}

          {/* right arrow */}
          <li key='right' className="pagination-item">
            <Button
              variant='light'
              className='arrow-btn right'
              aria-label='Goto next page'
              onClick={onNext}
              disabled={disabledRight}
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