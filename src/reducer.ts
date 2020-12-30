/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from './utils/history';
import { homeReducer } from './containers/RockScissorPaperContainer/store/reducer';
import { modeReducer } from './containers/ModesContainer/store/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer() {
  const rootReducer = combineReducers({
    home: homeReducer,
    mode: modeReducer,
    router: connectRouter(history),
  });

  return rootReducer;
}
