import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore } from 'redux'
import allReducers from './reducers';
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from 'react-redux';

const store = createStore(allReducers, composeWithDevTools())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
  
);

