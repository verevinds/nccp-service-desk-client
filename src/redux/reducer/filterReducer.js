import { FILTER_SET } from '../constants';

const initialState = {
  categories: [],
  options: [],
  properties: [],
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_SET:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};
