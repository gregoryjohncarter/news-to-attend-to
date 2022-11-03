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
        currentPage: action.number
      };
    case 'NEXT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage + 1
      };
    case 'PREVIOUS_PAGE':
      return {
        ...state,
        currentPage: action.currentPage - 1
      };
    case 'DATA_STORE':
      return {
        ...state,
        newsAPIData: action.newsAPIData
      };
    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}