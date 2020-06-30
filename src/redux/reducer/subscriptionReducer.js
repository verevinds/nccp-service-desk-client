import { SUBSCRIPTION_REQUEST_SUCCESSED } from '../constants';

const initialState = {
  isLoading: false,
  list: undefined,
  isUpdate: false,
};

export const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIPTION_REQUEST_SUCCESSED:
      return {
        ...state,
        list: action.data,
        isLoading: true,
      };
    default:
      return state;
  }
};
