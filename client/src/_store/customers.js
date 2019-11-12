import {
  customerFetch,
  customerFetchDone,
  customerFetchFail,
} from '../_actions/customers';
import {API} from '../config/api';
import {METHOD_GET, METHOD_POST, METHOD_PUT} from '../config/constants';
import strings from '../config/strings';

const handleError = (method, dispatch, error) => {
  if (error.response) {
    const {data, status} = error.response;

    if (status > 399) {
      dispatch(customerFetchFail(method, data.message));
    }
  } else {
    if (error.code == 'ECONNABORTED') {
      dispatch(customerFetchFail(method, strings.TIMEOUT));
    } else {
      dispatch(customerFetchFail(method, error.message));
    }
  }
};

const customers = (method, user_id, customer_data, customer_id) => {
  switch (method) {
    case METHOD_GET:
      return dispatch => {
        dispatch(customerFetch(method, true));
        API.get(`/user/${user_id}/customers`)
          .then(res => {
            dispatch(customerFetchDone(method, res.data));
          })
          .catch(error => {
            handleError(method, dispatch, error);
          });
      };
    case METHOD_POST:
      return dispatch => {
        dispatch(customerFetch(method, true));
        API.post(`/user/${user_id}/customer`, {
          name: customer_data.name,
          identity_number: customer_data.identity_number,
          phone_number: customer_data.phone_number,
          image: customer_data.image,
        })
          .then(res => {
            dispatch(customerFetchDone(method, res.data));
          })
          .catch(error => {
            handleError(method, dispatch, error);
          });
      };
    case METHOD_PUT:
      return dispatch => {
        dispatch(customerFetch(method, true));
        API.put(`/user/${user_id}/customer/${customer_id}`, {
          name: customer_data.name,
          identity_number: customer_data.identity_number,
          phone_number: customer_data.phone_number,
          image: customer_data.image,
        })
          .then(res => {
            dispatch(customerFetchDone(method, res.data));
          })
          .catch(error => {
            handleError(method, dispatch, error);
          });
      };
    default:
      return method;
  }
};

export default customers;
