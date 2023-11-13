// LanguageContext.js
import React, { createContext, useContext, useState } from 'react';
import { translations } from '../components/i18n';

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {

  const [language, setLanguage] = useState('fr'); // Langue par défaut

  const translate = (key) => {

    if (translations[language] && translations[language][key]) {
      
      return translations[language][key];
    }

    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
