import { ModesState } from './containers/ModesContainer/store/types';
import { HomeState } from './containers/RockScissorPaperContainer/store/types';

export interface ApplicationRootState {
  readonly home: HomeState;
  readonly mode: ModesState;
}
