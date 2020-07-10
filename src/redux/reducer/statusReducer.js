import { STATUS_REQUEST_SUCCESSED, STATUS_UPDATE } from '../constants';

const initialState = {
  list: [],
  isUpdate: false,
  isLoading: false,
};

export const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATUS_REQUEST_SUCCESSED:
      return {
        ...state,
        list: action.data,
        isLoading: true,
        isUpdate: false,
      };
    case STATUS_UPDATE:
      return {
        ...state,
        isLoading: false,
        isUpdate: true,
      };
    default:
      return state;
  }
};
