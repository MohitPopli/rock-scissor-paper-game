import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Modes } from './store/constants';
import { RockScissorPaperContainer } from './RockScissorPaperContainer';
import * as HomeActions from './store/actions';

describe('RockScissorPaperContainer tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render home page and perform basic validations', () => {
    const mockStore = configureMockStore();

    const store = mockStore({
      home: {
        mode: Modes.MODE_1,
      },
      mode: {
        playerMode: {
          playerWeapon: '',
          botWeapon: '',
        },
        botMode: {
          bot1: '',
          bot2: '',
        },
        winner: '',
        botWeaponLoading: false,
      },
    });
    const wrapper = render(
      <Provider store={store}>
        <RockScissorPaperContainer />
      </Provider>,
    );

    expect(wrapper.container.querySelector('#main-title')?.textContent).toEqual(
      'Are you ready to play good old Rock Paper Scissor game?',
    );

    expect(wrapper.container.querySelector('#option-1')?.textContent).toEqual('PLAYER VS BOT');
    expect(wrapper.container.querySelector('#option-2')?.textContent).toEqual('BOT VS BOT');

    expect(wrapper.container.querySelector('#start-button')?.textContent).toEqual('Start');
  });

  test('should dispatch setMode action to set bot mode', () => {
    const mockStore = configureMockStore();

    const store = mockStore({
      home: {
        mode: Modes.MODE_1,
      },
      mode: {
        playerMode: {
          playerWeapon: '',
          botWeapon: '',
        },
        botMode: {
          bot1: '',
          bot2: '',
        },
        winner: '',
        botWeaponLoading: false,
      },
    });
    const wrapper = render(
      <Provider store={store}>
        <RockScissorPaperContainer />
      </Provider>,
    );

    const selectControl = wrapper.container.querySelector('#mode-select-control') as HTMLSelectElement;

    fireEvent.change(selectControl, { target: { value: Modes.MODE_2 } });

    expect(store.getActions()[1]).toEqual(HomeActions.setGameMode(Modes.MODE_2));
  });

  test('should dispatch setMode action to set mode 1', () => {
    const mockStore = configureMockStore();

    const store = mockStore({
      home: {
        mode: Modes.MODE_2,
      },
      mode: {
        playerMode: {
          playerWeapon: '',
          botWeapon: '',
        },
        botMode: {
          bot1: '',
          bot2: '',
        },
        winner: '',
        botWeaponLoading: false,
      },
    });
    const wrapper = render(
      <Provider store={store}>
        <RockScissorPaperContainer />
      </Provider>,
    );

    const selectControl = wrapper.container.querySelector('#mode-select-control') as HTMLSelectElement;

    fireEvent.change(selectControl, { target: { value: Modes.MODE_1 } });

    expect(store.getActions()[1]).toEqual(HomeActions.setGameMode(Modes.MODE_1));
  });

  test('should dispatch startGame action', () => {
    const mockStore = configureMockStore();

    const store = mockStore({
      home: {
        mode: Modes.MODE_2,
      },
      mode: {
        playerMode: {
          playerWeapon: '',
          botWeapon: '',
        },
        botMode: {
          bot1: '',
          bot2: '',
        },
        winner: '',
        botWeaponLoading: false,
      },
    });
    const wrapper = render(
      <Provider store={store}>
        <RockScissorPaperContainer />
      </Provider>,
    );

    const startButton = wrapper.container.querySelector('#start-button') as HTMLButtonElement;

    fireEvent.click(startButton);

    expect(store.getActions()[1]).toEqual(HomeActions.startGame());
  });
});
