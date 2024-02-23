import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppNavigator from './AppNavigator';
import { GameProvider } from './src/context/GameContexte';
import { LanguageProvider } from './src/context/LangageContexte';
import { ThemeProvider } from './src/context/ThemeContexte';

import {PermissionsAndroid} from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);



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
