import {
  METHOD_GET,
  METHOD_PUT,
  GET_PROFILE_PENDING,
  GET_PROFILE_FULFILLED,
  GET_PROFILE_REJECTED,
  PUT_PROFILE_PENDING,
  PUT_PROFILE_FULFILLED,
  PUT_PROFILE_REJECTED,
  RESET_PROFILE,
} from '../config/constants';

export const profileFetch = (method, bool) => {
  let actionType;

  switch (method) {
    case METHOD_GET:
      actionType = GET_PROFILE_PENDING;
      break;
    case METHOD_PUT:
      actionType = PUT_PROFILE_PENDING;
      break;
  }
  return {
    type: actionType,
    payload: bool,
    isPost: actionType == PUT_PROFILE_PENDING ? true : false,
  };
};

export const profileFetchDone = (method, data) => {
  let actionType;

  switch (method) {
    case METHOD_GET:
      actionType = GET_PROFILE_FULFILLED;
      break;
    case METHOD_PUT:
      actionType = PUT_PROFILE_FULFILLED;
      break;
  }
  return {
    type: actionType,
    payload: data,
    isLoading: false,
    isPost: false,
  };
};

export const profileFetchFail = (method, error) => {
  let actionType;

  switch (method) {
    case METHOD_GET:
      actionType = GET_PROFILE_REJECTED;
      break;
    case METHOD_PUT:
      actionType = PUT_PROFILE_REJECTED;
      break;
  }
  return {
    type: actionType,
    payload: error,
    isLoading: false,
    isPost: false,
  };
};

export const profileReset = () => {
  return {
    type: RESET_PROFILE,
  };
};
