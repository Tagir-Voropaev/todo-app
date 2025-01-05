import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from 'react';
import { Provider } from 'react-redux'
import index from './store/index.js';
import { BrowserRouter } from 'react-router-dom';
import './static/css/main.css'
createRoot(document.getElementById('root')).render(
  <BrowserRouter  basename='/todo-app'>
    <Provider store={index}>
    <App />
    </Provider>
  </BrowserRouter>
)
