import { STATUS_REQUEST_SUCCESSED, STATUS_UPDATE } from '../constants';

const initialState = {
  list: [],
  isUpdate: true,
};

export const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case STATUS_REQUEST_SUCCESSED:
      return {
        ...state,
        list: action.data,
        isUpdate: false,
      };
    case STATUS_UPDATE:
      return {
        ...state,
        isUpdate: true,
      };
    default:
      return state;
  }
};
