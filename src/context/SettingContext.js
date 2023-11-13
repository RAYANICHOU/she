import React, { createContext, useContext, useState } from 'react';


export const SettingContext = createContext();

export const SettingProvider = ({ children }) => {
  
  const [level, setLevel] = useState('beginner');

  // Fonction pour mettre à jour le niveau
  const updateLevel = (newLevel) => {
    setLevel(newLevel);
  };

  return (
    <SettingContext.Provider value={{ level, updateLevel }}>
      {children}
    </SettingContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte des paramètres
export const useSetting = () => {
  return useContext(SettingContext);
};
