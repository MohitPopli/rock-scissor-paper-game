import { Weapons } from '../../GlobalConstants';
import { Modes } from '../../RockScissorPaperContainer/store/constants';
import {
  resetState,
  setBotsWeaponInBotMode,
  setBotWeapon,
  setBotWeaponLoading,
  setPlayerWeapon,
  setWinner,
} from './actions';
import { initialState, modeReducer } from './reducer';

describe('ModeContainer reducer tests', () => {
  const rootState = initialState;
  test('should return the initial state', () => {
    const mockAction: any = {
      type: 'none',
      payload: '',
    };
    expect(modeReducer(rootState, mockAction)).toEqual(rootState);
  });

  test('SET_PLAYER_WEAPON', () => {
    const existingState = {
      ...rootState,
      winner: 'You',
      playerMode: {
        botWeapon: 'ROCK',
        playerWeapon: 'PAPER',
      },
    };

    expect(modeReducer(existingState, setPlayerWeapon(Weapons.ROCK))).toEqual({
      ...rootState,
      winner: '',
      playerMode: {
        botWeapon: '',
        playerWeapon: 'ROCK',
      },
    });
  });

  test('SET_BOT_WEAPON_LOADING', () => {
    expect(modeReducer(rootState, setBotWeaponLoading(true))).toEqual({
      ...rootState,
      botWeaponLoading: true,
    });
  });

  test('SET_BOT_WEAPON', () => {
    const existingState = {
      ...rootState,
      playerMode: {
        botWeapon: '',
        playerWeapon: 'PAPER',
      },
    };

    expect(modeReducer(existingState, setBotWeapon(Weapons.SCISSOR))).toEqual({
      ...existingState,
      playerMode: {
        botWeapon: 'SCISSOR',
        playerWeapon: 'PAPER',
      },
    });
  });

  test('SET_WINNER', () => {
    const existingState = {
      ...rootState,
      playerMode: {
        botWeapon: 'SCISSOR',
        playerWeapon: 'PAPER',
      },
    };

    expect(modeReducer(existingState, setWinner('Bot'))).toEqual({
      ...existingState,
      playerMode: {
        botWeapon: 'SCISSOR',
        playerWeapon: 'PAPER',
      },
      winner: 'Bot',
    });
  });

  test('RESET_STATE', () => {
    const existingState = {
      ...rootState,
      playerMode: {
        botWeapon: 'SCISSOR',
        playerWeapon: 'PAPER',
      },
      winner: 'Bot',
    };

    expect(modeReducer(existingState, resetState())).toEqual({
      ...rootState,
    });
  });

  test('SET_BOTS_WEAPON_IN_BOT_MODE', () => {
    const existingState = {
      ...rootState,
      mode: Modes.MODE_2,
    };

    expect(modeReducer(existingState, setBotsWeaponInBotMode(Weapons.SCISSOR, Weapons.PAPER))).toEqual({
      ...existingState,
      botMode: {
        bot1: Weapons.SCISSOR,
        bot2: Weapons.PAPER,
      },
    });
  });
});
