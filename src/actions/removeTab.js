import {REMOVE_TAB} from '../variables';

export default indexToRemove => (dispatch, getState) => {
  dispatch({
    type: REMOVE_TAB,
    payload: indexToRemove
  });
};
