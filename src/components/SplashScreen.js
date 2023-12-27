import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';

export default function SplashScreen({ onDone }) {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.sequence([
      Animated.delay(1000),
      Animated.timing(translateY, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDone(); // Appelé lorsque l'animation du SplashScreen est terminée
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.splashScreen, { transform: [{ translateY }] }]}>
        <Text style={styles.splashText}>Your SplashScreen</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashScreen: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
