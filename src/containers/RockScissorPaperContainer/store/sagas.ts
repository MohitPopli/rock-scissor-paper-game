import { put, takeLatest } from 'redux-saga/effects';
import * as HomeActions from './actions';
import { GameActionTypes } from './constants';
import { ActionType } from 'typesafe-actions';
import { push } from 'connected-react-router';

export function* startGame(action: ActionType<typeof HomeActions.startGame>) {
  yield put(push(`/play`));
}

function* homeSagas() {
  yield takeLatest(GameActionTypes.START_GAME, startGame);
}

// eslint-disable-next-line
export default [homeSagas];
