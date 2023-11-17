// ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("fr");
  const availableLanguages = ["fr", "en"];

 

  const saveSettingsToStorage = async () => {
    try {
      const settingsToSave = JSON.stringify({
        darkMode,
        language: selectedLanguage,
      });
      await AsyncStorage.setItem("settingsState", settingsToSave);
    } catch (error) {
      console.error("Error saving settings to AsyncStorage", error);
    }
  };

  const updateSettings = () => {
    saveSettingsToStorage();
  };

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    updateSettings();
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, selectedLanguage, changeLanguage, availableLanguages }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
