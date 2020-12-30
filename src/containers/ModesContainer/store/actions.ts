import { action } from 'typesafe-actions';
import { Weapons } from '../../GlobalConstants';
import { ModeActionTypes } from './constants';

export const setPlayerWeapon = (weapon: Weapons) => action(ModeActionTypes.SET_PLAYER_WEAPON, weapon);

export const navigateToHome = () => action(ModeActionTypes.NAVIGATE_TO_HOME);

export const setBotWeaponLoading = (loading: boolean) => action(ModeActionTypes.SET_BOT_WEAPON_LOADING, loading);

export const setBotWeapon = (weapon: string) => action(ModeActionTypes.SET_BOT_WEAPON, weapon);

export const setWinner = (winner: string) => action(ModeActionTypes.SET_WINNER, winner);

export const resetState = () => action(ModeActionTypes.RESET_STATE);

export const setBotsWeaponInBotMode = (bot1Weapon: string, bot2Weapon: string) =>
  action(ModeActionTypes.SET_BOTS_WEAPON_IN_BOT_MODE, { bot1Weapon, bot2Weapon });
