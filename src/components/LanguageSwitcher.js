// Importation de React et de i18n pour utiliser les fonctionnalités de gestion des langues
import React from 'react';
import { useTranslation } from 'react-i18next';
// Composant fonctionnel LanguageSwitcher pour changer la langue

const LanguageSwitcher = () => {
  
    const { i18n } = useTranslation();//acceder a l fonction de traduction
  // Fonction pour changer la langue lorsque l'utilisateur clique sur un bouton

  const changeLanguage = (lng) => {
    // La méthode changeLanguage d'i18next permet de changer la langue en fonction de la valeur du paramètre 'lang'
    console.log(`Changing language to: ${lng}`);
    i18n.changeLanguage(lng);
  };

  return (
    // Conteneur principal avec trois boutons pour chaque langue
    <div className='language-switcher'>
      <p>Composant LanguageSwitcher chargé........................ !</p> {/* Texte temporaire */}
      {/* Le bouton pour changer la langue en français */}
      <button onClick={() => changeLanguage('fr')}>Français</button>
      
      {/* Le bouton pour changer la langue en anglais */}
      <button onClick={() => changeLanguage('en')}>English</button>
      
      {/* Le bouton pour changer la langue en allemand */}
      <button onClick={() => changeLanguage('de')}>Deutsch</button>
    </div>
  );
};

// Exportation du composant LanguageSwitcher pour pouvoir l'utiliser ailleurs dans l'application
export default LanguageSwitcher;
