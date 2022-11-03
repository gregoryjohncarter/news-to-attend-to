import { useReducer } from 'react';

export const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_SORTING':
      return {
        ...state,
        sorting: action.sortingInput
      };
    case 'CHANGE_PAGE':
      return {
        ...state,
        currentPage: action.pageInput
      };
    case 'NEXT_PAGE':
      return {
        ...state,
        currentPage: action.pageInput + 1
      };
    case 'PREVIOUS_PAGE':
      return {
        ...state,
        currentPage: action.pageInput - 1
      };
    case 'SET_TOTAL_PAGES':
      return {
        ...state,
        totalPages: action.setTotalPages
      };
    case 'DATA_STORE':
      return {
        ...state,
        newsAPIData: action.newsAPIData
      };
    case 'DATA_TO_RENDER':
      return {
        ...state,
        currentRender: action.dataToRender
      };
    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}