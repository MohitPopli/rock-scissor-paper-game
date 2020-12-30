import homeSagas from './containers/RockScissorPaperContainer/store/sagas';
import modeSagas from './containers/ModesContainer/store/sagas';

// eslint-disable-next-line
export default [...homeSagas, ...modeSagas];
