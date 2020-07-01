import {
  SUBSCRIPTION_REQUEST_SUCCESSED,
  SUBSCRIPTION_UPDATE,
} from '../constants';

const initialState = {
  isLoading: false,
  isUpdate: false,
  list: undefined,
};

export const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIPTION_REQUEST_SUCCESSED:
      return {
        ...state,
        list: action.data,
        isLoading: true,
        isUpdate: false,
      };
    case SUBSCRIPTION_UPDATE:
      return {
        ...state,
        isUpdate: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
