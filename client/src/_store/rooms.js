import {roomFetch, roomFetchDone, roomFetchFail} from '../_actions/rooms';
import {checkinFetchDone} from '../_actions/checkin';
import {API} from '../config/api';
import {METHOD_GET, METHOD_POST, METHOD_PUT} from '../config/constants';
import strings from '../config/strings';

const handleError = (method, dispatch, error) => {
  if (error.response) {
    const {data, status} = error.response;

    if (status > 399) {
      dispatch(roomFetchFail(method, data.message));
    }
  } else {
    if (error.code == 'ECONNABORTED') {
      dispatch(roomFetchFail(method, strings.TIMEOUT));
    } else {
      dispatch(roomFetchFail(method, error.message));
    }
  }
};

const rooms = (method, user_id, name, room_id) => {
  switch (method) {
    case METHOD_GET:
      return dispatch => {
        dispatch(roomFetch(method, true));
        API.get(`/user/${user_id}/rooms`)
          .then(res => {
            dispatch(roomFetchDone(method, res.data));
          })
          .catch(error => {
            handleError(method, dispatch, error);
          });
      };
    case METHOD_POST:
      return dispatch => {
        dispatch(roomFetch(method, true));
        API.post(`/user/${user_id}/room`, {name})
          .then(res => {
            dispatch(roomFetchDone(method, res.data));
            API.get(`/user/${user_id}/checkin`).then(checkin => {
              dispatch(checkinFetchDone(METHOD_GET, checkin.data));
            });
          })
          .catch(error => {
            handleError(method, dispatch, error);
          });
      };
    case METHOD_PUT:
      return dispatch => {
        dispatch(roomFetch(method, true));
        API.put(`/user/${user_id}/room/${room_id}`, {name})
          .then(res => {
            dispatch(roomFetchDone(method, res.data));
            API.get(`/user/${user_id}/checkin`).then(checkin => {
              dispatch(checkinFetchDone(METHOD_GET, checkin.data));
            });
          })
          .catch(error => {
            handleError(method, dispatch, error);
          });
      };
    default:
      return method;
  }
};

export default rooms;
