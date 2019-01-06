import {GET_REPLY} from '../variables';
import safeEval from 'safe-eval';

const replyMessage = (dispatch, output) => dispatch({
  type: GET_REPLY,
  payload: {
    bot: {message: output, sender: 'bot'},
    loader: false
  }
});

export default message => (dispatch, getState) => {
  let tmp = null;
  try {
    tmp = safeEval(getState().activeTab.code, window);
  } catch (e) {
    tmp = e.message;
  }
  dispatch({
    type: GET_REPLY,
    payload: {
      sender: {message, sender: 'user'},
      loader: true
    }
  });

  const code = typeof tmp === 'string' ? tmp : tmp(message);

  code
    .then(output => {
      replyMessage(dispatch, output);
    })
    .catch(error => {
      replyMessage(dispatch, error.message);
    });
};
