import React from 'react';
import { Weapons } from '../../containers/GlobalConstants';
import { WeaponsListContainer } from '../StyledComponents/WeaponsList';
import { Weapon } from '../Weapon';

interface WeaponsListProps {
  id: string;
  weapons: string[];
  onWeaponSelect(weapon: Weapons): void;
}

export const WeaponsList: React.FC<WeaponsListProps> = ({ id, weapons, onWeaponSelect }) => {
  return (
    <WeaponsListContainer id={id}>
      <label>CHOOSE A WEAPON</label>
      <ul>
        {weapons.map((weapon) => (
          <li key={weapon}>
            <Weapon
              icon={weapon.toUpperCase()}
              id="weapon-container"
              onWeaponClick={(weapon: Weapons) => onWeaponSelect(weapon)}
            />
          </li>
        ))}
      </ul>
    </WeaponsListContainer>
  );
};
