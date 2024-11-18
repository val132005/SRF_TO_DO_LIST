

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
//import Login from './pages/Login'
//import HomeNonLogged from './pages/HomeNonLogged';
//import HomeLogged from './pages/HomeLogged';
import App from './App'
import { ApolloProvider } from '@apollo/client';
import client from './config/apolloClient';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

