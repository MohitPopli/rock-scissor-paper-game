import { ModesContainer } from './ModesContainer';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { act, fireEvent, render } from '@testing-library/react';
import { Modes } from '../RockScissorPaperContainer/store/constants';
import unknown from '../../assets/unknown.svg';
import * as ModeActions from './store/actions';
import { Weapons } from '../GlobalConstants';

describe('ModesContainer tests', () => {
  beforeEach(() => jest.clearAllMocks());
  describe('PlayerMode', () => {
    test('should render component in player mode and perform validations', () => {
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
          <ModesContainer />
        </Provider>,
      );

      expect(wrapper.container.querySelector('#weapons-list')).not.toBeNull();
      expect(wrapper.container.querySelector('#player-label')?.textContent).toEqual('PLAYER');
      expect(wrapper.container.querySelector('#bot-label')?.textContent).toEqual('BOT');
      expect(wrapper.container.querySelector('#unknown')?.getAttribute('src')).toEqual(unknown);
      expect(wrapper.container.querySelector('#play-button')?.textContent).toEqual('Play');
      expect(wrapper.container.querySelector('#back-button')?.textContent).toEqual('Back');
      expect(wrapper.container.querySelector('#play-button')?.getAttribute('disabled')).toStrictEqual('');
    });

    test('should dispatch action to set player weapon', () => {
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
          <ModesContainer />
        </Provider>,
      );

      const paperIcon = wrapper.container.querySelector('#paper') as HTMLImageElement;

      fireEvent.click(paperIcon, { target: { id: 'paper' } });

      expect(store.getActions()[0]).toEqual(ModeActions.setPlayerWeapon(Weapons.PAPER));
    });

    test('should dispatch action to start playing', () => {
      const mockStore = configureMockStore();

      jest.useFakeTimers();

      const store = mockStore({
        home: {
          mode: Modes.MODE_1,
        },
        mode: {
          playerMode: {
            playerWeapon: 'PAPER',
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
          <ModesContainer />
        </Provider>,
      );

      const playButton = wrapper.container.querySelector('#play-button') as HTMLButtonElement;

      fireEvent.click(playButton);

      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(store.getActions()[0]).toEqual(ModeActions.setBotWeaponLoading(true));
      expect(store.getActions()[1]).toEqual(ModeActions.setBotWeaponLoading(false));
      expect(store.getActions()[2]).toEqual(ModeActions.setBotWeapon(expect.anything()));
    });

    test('should dispatch action to set winner - player wins', () => {
      const mockStore = configureMockStore();

      const store = mockStore({
        home: {
          mode: Modes.MODE_1,
        },
        mode: {
          playerMode: {
            playerWeapon: 'PAPER',
            botWeapon: 'ROCK',
          },
          botMode: {
            bot1: '',
            bot2: '',
          },
          winner: '',
          botWeaponLoading: false,
        },
      });
      render(
        <Provider store={store}>
          <ModesContainer />
        </Provider>,
      );

      expect(store.getActions()[0]).toEqual(ModeActions.setWinner('You'));
    });

    test('should dispatch action to set winner - bot wins', () => {
      const mockStore = configureMockStore();

      const store = mockStore({
        home: {
          mode: Modes.MODE_1,
        },
        mode: {
          playerMode: {
            playerWeapon: 'PAPER',
            botWeapon: 'SCISSOR',
          },
          botMode: {
            bot1: '',
            bot2: '',
          },
          winner: '',
          botWeaponLoading: false,
        },
      });
      render(
        <Provider store={store}>
          <ModesContainer />
        </Provider>,
      );

      expect(store.getActions()[0]).toEqual(ModeActions.setWinner('Bot'));
    });

    test('should dispatch action to set winner - ties', () => {
      const mockStore = configureMockStore();

      const store = mockStore({
        home: {
          mode: Modes.MODE_1,
        },
        mode: {
          playerMode: {
            playerWeapon: 'PAPER',
            botWeapon: 'PAPER',
          },
          botMode: {
            bot1: '',
            bot2: '',
          },
          winner: '',
          botWeaponLoading: false,
        },
      });
      render(
        <Provider store={store}>
          <ModesContainer />
        </Provider>,
      );

      expect(store.getActions()[0]).toEqual(ModeActions.setWinner('tied'));
    });

    test('should dispatch actions to reset state and navigate back to home', () => {
      const mockStore = configureMockStore();

      const store = mockStore({
        home: {
          mode: Modes.MODE_1,
        },
        mode: {
          playerMode: {
            playerWeapon: 'PAPER',
            botWeapon: 'PAPER',
          },
          botMode: {
            bot1: '',
            bot2: '',
          },
          winner: 'tied',
          botWeaponLoading: false,
        },
      });
      const wrapper = render(
        <Provider store={store}>
          <ModesContainer />
        </Provider>,
      );

      const backButton = wrapper.container.querySelector('#back-button') as HTMLButtonElement;

      fireEvent.click(backButton);

      expect(store.getActions()[1]).toEqual(ModeActions.resetState());
      expect(store.getActions()[2]).toEqual(ModeActions.navigateToHome());
    });
  });

  describe('BotMode', () => {
    test('should render component in bot mode and perform validations', () => {
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
          <ModesContainer />
        </Provider>,
      );

      expect(wrapper.container.querySelector('#weapons-list')).toBeNull();
      expect(wrapper.container.querySelector('#bot1-label')?.textContent).toEqual('BOT 1');
      expect(wrapper.container.querySelector('#bot2-label')?.textContent).toEqual('BOT 2');
      expect(wrapper.container.querySelector('#unknown')?.getAttribute('src')).toEqual(unknown);
      expect(wrapper.container.querySelector('#play-button')?.textContent).toEqual('Play');
      expect(wrapper.container.querySelector('#back-button')?.textContent).toEqual('Back');
      expect(wrapper.container.querySelector('#play-button')?.getAttribute('disabled')).toStrictEqual(null);
    });

    test('should dispatch action to start playing', () => {
      const mockStore = configureMockStore();

      jest.useFakeTimers();

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
          <ModesContainer />
        </Provider>,
      );

      const playButton = wrapper.container.querySelector('#play-button') as HTMLButtonElement;

      fireEvent.click(playButton);

      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(store.getActions()[0]).toEqual(ModeActions.setBotWeaponLoading(true));
      expect(store.getActions()[1]).toEqual(ModeActions.setBotWeaponLoading(false));
      expect(store.getActions()[2]).toEqual(ModeActions.setBotsWeaponInBotMode(expect.anything(), expect.anything()));
    });

    test('should dispatch action to set winner - bot 1 wins', () => {
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
            bot1: 'PAPER',
            bot2: 'ROCK',
          },
          winner: '',
          botWeaponLoading: false,
        },
      });
      render(
        <Provider store={store}>
          <ModesContainer />
        </Provider>,
      );

      expect(store.getActions()[0]).toEqual(ModeActions.setWinner('Bot 1'));
    });

    test('should dispatch action to set winner - bot2 wins', () => {
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
            bot1: 'PAPER',
            bot2: 'SCISSOR',
          },
          winner: '',
          botWeaponLoading: false,
        },
      });
      render(
        <Provider store={store}>
          <ModesContainer />
        </Provider>,
      );

      expect(store.getActions()[0]).toEqual(ModeActions.setWinner('Bot 2'));
    });

    test('should dispatch action to set winner - ties', () => {
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
            bot1: 'PAPER',
            bot2: 'PAPER',
          },
          winner: '',
          botWeaponLoading: false,
        },
      });
      render(
        <Provider store={store}>
          <ModesContainer />
        </Provider>,
      );

      expect(store.getActions()[0]).toEqual(ModeActions.setWinner('tied'));
    });

    test('should dispatch actions to reset state and navigate back to home', () => {
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
            bot1: 'PAPER',
            bot2: 'PAPER',
          },
          winner: 'tied',
          botWeaponLoading: false,
        },
      });
      const wrapper = render(
        <Provider store={store}>
          <ModesContainer />
        </Provider>,
      );

      const backButton = wrapper.container.querySelector('#back-button') as HTMLButtonElement;

      fireEvent.click(backButton);

      expect(store.getActions()[1]).toEqual(ModeActions.resetState());
      expect(store.getActions()[2]).toEqual(ModeActions.navigateToHome());
    });
  });
});
