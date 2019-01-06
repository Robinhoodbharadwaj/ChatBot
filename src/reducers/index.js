import {combineReducers} from 'redux';
import ActiveTabReducer from './activeTabReducer';
import TabsReducer from './tabsReducer';
import MessageReducer from './getReply';

const rootReducer = combineReducers({
  activeTab: ActiveTabReducer,
  tabs: TabsReducer,
  messages: MessageReducer
});

export default rootReducer;
