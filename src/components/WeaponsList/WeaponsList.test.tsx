import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { WeaponsList } from '.';
import rock from '../../assets/rock.svg';
import scissor from '../../assets/scissor.svg';
import paper from '../../assets/paper.svg';
import { Weapons } from '../../containers/GlobalConstants';

describe('WeaponsList tests', () => {
  const onWeaponSelect = jest.fn();

  const wrapper = () =>
    render(<WeaponsList id="weapons-list" weapons={['ROCK', 'PAPER', 'SCISSOR']} onWeaponSelect={onWeaponSelect} />);

  beforeEach(() => jest.clearAllMocks());

  test('should render weapons list', () => {
    const component = wrapper();

    expect(component.container.querySelector('#rock')?.getAttribute('src')).toEqual(rock);
    expect(component.container.querySelector('#scissor')?.getAttribute('src')).toEqual(scissor);
    expect(component.container.querySelector('#paper')?.getAttribute('src')).toEqual(paper);
  });

  test('should invoke onWeaponSelect', () => {
    const component = wrapper();

    const rockButton = component.container.querySelector('#rock') as HTMLButtonElement;

    fireEvent.click(rockButton, { target: { id: 'rock' } });

    expect(onWeaponSelect).toHaveBeenCalledTimes(1);
    expect(onWeaponSelect).toHaveBeenCalledWith(Weapons.ROCK);
  });
});
