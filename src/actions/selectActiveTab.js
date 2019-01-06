import {ACTIVE_TAB} from '../variables';

export default currentTab => (dispatch, getState) => {
  dispatch({
    type: ACTIVE_TAB,
    payload: getState().tabs.find(tab => tab.id === currentTab)
  });
};
