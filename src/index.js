import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducers';
import { getGuildData } from './store/actions';
import { SET_GUILD_MNEMONIC } from './store/constants';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

document.addEventListener('DOMContentLoaded', () => {
  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  const splitHost = window.location.host.split('.');
  const mnemonic = splitHost.length === 3 ? splitHost[0] : 'demo';
  store.dispatch({ type: SET_GUILD_MNEMONIC, mnemonic });

  getGuildData(mnemonic)(store.dispatch);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
