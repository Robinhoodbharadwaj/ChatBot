import {NEW_TAB, DEFAULT, REMOVE_TAB} from '../variables';

export default function(state = [DEFAULT], action) {
  switch (action.type) {
    case NEW_TAB:
      return [...state, action.payload];
    case REMOVE_TAB:
      state.splice(action.payload, 1);
      return [...state];
    default:
      return state;
  }
}
