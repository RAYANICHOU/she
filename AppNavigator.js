import React, { useEffect, useState } from 'react';
import SplashScreen from './src/screens/splash';
import Router from './src/navigation/bottomNav/router';


export default function AppNavigator() {

  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {

    setTimeout(() => {
      setLoadingComplete(true);
    }, 3000);
    
  }, []);

  if (!isLoadingComplete) {

    return <SplashScreen onLoadingComplete={() => setLoadingComplete(true)} />
  }

  return <Router />
}
