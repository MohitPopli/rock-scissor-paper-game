import React from 'react';
import { useDispatch } from 'react-redux';
import * as homeActions from './store/actions';
import {
  GameContainer,
  MainTitle,
  ModesSelectionList,
  PlayButton,
} from '../../components/StyledComponents/MainContainer';
import { Modes } from './store/constants';

export const RockScissorPaperContainer: React.FC<any> = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(homeActions.setGameMode(Modes.MODE_1));
  }, [dispatch]);

  const modeChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === Modes.MODE_1) {
      dispatch(homeActions.setGameMode(Modes.MODE_1));
    } else {
      dispatch(homeActions.setGameMode(Modes.MODE_2));
    }
  };

  return (
    <GameContainer id="game-container">
      <MainTitle id="main-title">Are you ready to play good old Rock Paper Scissor game?</MainTitle>
      <fieldset>
        <legend style={{ fontSize: '1.4rem', fontStyle: 'italic' }}>Choose Mode</legend>
        <ModesSelectionList
          name="game-mode"
          id="mode-select-control"
          autoFocus
          autoComplete="off"
          onChange={(event) => modeChangeHandler(event)}
        >
          <option id="option-1" value={Modes.MODE_1}>
            PLAYER VS BOT
          </option>
          <option id="option-2" value={Modes.MODE_2}>
            BOT VS BOT
          </option>
        </ModesSelectionList>
      </fieldset>

      <PlayButton id="start-button" onClick={() => dispatch(homeActions.startGame())}>
        Start
      </PlayButton>
    </GameContainer>
  );
};
