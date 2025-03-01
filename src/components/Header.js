import React from 'react';
import { useTranslation } from 'react-i18next';
import '../Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="header">
      <div className="header-logo">
        Mon Syndicat
      </div>
      <nav className="header-nav">
        <ul>
          <li>< Link  to="/">Accueil</ Link></li>
          <li>< Link  to="/home">Home</ Link></li>
          <li>< Link  to="/syndicat-app">Syndicat App</ Link></li>
          <li>< Link  to="/profile">Profil</ Link></li>
        </ul>
      </nav>
      <div className="header-lang">
        <button onClick={() => changeLanguage('fr')}>Français</button>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('de')}>Deutsch</button>
      </div>
    </header>
  );
};

export default Header;
