import { SETTINS_REQUEST_SENDD } from '../constants';

const initialState = {};
export const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETTINS_REQUEST_SENDD:
      let list = {};
      action.data.forEach((item) => {
        list = { ...list, [`${item.name}`]: item.isOn };
      });
      return {
        ...state,
        ...list,
      };
    default:
      return state;
  }
};
