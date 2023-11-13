import React from 'react';
import { ThemeProvider } from './src/context/ThemeContexte';
import { LanguageProvider } from './src/context/LangageContexte';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';


export default function App() {
  
  return (
    <ThemeProvider>
      <LanguageProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </LanguageProvider>
    </ThemeProvider>
  )
}
