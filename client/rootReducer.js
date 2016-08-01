import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';

export default combineReducers({
  flashMessages,
  auth
});
