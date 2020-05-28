import { POSITIONS_REQUEST_SUCCESSED, POSITIONS_UPDATE } from '../constants';

const initialState = {
  list: [],
  isUpdate: true,
};

export const positionReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSITIONS_REQUEST_SUCCESSED:
      return {
        ...state,
        list: action.data,
        isUpdate: false,
      };
    case POSITIONS_UPDATE:
      return {
        ...state,
        isUpdate: true,
      };
    default:
      return state;
  }
};
