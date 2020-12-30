import { setGameMode } from './actions';
import { Modes } from './constants';
import { homeReducer, initialState } from './reducer';

describe('RockScissorPaper container Reducer tests', () => {
  const rootState = initialState;
  test('should return the initial state', () => {
    const mockAction: any = {
      type: 'none',
      payload: '',
    };
    expect(homeReducer(rootState, mockAction)).toEqual(rootState);
  });

  test('SET_GAME_MODE', () => {
    expect(homeReducer(rootState, setGameMode(Modes.MODE_1))).toEqual({
      ...rootState,
      mode: Modes.MODE_1,
    });
  });
});
