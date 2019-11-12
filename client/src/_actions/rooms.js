import {
  METHOD_GET,
  METHOD_POST,
  METHOD_PUT,
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

export const roomFetch = (method, bool) => {
  let actionType;

  switch (method) {
    case METHOD_GET:
      actionType = GET_ROOMS_PENDING;
      break;
    case METHOD_POST:
      actionType = POST_ROOM_PENDING;
      break;
    case METHOD_PUT:
      actionType = PUT_ROOM_PENDING;
      break;
  }
  return {
    type: actionType,
    payload: bool,
    isPost:
      actionType == POST_ROOM_PENDING || actionType == PUT_ROOM_PENDING
        ? true
        : false,
  };
};

export const roomFetchDone = (method, data) => {
  let actionType;

  switch (method) {
    case METHOD_GET:
      actionType = GET_ROOMS_FULFILLED;
      break;
    case METHOD_POST:
      actionType = POST_ROOM_FULFILLED;
      break;
    case METHOD_PUT:
      actionType = PUT_ROOM_FULFILLED;
      break;
  }
  return {
    type: actionType,
    payload: data,
    isLoading: false,
    isPost: false,
  };
};

export const roomFetchFail = (method, error) => {
  let actionType;

  switch (method) {
    case METHOD_GET:
      actionType = GET_ROOMS_REJECTED;
      break;
    case METHOD_POST:
      actionType = POST_ROOM_REJECTED;
      break;
    case METHOD_PUT:
      actionType = PUT_ROOM_REJECTED;
      break;
  }
  return {
    type: actionType,
    payload: error,
    isLoading: false,
    isPost: false,
  };
};

export const roomReset = () => {
  return {
    type: RESET_ROOMS,
  };
};
