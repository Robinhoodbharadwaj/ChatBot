import {NEW_TAB} from '../variables';
const NEW_TAB_ACTIVE = 'NEW_TAB_ACTIVE';

export default lastIndex => (dispatch, getState) => {
  const payload = {id: lastIndex + 1, title: `New Tab ${lastIndex + 1}`, code: '// type your code...'};
  dispatch({
    type: NEW_TAB_ACTIVE,
    payload
  });
  setTimeout(() => {
    dispatch({
      type: NEW_TAB,
      payload
    });
  }, 500);
};
