import {
  GET_CHECKIN_PENDING,
  GET_CHECKIN_FULFILLED,
  GET_CHECKIN_REJECTED,
  POST_CHECKIN_PENDING,
  POST_CHECKIN_FULFILLED,
  POST_CHECKIN_REJECTED,
  PUT_CHECKIN_PENDING,
  PUT_CHECKIN_FULFILLED,
  PUT_CHECKIN_REJECTED,
  RESET_CHECKIN,
} from '../config/constants';

const initialState = {
  data: [],
  error: null,
  isLoading: true,
  isPost: false,
};

const checkin = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHECKIN_PENDING:
    case POST_CHECKIN_PENDING:
    case PUT_CHECKIN_PENDING:
      return {
        ...state,
        error: null,
        isLoading: action.payload,
        isPost: action.isPost,
      };
    case GET_CHECKIN_FULFILLED:
    case POST_CHECKIN_FULFILLED:
    case PUT_CHECKIN_FULFILLED:
      return {
        ...state,
        data: action.payload,
        isLoading: action.isLoading,
        isPost: action.isPost,
      };
    case GET_CHECKIN_REJECTED:
    case POST_CHECKIN_REJECTED:
    case PUT_CHECKIN_REJECTED:
      return {
        ...state,
        error: action.payload,
        isLoading: action.isLoading,
        isPost: action.isPost,
      };
    case RESET_CHECKIN:
      return initialState;
    default:
      return state;
  }
};

export default checkin;
