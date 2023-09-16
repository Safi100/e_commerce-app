import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { CartContextProvider } from './context/CartContext';
import { CustomerContextProvider } from './context/CustomerContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
      <CartContextProvider>
        <CustomerContextProvider>
          <Router>
            <App />
          </Router>
        </CustomerContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
);