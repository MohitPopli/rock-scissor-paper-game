import { createSelector, createStructuredSelector } from 'reselect';
import { ApplicationRootState } from '../../../rootTypes';

const selectModeState = (state: ApplicationRootState) => {
  return state.mode;
};

const selectPlayerMode = () => createSelector(selectModeState, (state) => state.playerMode);

const selectBotMode = () => createSelector(selectModeState, (state) => state.botMode);

const selectBotWeaponLoading = () => createSelector(selectModeState, (state) => state.botWeaponLoading);

const selectWinner = () => createSelector(selectModeState, (state) => state.winner);

const ModesStateSelector = createStructuredSelector({
  playerMode: selectPlayerMode(),
  botMode: selectBotMode(),
  isBotWeaponLoading: selectBotWeaponLoading(),
  winner: selectWinner(),
});

export { ModesStateSelector };
