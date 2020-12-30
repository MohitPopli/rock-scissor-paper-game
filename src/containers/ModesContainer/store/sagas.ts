import { put, takeLatest } from 'redux-saga/effects';
import * as ModeActions from './actions';
import { ActionType } from 'typesafe-actions';
import { push } from 'connected-react-router';
import { ModeActionTypes } from './constants';

export function* navigateToHome(action: ActionType<typeof ModeActions.navigateToHome>) {
  yield put(push(`/`));
}

function* modeSagas() {
  yield takeLatest(ModeActionTypes.NAVIGATE_TO_HOME, navigateToHome);
}

// eslint-disable-next-line
export default [modeSagas];
