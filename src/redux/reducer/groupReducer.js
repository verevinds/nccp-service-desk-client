import { GROUP_REQUEST_SUCCESSED, GROUP_UPDATE } from '../constants';

const initialState = {
  isLoading: false,
  isUpdate: false,
  list: [],
};

export const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case GROUP_REQUEST_SUCCESSED:
      return {
        ...state,
        list: action.data,
        isLoading: true,
        isUpdate: false,
      };
    case GROUP_UPDATE:
      return {
        ...state,
        isLoading: false,
        isUpdate: true,
      };
    default:
      return state;
  }
};
