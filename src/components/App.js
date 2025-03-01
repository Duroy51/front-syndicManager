import logo from '../logo.svg';
import '../App.css';
import LanguageSwitcher from './LanguageSwitcher';
import React from 'react';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();//acceder a l fonction de traduction

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {t("modifier")} <code>src/App.js</code> {t("etEnregistrerPourRecharger.")}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("apprendreReact")}
        </a>
        <LanguageSwitcher />
      </header>
    </div>
  );
}

export default App;
