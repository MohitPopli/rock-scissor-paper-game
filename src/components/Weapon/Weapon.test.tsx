import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Weapon } from '.';
import { Weapons } from '../../containers/GlobalConstants';
import rock from '../../assets/rock.svg';
import unknown from '../../assets/unknown.svg';

describe('Weapon tests', () => {
  const onWeaponClick = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  const wrapper = (icon: string, isLoading?: boolean, onWeaponClick?: () => void) =>
    render(<Weapon id="weapon" icon={icon} isLoading={isLoading} onWeaponClick={onWeaponClick} spinnerTopPos={50} />);

  test('should render component', () => {
    const component = wrapper(Weapons.ROCK);

    expect(component.container.querySelector('#rock').getAttribute('src')).toEqual(rock);
  });

  test('should render spinner', () => {
    const component = wrapper('unknown', true);

    expect(component.container.querySelector('#unknown').getAttribute('src')).toEqual(unknown);
    expect(component.container.querySelector('#spinner')).not.toBeNull();
  });

  test('should invoke onWeaponClick - ROCK', () => {
    const component = wrapper(Weapons.ROCK, false, onWeaponClick);

    const rockIcon = component.container.querySelector('#rock') as HTMLButtonElement;

    fireEvent.click(rockIcon, { target: { id: 'rock' } });

    expect(onWeaponClick).toHaveBeenCalledTimes(1);
    expect(onWeaponClick).toHaveBeenCalledWith(Weapons.ROCK);
  });

  test('should invoke onWeaponClick - PAPER', () => {
    const component = wrapper(Weapons.PAPER, false, onWeaponClick);

    const paperIcon = component.container.querySelector('#paper') as HTMLButtonElement;

    fireEvent.click(paperIcon, { target: { id: 'paper' } });

    expect(onWeaponClick).toHaveBeenCalledTimes(1);
    expect(onWeaponClick).toHaveBeenCalledWith(Weapons.PAPER);
  });

  test('should invoke onWeaponClick - SCISSOR', () => {
    const component = wrapper(Weapons.SCISSOR, false, onWeaponClick);

    const scissorIcon = component.container.querySelector('#scissor') as HTMLButtonElement;

    fireEvent.click(scissorIcon, { target: { id: 'scissor' } });

    expect(onWeaponClick).toHaveBeenCalledTimes(1);
    expect(onWeaponClick).toHaveBeenCalledWith(Weapons.SCISSOR);
  });

  test('should not invoke onWeaponClick if not provided', () => {
    const component = wrapper(Weapons.SCISSOR);

    const scissorIcon = component.container.querySelector('#scissor') as HTMLButtonElement;

    fireEvent.click(scissorIcon, { target: { id: 'scissor' } });

    expect(onWeaponClick).toHaveBeenCalledTimes(0);
  });
});
