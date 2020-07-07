import { RESPONSIBLES_REQUEST_SUCCESSED, RESPONSIBLES_UPDATE } from '../constants';

const initialState = {
  isLoading: false,
  isUpdate: false,
  list: undefined,
};

export const responsibleReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESPONSIBLES_REQUEST_SUCCESSED:
      return {
        ...state,
        list: action.data,
        isLoading: true,
        isUpdate: false,
      };
    case RESPONSIBLES_UPDATE:
      return {
        ...state,
        isUpdate: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
