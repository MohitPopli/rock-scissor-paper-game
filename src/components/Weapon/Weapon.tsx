import React from 'react';
import { Weapons } from '../../containers/GlobalConstants';
import { Spinner } from '../Spinner';
import { WeaponIcon, WeaponsContainer } from '../StyledComponents/Weapon';
import rock from '../../assets/rock.svg';
import scissor from '../../assets/scissor.svg';
import paper from '../../assets/paper.svg';
import unknown from '../../assets/unknown.svg';

interface WeaponProps {
  id: string;
  icon: string;
  isLoading?: boolean;
  spinnerTopPos?: number;
  onWeaponClick?(weapon: Weapons): void;
}

export const Weapon: React.FC<WeaponProps> = ({ id, isLoading, icon, spinnerTopPos, onWeaponClick }) => {
  const weaponHandler = (ev: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = ev.target as HTMLElement;
    if (onWeaponClick !== undefined) {
      switch (target.id.toUpperCase()) {
        case Weapons.ROCK:
          onWeaponClick(Weapons.ROCK);
          break;
        case Weapons.SCISSOR:
          onWeaponClick(Weapons.SCISSOR);
          break;
        case Weapons.PAPER:
          onWeaponClick(Weapons.PAPER);
          break;
      }
    }
  };

  const renderWeapon = (icon: string) => {
    if (icon === Weapons.ROCK) {
      return (
        <WeaponIcon
          id="rock"
          src={rock}
          cursorType={onWeaponClick ? 'pointer' : 'default'}
          alt="rock"
          onClick={(event) => weaponHandler(event)}
        />
      );
    }
    if (icon === Weapons.SCISSOR) {
      return (
        <WeaponIcon
          id="scissor"
          src={scissor}
          cursorType={onWeaponClick ? 'pointer' : 'default'}
          alt="scissor"
          onClick={(event) => weaponHandler(event)}
        />
      );
    }
    if (icon === Weapons.PAPER) {
      return (
        <WeaponIcon
          id="paper"
          src={paper}
          cursorType={onWeaponClick ? 'pointer' : 'default'}
          alt="paper"
          onClick={(event) => weaponHandler(event)}
        />
      );
    } else {
      return (
        <>
          <WeaponIcon id="unknown" src={unknown} cursorType="default" alt="unkown" />
        </>
      );
    }
  };
  return (
    <WeaponsContainer id={id} className={!isLoading && icon ? undefined : 'empty'}>
      {renderWeapon(icon)}
      {isLoading && <Spinner id="spinner" top={spinnerTopPos} />}
    </WeaponsContainer>
  );
};
