import { startGame } from './sagas';
import * as HomeActions from './actions';
import { put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

describe('RockScissorContainer Sagas tests', () => {
  let gen: any;

  afterEach(() => {
    expect(gen.next().done).toBeTruthy();
    jest.clearAllMocks();
  });

  test('startGame', () => {
    gen = startGame(HomeActions.startGame());
    expect(gen.next().value).toEqual(put(push('/play')));
  });
});
