import { navigateToHome } from './sagas';
import * as ModeActions from './actions';
import { put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

describe('ModesContainer Sagas tests', () => {
  let gen: any;

  afterEach(() => {
    expect(gen.next().done).toBeTruthy();
    jest.clearAllMocks();
  });

  test('navigateToHome', () => {
    gen = navigateToHome(ModeActions.navigateToHome());
    expect(gen.next().value).toEqual(put(push('/')));
  });
});
