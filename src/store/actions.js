import { ADD_USER_NAME, SET_SIDEBAR_IS_OPEN } from './actionTypes';

const addUserName = (payload) => {
  return {
    type: ADD_USER_NAME,
    payload,
  };
};
const setSidebar = (payload) => {
  return {
    type: SET_SIDEBAR_IS_OPEN,
    payload,
  };
};

export { addUserName, setSidebar };
