import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BotMode } from '../../components/BotMode';
import { PlayerMode } from '../../components/PlayerMode';
import { Modes } from '../RockScissorPaperContainer/store/constants';
import { homeStateSelector } from '../RockScissorPaperContainer/store/selectors';
import * as ModesActions from './store/actions';
import { ModesStateSelector } from './store/selectors';
import { weaponOptions } from './store/types';

export const ModesContainer: React.FC<any> = () => {
  const dispatch = useDispatch();

  const { gameMode } = useSelector(homeStateSelector);

  const { playerMode, isBotWeaponLoading, winner, botMode } = useSelector(ModesStateSelector);

  const weapons = React.useMemo(() => {
    const weaponsList: weaponOptions = {
      rock: {
        wins: ['scissor'],
      },
      paper: {
        wins: ['rock'],
      },
      scissor: {
        wins: ['paper'],
      },
    };
    return weaponsList;
  }, []);

  const getWinnerInPlayerMode = React.useCallback(() => {
    if (playerMode.playerWeapon === playerMode.botWeapon) dispatch(ModesActions.setWinner('tied'));
    else {
      const playerWeapon = playerMode.playerWeapon;
      if (weapons[playerWeapon.toLowerCase()].wins.some((win: string) => win === playerMode.botWeapon.toLowerCase())) {
        dispatch(ModesActions.setWinner('You'));
      } else {
        dispatch(ModesActions.setWinner('Bot'));
      }
    }
  }, [playerMode, dispatch, weapons]);

  const getWinnerInBotMode = React.useCallback(() => {
    if (botMode.bot1 === botMode.bot2) dispatch(ModesActions.setWinner('tied'));
    else {
      if (weapons[botMode.bot1.toLowerCase()].wins.some((win: string) => win === botMode.bot2.toLowerCase())) {
        dispatch(ModesActions.setWinner('Bot 1'));
      } else {
        dispatch(ModesActions.setWinner('Bot 2'));
      }
    }
  }, [botMode, dispatch, weapons]);

  useEffect(() => {
    if (playerMode.botWeapon.length > 0) {
      getWinnerInPlayerMode();
    }
    if (botMode.bot1.length > 0 && botMode.bot2.length > 0) {
      getWinnerInBotMode();
    }
  }, [playerMode, dispatch, getWinnerInPlayerMode, botMode, getWinnerInBotMode]);

  const weaponKeys = Object.keys(weapons);

  const getRandomWeapon = () => {
    return weaponKeys[(weaponKeys.length * Math.random()) << 0];
  };

  const startPlayingInPlayerMode = () => {
    dispatch(ModesActions.setBotWeaponLoading(true));

    setTimeout(() => {
      const botWeapon = getRandomWeapon();
      dispatch(ModesActions.setBotWeaponLoading(false));
      dispatch(ModesActions.setBotWeapon(botWeapon.toUpperCase()));
    }, 2000);
  };

  const startPlayingBotMode = () => {
    dispatch(ModesActions.setBotWeaponLoading(true));

    setTimeout(() => {
      const bot1Weapon = getRandomWeapon();
      const bot2Weapon = getRandomWeapon();
      dispatch(ModesActions.setBotWeaponLoading(false));
      dispatch(ModesActions.setBotsWeaponInBotMode(bot1Weapon.toUpperCase(), bot2Weapon.toUpperCase()));
    }, 2000);
  };

  return (
    <>
      {gameMode !== undefined && gameMode === Modes.MODE_1 && (
        <PlayerMode
          weaponsList={weaponKeys}
          id="player-vs-bot-mode"
          playerWeapon={playerMode?.playerWeapon}
          botWeapon={playerMode?.botWeapon}
          isBotWeaponLoading={isBotWeaponLoading}
          winner={winner}
          startPlaying={() => startPlayingInPlayerMode()}
          navigateToHome={() => {
            dispatch(ModesActions.resetState());
            dispatch(ModesActions.navigateToHome());
          }}
          onWeaponSelect={(weapon) => dispatch(ModesActions.setPlayerWeapon(weapon))}
        />
      )}

      {gameMode !== undefined && gameMode === Modes.MODE_2 && (
        <BotMode
          id="bot-mode"
          bot1Weapon={botMode.bot1}
          bot2Weapon={botMode.bot2}
          winner={winner}
          isBotWeaponLoading={isBotWeaponLoading}
          navigateToHome={() => {
            dispatch(ModesActions.resetState());
            dispatch(ModesActions.navigateToHome());
          }}
          startPlaying={() => startPlayingBotMode()}
        />
      )}
    </>
  );
};
