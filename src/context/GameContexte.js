// GameContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [jetons, setJetons] = useState(300);
  const [niveau, setNiveau] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [motEnCours, setMotEnCours] = useState(null);

  useEffect(() => {
    const loadGameFromStorage = async () => {
      try {
        const savedGame = await AsyncStorage.getItem('gameState');
        if (savedGame) {
          const { jetons: savedJetons, niveau: savedNiveau, selectedCategory: savedCategory, motEnCours: savedMotEnCours } = JSON.parse(savedGame);
          setJetons(savedJetons);
          setNiveau(savedNiveau);
          setSelectedCategory(savedCategory);
          setMotEnCours(savedMotEnCours);
        }
      } catch (error) {
        console.error('Error loading game from AsyncStorage', error);
      }
    };

    loadGameFromStorage();
  }, []);

  const saveGameToStorage = async () => {
    try {
      const gameToSave = JSON.stringify({ jetons, niveau, selectedCategory, motEnCours });
      await AsyncStorage.setItem('gameState', gameToSave);
    } catch (error) {
      console.error('Error saving game to AsyncStorage', error);
    }
  };

  useEffect(() => {
    saveGameToStorage();
  }, [jetons, niveau, selectedCategory, motEnCours]);

  const updateJetons = async (nouveauJetons) => {
  
    await setJetons(nouveauJetons);
  };

  const updateNiveau = (newNiveau) => {
    setNiveau(newNiveau);
  };

  const updateSelectedCategory = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  const updateMotEnCours = (newMot) => {
    setMotEnCours(newMot);
  };

  const payerPourDebloquer = async (cout) => {
    if (jetons >= cout) {
      setJetons(jetons - cout);
      return true;
    } else {
      return false;
    }
  };

  return (
    <GameContext.Provider value={{ jetons, niveau, selectedCategory, motEnCours, updateJetons, updateNiveau, updateSelectedCategory, updateMotEnCours, payerPourDebloquer }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  return useContext(GameContext);
};
