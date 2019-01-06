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
  let code = null;
  try {
    code = safeEval(getState().activeTab.code, window);
  } catch (e) {
    code = e.message;
  }
  dispatch({
    type: GET_REPLY,
    payload: {
      sender: {message, sender: 'user'},
      loader: true
    }
  });

  if (typeof code === 'string') {
    replyMessage(dispatch, code);
  } else {
    code(message)
      .then(output => {
        replyMessage(dispatch, output);
      })
      .catch(error => {
        replyMessage(dispatch, error.message);
      });
  }
};
