import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { BotMode } from '.';
import { Weapons } from '../../containers/GlobalConstants';

describe('Bot Mode tests', () => {
  const startPlaying = jest.fn();
  const navigateToHome = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  const wrapper = (winner: string, isBotWeaponLoading = false) =>
    render(
      <BotMode
        id="bot-mode"
        bot1Weapon={Weapons.PAPER}
        bot2Weapon={Weapons.ROCK}
        winner={winner}
        isBotWeaponLoading={isBotWeaponLoading}
        startPlaying={startPlaying}
        navigateToHome={navigateToHome}
      />,
    );

  test('should render component', () => {
    const component = wrapper('');

    expect(component.container.querySelector('#bot1-label')?.textContent).toEqual('BOT 1');
    expect(component.container.querySelector('#bot2-label')?.textContent).toEqual('BOT 2');
    expect(component.container.querySelector('#play-button')?.textContent).toEqual('Play');
    expect(component.container.querySelector('#back-button')?.textContent).toEqual('Back');
    expect(component.container.querySelector('#play-button')?.getAttribute('disabled')).toStrictEqual(null);
  });

  test('should render winner', () => {
    const component = wrapper('BOT 1');

    expect(component.container.querySelector('#winner-label')?.textContent).toEqual('BOT 1 won!!');
    expect(component.container.querySelector('#play-button')?.textContent).toEqual('Play Again');
  });

  test('should render tied label', () => {
    const component = wrapper('tied');

    expect(component.container.querySelector('#winner-label')?.textContent).toEqual('OOPS!! It is a tie');
    expect(component.container.querySelector('#play-button')?.textContent).toEqual('Play Again');
  });

  test('should disable buttons while weapon is loading', () => {
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
});
