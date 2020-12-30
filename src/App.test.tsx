import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { Modes } from './containers/RockScissorPaperContainer/store/constants';

describe('App tests', () => {
  let wrapper;
  let history = createMemoryHistory({ initialEntries: ['/'] });

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: ['/'] });
    jest.clearAllMocks();
  });
  test('renders /play route', () => {
    history = createMemoryHistory({
      initialEntries: ['/play'],
    });

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
    wrapper = render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );
    expect(history.location.pathname).toBe('/play');
  });

  test('renders / route', () => {
    history = createMemoryHistory({
      initialEntries: ['/'],
    });

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
    wrapper = render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );
    expect(history.location.pathname).toBe('/');
  });
});
