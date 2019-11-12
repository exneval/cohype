import {
  GET_PROFILE_PENDING,
  GET_PROFILE_FULFILLED,
  GET_PROFILE_REJECTED,
  PUT_PROFILE_PENDING,
  PUT_PROFILE_FULFILLED,
  PUT_PROFILE_REJECTED,
  RESET_PROFILE,
} from '../config/constants';

const initialState = {
  data: [],
  error: null,
  isLoading: true,
  isPost: false,
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_PENDING:
    case PUT_PROFILE_PENDING:
      return {
        ...state,
        error: null,
        isLoading: action.payload,
        isPost: action.isPost,
      };
    case GET_PROFILE_FULFILLED:
    case PUT_PROFILE_FULFILLED:
      return {
        ...state,
        data: action.payload,
        isLoading: action.isLoading,
        isPost: action.isPost,
      };
    case GET_PROFILE_REJECTED:
    case PUT_PROFILE_REJECTED:
      return {
        ...state,
        error: action.payload,
        isLoading: action.isLoading,
        isPost: action.isPost,
      };
    case RESET_PROFILE:
      return initialState;
    default:
      return state;
  }
};

export default settings;
