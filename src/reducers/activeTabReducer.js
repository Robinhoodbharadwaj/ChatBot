import {ACTIVE_TAB, DEFAULT, SAVE_CODE} from '../variables';
const NEW_TAB_ACTIVE = 'NEW_TAB_ACTIVE';

export default function(state = DEFAULT, action) {
  switch (action.type) {
    case NEW_TAB_ACTIVE:
      return action.payload;
    case ACTIVE_TAB:
      return action.payload ? action.payload : state;
    case SAVE_CODE:
      return Object.assign({}, state, {code: action.payload});
    default:
      return state;
  }
}
