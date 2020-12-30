import React from 'react';
import {
  PlayerDataContainer,
  PlayerModeContainer,
  BotDataContainer,
  NameLabel,
  StartGameButton,
  BackButton,
} from '../StyledComponents/PlayerMode';
import { Weapon } from '../Weapon';

interface BotModeProps {
  id: string;
  bot1Weapon: string;
  bot2Weapon: string;
  isBotWeaponLoading: boolean;
  winner: string;
  startPlaying(): void;
  navigateToHome(): void;
}

export const BotMode: React.FC<BotModeProps> = ({
  id,
  bot1Weapon,
  bot2Weapon,
  winner,
  isBotWeaponLoading,
  startPlaying,
  navigateToHome,
}) => {
  const renderBot1Weapon = React.useCallback(() => {
    return (
      <PlayerDataContainer>
        <NameLabel id="bot1-label">BOT 1</NameLabel>
        <Weapon id="bot1-weapon" icon={bot1Weapon} isLoading={isBotWeaponLoading} spinnerTopPos={12} />
      </PlayerDataContainer>
    );
  }, [bot1Weapon, isBotWeaponLoading]);

  const renderBot2Weapon = React.useCallback(() => {
    return (
      <BotDataContainer>
        <NameLabel id="bot2-label">BOT 2</NameLabel>
        <Weapon id="bot2-weapon" icon={bot2Weapon} isLoading={isBotWeaponLoading} spinnerTopPos={33} />
      </BotDataContainer>
    );
  }, [isBotWeaponLoading, bot2Weapon]);

  return (
    <PlayerModeContainer id={id}>
      {renderBot1Weapon()}
      {renderBot2Weapon()}

      {winner.length > 0 && (
        <NameLabel id="winner-label" style={{ paddingTop: '4rem' }}>
          {winner === 'tied' ? 'OOPS!! It is a tie' : `${winner} won!!`}
        </NameLabel>
      )}

      <footer>
        <BackButton id="back-button" name="back-button" onClick={() => navigateToHome()} disabled={isBotWeaponLoading}>
          Back
        </BackButton>

        <StartGameButton
          id="play-button"
          name="play-button"
          onClick={() => startPlaying()}
          style={{ cursor: isBotWeaponLoading ? 'not-allowed' : 'pointer' }}
          disabled={isBotWeaponLoading}
        >
          {winner.length === 0 ? 'Play' : 'Play Again'}
        </StartGameButton>
      </footer>
    </PlayerModeContainer>
  );
};
