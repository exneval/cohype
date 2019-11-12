import {
  customerFetch,
  customerFetchDone,
  customerFetchFail,
} from '../_actions/customers';
import {roomFetch, roomFetchDone, roomFetchFail} from '../_actions/rooms';
import {
  checkinFetch,
  checkinFetchDone,
  checkinFetchFail,
} from '../_actions/checkin';
import {
  profileFetch,
  profileFetchDone,
  profileFetchFail,
} from '../_actions/profile';
import axios from 'axios';
import {API} from '../config/api';
import {METHOD_GET, METHOD_POST, METHOD_PUT} from '../config/constants';
import strings from '../config/strings';

const handleErrorSub = (method, dispatch, message) => {
  dispatch(customerFetchFail(method, message));
  dispatch(roomFetchFail(method, message));
  dispatch(checkinFetchFail(method, message));
  dispatch(profileFetchFail(method, message));
};

const handleError = (method, dispatch, error) => {
  if (error.response) {
    const {data, status} = error.response;

    if (status > 399) {
      handleErrorSub(method, dispatch, data.message);
    }
  } else {
    if (error.code == 'ECONNABORTED') {
      handleErrorSub(method, dispatch, strings.TIMEOUT);
    } else {
      handleErrorSub(method, dispatch, error.message);
    }
  }
};

const checkin = (method, user_id, orderData, order_id) => {
  switch (method) {
    case METHOD_GET:
      return dispatch => {
        dispatch(customerFetch(method, true));
        dispatch(roomFetch(method, true));
        dispatch(checkinFetch(method, true));
        dispatch(profileFetch(method, true));
        axios
          .all([
            API.get(`/user/${user_id}/customers`),
            API.get(`/user/${user_id}/rooms`),
            API.get(`/user/${user_id}/checkin`),
            API.get(`/user/${user_id}/profile`),
          ])
          .then(res => {
            dispatch(customerFetchDone(method, res[0].data));
            dispatch(roomFetchDone(method, res[1].data));
            dispatch(checkinFetchDone(method, res[2].data));
            dispatch(profileFetchDone(method, res[3].data));
          })
          .catch(error => {
            handleError(method, dispatch, error);
          });
      };
    case METHOD_POST:
      return dispatch => {
        dispatch(checkinFetch(method, true));
        API.post(`/user/${user_id}/checkin`, {
          room_id: orderData.room_id,
          customer_id: orderData.customer_id,
          duration: parseInt(orderData.duration),
        })
          .then(res => {
            dispatch(checkinFetchDone(method, res.data));
          })
          .catch(error => {
            handleError(method, dispatch, error);
          });
      };
    case METHOD_PUT:
      return dispatch => {
        dispatch(checkinFetch(method, true));
        API.put(`/user/${user_id}/order/${order_id}`)
          .then(res => {
            dispatch(checkinFetchDone(method, res.data));
          })
          .catch(error => {
            handleError(method, dispatch, error);
          });
      };
    default:
      return method;
  }
};

export default checkin;
