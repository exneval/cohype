import {
  GET_ROOMS_PENDING,
  GET_ROOMS_FULFILLED,
  GET_ROOMS_REJECTED,
  POST_ROOM_PENDING,
  POST_ROOM_FULFILLED,
  POST_ROOM_REJECTED,
  PUT_ROOM_PENDING,
  PUT_ROOM_FULFILLED,
  PUT_ROOM_REJECTED,
  RESET_ROOMS,
} from '../config/constants';

const initialState = {
  data: [],
  error: null,
  isLoading: true,
  isPost: false,
};

const rooms = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROOMS_PENDING:
    case POST_ROOM_PENDING:
    case PUT_ROOM_PENDING:
      return {
        ...state,
        error: null,
        isLoading: action.payload,
        isPost: action.isPost,
      };
    case GET_ROOMS_FULFILLED:
    case POST_ROOM_FULFILLED:
    case PUT_ROOM_FULFILLED:
      return {
        ...state,
        data: action.payload,
        isLoading: action.isLoading,
        isPost: action.isPost,
      };
    case GET_ROOMS_REJECTED:
    case POST_ROOM_REJECTED:
    case PUT_ROOM_REJECTED:
      return {
        ...state,
        error: action.payload,
        isLoading: action.isLoading,
        isPost: action.isPost,
      };
    case RESET_ROOMS:
      return initialState;
    default:
      return state;
  }
};

export default rooms;
