import { createSelector, createStructuredSelector } from 'reselect';
import { ApplicationRootState } from '../../../rootTypes';

const selectHomeState = (state: ApplicationRootState) => {
  return state.home;
};

const selectGameMode = () => createSelector(selectHomeState, (state) => state.mode);

const homeStateSelector = createStructuredSelector({
  gameMode: selectGameMode(),
});

export { homeStateSelector };
