import { action } from 'typesafe-actions';
import { Modes, GameActionTypes } from './constants';

export const setGameMode = (mode: Modes) => action(GameActionTypes.SET_GAME_MODE, mode);

export const startGame = () => action(GameActionTypes.START_GAME);
