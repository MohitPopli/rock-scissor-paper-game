import React from 'react';
import { Weapons } from '../../containers/GlobalConstants';
import {
  PlayerDataContainer,
  PlayerModeContainer,
  BotDataContainer,
  NameLabel,
  StartGameButton,
  BackButton,
} from '../StyledComponents/PlayerMode';
import { Weapon } from '../Weapon';
import { WeaponsList } from '../WeaponsList';

interface PlayerModeProps {
  id: string;
  weaponsList: string[];
  playerWeapon: string;
  botWeapon: string;
  isBotWeaponLoading: boolean;
  winner: string;
  onWeaponSelect(weapon: Weapons): void;
  startPlaying(): void;
  navigateToHome(): void;
}

export const PlayerMode: React.FC<PlayerModeProps> = ({
  id,
  weaponsList,
  playerWeapon,
  botWeapon,
  winner,
  isBotWeaponLoading,
  onWeaponSelect,
  startPlaying,
  navigateToHome,
}) => {
  const renderPlayerWeapon = React.useCallback(() => {
    return (
      <PlayerDataContainer>
        <NameLabel id="player-label">PLAYER</NameLabel>
        <Weapon id="player-weapon" icon={playerWeapon} spinnerTopPos={56} />
      </PlayerDataContainer>
    );
  }, [playerWeapon]);

  const renderBotWeapon = React.useCallback(() => {
    return (
      <BotDataContainer>
        <NameLabel id="bot-label">BOT</NameLabel>
        <Weapon id="bot-weapon" icon={botWeapon} isLoading={isBotWeaponLoading} spinnerTopPos={56} />
      </BotDataContainer>
    );
  }, [isBotWeaponLoading, botWeapon]);

  return (
    <PlayerModeContainer>
      <div style={{ pointerEvents: isBotWeaponLoading ? 'none' : 'inherit', width: '100%' }}>
        <WeaponsList
          id="weapons-list"
          onWeaponSelect={(weapon: Weapons) => onWeaponSelect(weapon)}
          weapons={weaponsList}
        />
      </div>

      {renderPlayerWeapon()}
      {renderBotWeapon()}

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
          style={{ cursor: playerWeapon.length === 0 ? 'not-allowed' : 'pointer' }}
          disabled={playerWeapon.length === 0 || isBotWeaponLoading}
        >
          {winner.length === 0 ? 'Play' : 'Play Again'}
        </StartGameButton>
      </footer>
    </PlayerModeContainer>
  );
};
