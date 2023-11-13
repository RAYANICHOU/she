import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    darkContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#2e2e2d',
    },
    title: {
      fontSize: 20,
      marginBottom: 20,
      fontWeight: 'bold',
    },
    darkTitle: {
      fontSize: 20,
      marginBottom: 20,
      fontWeight: 'bold',
      color: 'white',
    },
    categoryButton: {
      width: 200,
      height: 200, // Pour ajuster la hauteur en fonction de vos besoins
      margin: 10,
     
      borderRadius: 30,
      overflow: 'hidden', // Pour masquer le débordement de l'image
    },
    imageBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    darkImageBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    categoryText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white', // Couleur du texte pour la visibilité
    },
  });

export default styles