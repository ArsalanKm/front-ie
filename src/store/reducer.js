import { ADD_USER_NAME, SET_SIDEBAR_IS_OPEN } from './actionTypes';

const initialState = {
  name: '',
  sideBarOpen: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case SET_SIDEBAR_IS_OPEN:
      return {
        ...state,
        sideBarOpen: action.payload,
      };

    default:
      return state;
  }
};

export default appReducer;
