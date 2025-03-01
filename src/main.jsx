import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {AppRoute} from "./router/appRouter";
import {BrowserRouter} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import './i18n';//importer i18n pour initialiser les traductions

import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId="137734019377-nnq12325retn9n23nfnis326j008u2pm.apps.googleusercontent.com">
    <React.StrictMode>
        <BrowserRouter>
          <div className='min-h-screen overflow-y-auto overflow-x-hidden'>
              <AppRoute />
          </div>
        </BrowserRouter>

    </React.StrictMode>
    </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
