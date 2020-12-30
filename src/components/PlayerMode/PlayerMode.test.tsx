import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { PlayerMode } from '.';
import { Weapons } from '../../containers/GlobalConstants';

describe('PlayerMode tests', () => {
  const onWeaponSelect = jest.fn();
  const startPlaying = jest.fn();
  const navigateToHome = jest.fn();

  const wrapper = (winner: string, isBotWeaponLoading = false) =>
    render(
      <PlayerMode
        id="player-mode"
        weaponsList={['ROCK', 'PAPER', 'SCISSOR']}
        winner={winner}
        isBotWeaponLoading={isBotWeaponLoading}
        onWeaponSelect={onWeaponSelect}
        startPlaying={startPlaying}
        navigateToHome={navigateToHome}
        playerWeapon={Weapons.ROCK}
        botWeapon={Weapons.SCISSOR}
      />,
    );

  test('should render component', () => {
    const component = wrapper('');
    expect(component.container.querySelector('#weapons-list')).not.toBeNull();
    expect(component.container.querySelector('#player-label')?.textContent).toEqual('PLAYER');
    expect(component.container.querySelector('#bot-label')?.textContent).toEqual('BOT');
    expect(component.container.querySelector('#play-button')?.textContent).toEqual('Play');
    expect(component.container.querySelector('#back-button')?.textContent).toEqual('Back');
  });

  test('should render winner', () => {
    const component = wrapper('You');

    expect(component.container.querySelector('#winner-label')?.textContent).toEqual('You won!!');
    expect(component.container.querySelector('#play-button')?.textContent).toEqual('Play Again');
  });

  test('should render tied label', () => {
    const component = wrapper('tied');

    expect(component.container.querySelector('#winner-label')?.textContent).toEqual('OOPS!! It is a tie');
    expect(component.container.querySelector('#play-button')?.textContent).toEqual('Play Again');
  });

  test('should disable buttons while playing', () => {
    const component = wrapper('', true);

    expect(component.container.querySelector('#play-button')?.getAttribute('disabled')).toStrictEqual('');
    expect(component.container.querySelector('#back-button')?.getAttribute('disabled')).toStrictEqual('');
  });

  test('should invoke startPlaying', () => {
    const component = wrapper('');

    const startButton = component.container.querySelector('#play-button') as HTMLButtonElement;

    fireEvent.click(startButton);

    expect(startPlaying).toHaveBeenCalledTimes(1);
  });

  test('should not invoke startPlaying when weapon is loading', () => {
    const component = wrapper('', true);

    const startButton = component.container.querySelector('#play-button') as HTMLButtonElement;

    fireEvent.click(startButton);

    expect(startPlaying).toHaveBeenCalledTimes(0);
  });

  test('should invoke navigateToHome', () => {
    const component = wrapper('');

    const backButton = component.container.querySelector('#back-button') as HTMLButtonElement;

    fireEvent.click(backButton);

    expect(navigateToHome).toHaveBeenCalledTimes(1);
  });

  test('should not invoke navigateToHome when weapon is loading', () => {
    const component = wrapper('', true);

    const backButton = component.container.querySelector('#back-button') as HTMLButtonElement;

    fireEvent.click(backButton);

    expect(navigateToHome).toHaveBeenCalledTimes(0);
  });

  test('should invoke onWeaponSelect', () => {
    const component = wrapper('');

    const rockButton = component.container.querySelector('#rock') as HTMLImageElement;

    fireEvent.click(rockButton, { target: { id: 'rock' } });

    expect(onWeaponSelect).toHaveBeenCalledTimes(1);
  });
});
