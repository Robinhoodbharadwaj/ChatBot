import {SAVE_CODE} from '../variables';

export default currentCode => dispatch => {
  dispatch({
    type: SAVE_CODE,
    payload: currentCode
  });
};
