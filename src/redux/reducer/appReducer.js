import { VERSION_SET } from '../constants';

const initialState = {
  version: undefined,
};

export const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERSION_SET:
      return {
        version: action.version,
      };
    default:
      return state;
  }
};
