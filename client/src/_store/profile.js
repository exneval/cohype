import {
  profileFetch,
  profileFetchDone,
  profileFetchFail,
} from '../_actions/profile';
import {API} from '../config/api';
import {METHOD_GET, METHOD_PUT} from '../config/constants';
import strings from '../config/strings';

const handleError = (method, dispatch, error) => {
  if (error.response) {
    const {data, status} = error.response;

    if (status > 399) {
      dispatch(profileFetchFail(method, data.message));
    }
  } else {
    if (error.code == 'ECONNABORTED') {
      dispatch(profileFetchFail(method, strings.TIMEOUT));
    } else {
      dispatch(profileFetchFail(method, error.message));
    }
  }
};

const profiles = (method, user_id, user_data) => {
  switch (method) {
    case METHOD_GET:
      return dispatch => {
        dispatch(profileFetch(method, true));
        API.get(`/user/${user_id}/profile`)
          .then(res => {
            dispatch(profileFetchDone(method, res.data));
          })
          .catch(error => {
            handleError(method, dispatch, error);
          });
      };
    case METHOD_PUT:
      return dispatch => {
        dispatch(profileFetch(method, true));
        API.put(`/user/${user_id}/profile`, user_data)
          .then(res => {
            dispatch(profileFetchDone(method, res.data));
          })
          .catch(error => {
            handleError(method, dispatch, error);
          });
      };
    default:
      return method;
  }
};

export default profiles;
