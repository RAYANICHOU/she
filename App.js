import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppNavigator from './AppNavigator';
import { GameProvider } from './src/context/GameContexte';
import { LanguageProvider } from './src/context/LangageContexte';
import { ThemeProvider } from './src/context/ThemeContexte';





export default function App() {
  
  return (
    <ThemeProvider>
      <GameProvider>
      <LanguageProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </LanguageProvider>
      </GameProvider>

    </ThemeProvider>
  )
}
