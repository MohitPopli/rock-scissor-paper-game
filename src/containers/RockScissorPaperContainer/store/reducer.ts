import { ActionType } from 'typesafe-actions';
import produce, { Draft } from 'immer';
import * as homeActions from './actions';
import { HomeState } from './types';
import { GameActionTypes, Modes } from './constants';

export type HomeActions = ActionType<typeof homeActions>;

export const initialState: HomeState = {
  mode: Modes.MODE_1,
};

export const homeReducer = (state: HomeState = initialState, action: HomeActions): HomeState => {
  switch (action.type) {
    case GameActionTypes.SET_GAME_MODE:
      return produce(state, (draft: Draft<HomeState>) => {
        draft.mode = action.payload;
      });

    default:
      return state;
  }
};
