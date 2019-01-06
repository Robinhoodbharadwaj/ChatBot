import {GET_REPLY} from '../variables';

const initialObject = {
  message: [],
  loader: false
}

export default function(state = initialObject, action) {
  switch (action.type) {
    case GET_REPLY:
      return {
        message: [...state.message, action.payload.sender ? action.payload.sender : action.payload.bot],
        loader: action.payload.loader
      };
    default:
      return state;
  }
}
