import { ACCESS_REQUEST_SUCCESSED, ACCESS_UPDATE } from '../constants';

const initialState = {
  isAccess: null,
  isUpdate: true,
};

export const accessReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACCESS_REQUEST_SUCCESSED:
      return {
        ...state,
        isAccess: action.data.access || undefined,
        isUpdate: false,
      };
    case ACCESS_UPDATE:
      return {
        ...state,
        isUpdate: true,
      };
    default:
      return state;
  }
};
