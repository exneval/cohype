import {
  GET_CUSTOMERS_PENDING,
  GET_CUSTOMERS_FULFILLED,
  GET_CUSTOMERS_REJECTED,
  POST_CUSTOMERS_PENDING,
  POST_CUSTOMERS_FULFILLED,
  POST_CUSTOMERS_REJECTED,
  PUT_CUSTOMERS_PENDING,
  PUT_CUSTOMERS_FULFILLED,
  PUT_CUSTOMERS_REJECTED,
  RESET_CUSTOMERS,
} from '../config/constants';

const initialState = {
  data: [],
  error: null,
  isLoading: true,
  isPost: false,
};

const customers = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS_PENDING:
    case POST_CUSTOMERS_PENDING:
    case PUT_CUSTOMERS_PENDING:
      return {
        ...state,
        error: null,
        isLoading: action.payload,
        isPost: action.isPost,
      };
    case GET_CUSTOMERS_FULFILLED:
    case POST_CUSTOMERS_FULFILLED:
    case PUT_CUSTOMERS_FULFILLED:
      return {
        ...state,
        data: action.payload,
        isLoading: action.isLoading,
        isPost: action.isPost,
      };
    case GET_CUSTOMERS_REJECTED:
    case POST_CUSTOMERS_REJECTED:
    case PUT_CUSTOMERS_REJECTED:
      return {
        ...state,
        error: action.payload,
        isLoading: action.isLoading,
        isPost: action.isPost,
      };
    case RESET_CUSTOMERS:
      return initialState;
    default:
      return state;
  }
};

export default customers;
