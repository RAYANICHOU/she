import { View } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable'; 
import styles from './style';


export default function SplashScreen() {

  return (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Animatable.Text
              animation="fadeInDown" // Animation d'entrée
              duration={1500}
              style={styles.logoText}
            >
              L
            </Animatable.Text>
            <Animatable.Text
              animation="fadeInDown" // Animation d'entrée
              duration={1500}
              delay={500} // Délai pour afficher "E" après "L"
              style={styles.separatorText}
            >
              E
            </Animatable.Text>
            <Animatable.Text
              animation="fadeInDown" 
              duration={1500}
              delay={1000} 
              style={styles.logoText}
            >
              A
            </Animatable.Text>
          </View>
          <Animatable.Text
            animation="bounceInUp" 
            duration={2000}
            delay={1000} // Délai pour afficher le slogan
            style={styles.sloganText}
          >
            C'est pour les cracks!
          </Animatable.Text>
        </View>
  )
}