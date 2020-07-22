import { RESOURCE_REQUEST_SUCCESSED, RESOURCE_UPDATE } from '../constants';

const initialState = {
  list: null,
  isUpdate: false,
};

export const resourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESOURCE_REQUEST_SUCCESSED:
      return {
        ...state,
        list: action.data,
        isUpdate: false,
      };
    case RESOURCE_UPDATE:
      return {
        ...state,
        isUpdate: true,
      };
    default:
      return state;
  }
};
