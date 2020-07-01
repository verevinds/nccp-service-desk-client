import {
  SUBSCRIPTION_REQUEST_SUCCESSED,
  SUBSCRIPTION_UPDATE,
} from '../constants';
export const subscriptionUpdate = () => ({ type: SUBSCRIPTION_UPDATE });
export const subscriptionRequestSuccessed = (data) => ({
  type: SUBSCRIPTION_REQUEST_SUCCESSED,
  data,
});
