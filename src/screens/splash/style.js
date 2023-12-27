import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4CAF50',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoText: {
      fontSize: 94,
      fontWeight: 'bold',
      color: 'white',
    },
    separatorText: {
      fontSize: 100,
      fontWeight: 'bold',
      color: '#FFD700', // Couleur du séparateur (or)
      marginHorizontal: 10,
    },
    sloganText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 0,
      color: 'white',
    },
  });

export default styles