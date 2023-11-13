import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryBackground,
  },
  darkContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkBackground,
  },
  header: {
    fontSize: 32,
    marginBottom: 10,
    color: colors.textPrimary,
  },
  darkHeader: {
    fontSize: 32,
    marginBottom: 10,
    color: colors.darkTextPrimary,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 30,
    color: colors.textSecondary,
  },
  darkSubHeader: {
    fontSize: 18,
    marginBottom: 30,
    color: colors.darkTextPrimary,
  },
  
  darkIndiceText: {
    fontSize: 20,
    marginTop: 10,
    color: colors.darkTextPrimary,
  },
  jetonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkJetonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    padding: 20,
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'skyblue',
    backgroundColor: colors.secondaryBackground,
    elevation: 5,
  },
  darkCard: {
    width: '90%',
    padding: 20,
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 5,
    borderColor: '#363535',
    backgroundColor: 'transparent',
    opacity: 10,
    elevation: 5,
  },
  indiceText: {
    fontSize: 15,
    alignItems: 'center',
    
  },
  infoText: {
    fontSize: 20,
    marginTop: 10,
    color: colors.textSecondary,
  },
  soldeText: {
    fontSize: 18,
    marginTop: 10,
    color: colors.textPrimary,
  },
  darkSoldeText: {
    fontSize: 18,
    marginTop: 10,
    color: colors.darkTextPrimary,
  },
  letterBox: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: 'skyblue',
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.secondaryBackground,
  },
  darkLetterBox: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: 'white',
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#363535',
  },
  
  motEnCoursContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  clavier: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    borderRadius: 15,
    backgroundColor: colors.secondaryBackground,
  },
  
  darkClavier: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    borderRadius: 15,
    backgroundColor:'transparent',
  },
  lettreClavier: {
    width: '12%',
    aspectRatio: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.darkAccent,
  },
  darkLettreClavier: {
    width: '12%',
    aspectRatio: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: colors.accent,
    borderWidth: 2,
    borderColor: colors.primaryBackground,
    color: 'white', // Modifier cette ligne
  },
  
  lettreText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',

  },
  darkLettreText: {
    fontSize: 15,
      fontWeight: 'bold',
      color: 'white', 
  },

 
  lettreBonusButton: {
    backgroundColor: colors.darkAccent,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 30,
  },
  darkLettreBonusButton: {
    backgroundColor: '#363535',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 25,
  },
  regarderPubButton: {
    backgroundColor: colors.accent,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    
  },
  darkRegarderPubButton: {
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    
  },
  etapeSuivanteButton: {
    backgroundColor: colors.accent,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  levelButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
});
