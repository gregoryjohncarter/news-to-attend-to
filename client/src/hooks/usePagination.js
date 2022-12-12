export const DOTS = "...";

function usePagination({
  currentPage,
  totalPages
}) {  
  const returnArr = [];

  if (totalPages === 1) {
    return [1];
  }

  if (totalPages === 2) {
    return [1, 2];
  }
  
  if (totalPages === 3) {
    return [1, 2, 3];
  }

  if (currentPage === 1) {
    returnArr.push(1);
    if (totalPages > 3) {
      returnArr.push(2);
      returnArr.push(3);
      returnArr.push(DOTS);
      returnArr.push(totalPages);
      return returnArr;
    }
  }

  if (currentPage === 2) {
    returnArr.push(1);
    returnArr.push(2);
    if (totalPages > 3) {
      returnArr.push(3);
      returnArr.push(DOTS);
      returnArr.push(totalPages);
      return returnArr;
    }
  }

  if (totalPages === currentPage) {
    returnArr.push(1);
    returnArr.push(DOTS);
    returnArr.push(currentPage - 2);
    returnArr.push(currentPage - 1);
    returnArr.push(currentPage);
    return returnArr;
  }

  returnArr.push(1);
  returnArr.push(DOTS);
  returnArr.push(currentPage - 1);
  returnArr.push(currentPage);

  if (totalPages === currentPage + 1) {
    returnArr.push(totalPages);
    return returnArr;
  }

  returnArr.push(currentPage + 1);
  returnArr.push(DOTS);
  returnArr.push(totalPages);

  return returnArr;
}

export default usePagination;
