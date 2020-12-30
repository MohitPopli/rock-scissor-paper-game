import { ActionType } from 'typesafe-actions';
import produce, { Draft } from 'immer';
import * as modeActions from './actions';
import { ModesState, PlayerMode } from './types';
import { ModeActionTypes } from './constants';

export type ModeActions = ActionType<typeof modeActions>;

export const initialState: ModesState = {
  playerMode: {
    botWeapon: '',
    playerWeapon: '',
  },
  botMode: {
    bot1: '',
    bot2: '',
  },
  winner: '',
  botWeaponLoading: false,
};

export const modeReducer = (state: ModesState = initialState, action: ModeActions): ModesState => {
  switch (action.type) {
    case ModeActionTypes.SET_PLAYER_WEAPON:
      return produce(state, (draft: Draft<ModesState>) => {
        const updatedPlayerModeState: PlayerMode = {
          playerWeapon: action.payload,
          botWeapon: '',
        };
        draft.playerMode = updatedPlayerModeState;
        draft.winner = '';
      });

    case ModeActionTypes.SET_BOT_WEAPON_LOADING:
      return produce(state, (draft: Draft<ModesState>) => {
        draft.botWeaponLoading = action.payload;
      });

    case ModeActionTypes.SET_BOT_WEAPON:
      return produce(state, (draft: Draft<ModesState>) => {
        const exisitingState = { ...state.playerMode };
        exisitingState.botWeapon = action.payload;
        draft.playerMode = exisitingState;
      });

    case ModeActionTypes.SET_WINNER:
      return produce(state, (draft: Draft<ModesState>) => {
        draft.winner = action.payload;
      });

    case ModeActionTypes.RESET_STATE:
      return produce(state, (draft: Draft<ModesState>) => {
        draft.winner = '';
        draft.playerMode = {
          botWeapon: '',
          playerWeapon: '',
        };
        draft.botMode = {
          bot1: '',
          bot2: '',
        };
      });

    case ModeActionTypes.SET_BOTS_WEAPON_IN_BOT_MODE:
      return produce(state, (draft: Draft<ModesState>) => {
        const exisitingState = { ...state.botMode };
        exisitingState.bot1 = action.payload.bot1Weapon;
        exisitingState.bot2 = action.payload.bot2Weapon;
        draft.botMode = exisitingState;
      });

    default:
      return state;
  }
};
