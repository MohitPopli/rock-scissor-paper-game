import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import createReducer from './reducer';
import history from './utils/history';
import sagas from './sagas';
import { Provider } from 'react-redux';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({
  collapsed: true,
  diff: true,
});

const middlewares = [sagaMiddleware, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') middlewares.push(loggerMiddleware);

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const store: any = createStore(createReducer(), {}, composeEnhancers(applyMiddleware(...middlewares)));

store.runSaga = sagaMiddleware.run;

sagas.map(store.runSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
