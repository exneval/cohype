import {roomReset} from '../_actions/rooms';
import {customerReset} from '../_actions/customers';
import {checkinReset} from '../_actions/checkin';
import {profileReset} from '../_actions/profile';

const reset = () => {
  return dispatch => {
    dispatch(roomReset());
    dispatch(customerReset());
    dispatch(checkinReset());
    dispatch(profileReset());
  };
};

export default reset;
