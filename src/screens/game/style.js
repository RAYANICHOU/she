import { Dimensions, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from '../../utils/colors';

const windowWidth = Dimensions.get('window').width;

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

  darkIndiceText: {
    fontSize: RFValue(15),
    marginTop: RFValue(10),
    color: colors.darkTextPrimary,
  },
  jetonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    top: RFValue(0),
    marginTop: RFValue(0),
    right: RFValue(-10),
  },
  darkJetonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    top: RFValue(0),
    right: RFValue(-10),
  },
  card: {
    width: '90%',
    padding: RFValue(20),
    alignItems: 'center',
    borderRadius: RFValue(15),
    borderWidth: RFValue(1),
    borderColor: '#1E7FCB',
    backgroundColor: "#F1EBE0",
    elevation: 1,
  },
  darkCard: {
    width: '90%',
    padding: RFValue(20),
    alignItems: 'center',
    borderRadius: RFValue(15),
    borderWidth: RFValue(1),
    borderColor: '#363535',
    backgroundColor: 'transparent',
  },
  indiceText: {
    fontSize: RFValue(15),
    alignItems: 'center',
    color: 'gray',
  },
  infoText: {
    fontSize: RFValue(20),
    marginTop: RFValue(10),
    color: colors.textSecondary,
  },
  soldeText: {
    fontSize: RFValue(18),
    marginTop: RFValue(0),
    padding: RFValue(20),
    marginLeft: RFValue(0),
    color: colors.textPrimary,
    
  },
  darkSoldeText: {
    fontSize: RFValue(18),
    marginTop: RFValue(0),
    padding: RFValue(13),
    marginLeft: RFValue(0),
    color: 'white',
  },
  categoryText: {
    fontSize: RFValue(18),
    marginTop: RFValue(0),
    padding: RFValue(10),
    marginRight: RFValue(135),
    color: colors.textPrimary,
  },
  darkCategoryText: {
    fontSize: RFValue(18),
    marginTop: RFValue(0),
    padding: RFValue(10),
    marginRight: RFValue(135),
    color: 'white',
  },
  letterBox: {
    width: RFValue(35),
    height: RFValue(35),
    borderWidth: RFValue(3),
    borderColor: '#1E7FCB',
    margin: RFValue(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(30),
    backgroundColor: colors.secondaryBackground,
  },
  darkLetterBox: {
    width: RFValue(35),
    height: RFValue(35),
    borderWidth: RFValue(3),
    borderColor: 'gray',
    margin: RFValue(2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(30),
    backgroundColor: '#363535',
  },
  motEnCoursContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFValue(5),
  },
  clavier: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(7),
    borderRadius: RFValue(15),
  },
  darkClavier: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(7),
    borderRadius: RFValue(15),
    backgroundColor: 'transparent',
  },
  lettreClavier: {
    width: '12%',
    aspectRatio: 1,
    margin: RFValue(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(25),
    backgroundColor: colors.accent,
    borderWidth: RFValue(2),
    borderColor: colors.darkAccent,
  },
  darkLettreClavier: {
    width: '12%',
    aspectRatio: 1,
    margin: RFValue(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(25),
    backgroundColor: colors.accent,
    borderWidth: RFValue(2),
    borderColor: colors.primaryBackground,
    color: 'white',
  },
  lettreText: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
    color: 'black',
  },
  darkLettreText: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
    color: 'white',
  },
  lettreBonusButton: {
    backgroundColor: colors.darkAccent,
    padding: RFValue(15),
    borderRadius: RFValue(10),
    marginTop: RFValue(10),
    marginHorizontal: RFValue(20),
  },
  darkLettreBonusButton: {
    backgroundColor: '#363535',
    padding: RFValue(15),
    borderRadius: RFValue(10),
    marginTop: RFValue(10),
    marginHorizontal: RFValue(20),
  },

  bonusImage: {
    width: RFValue(40),
    height: RFValue(40),
  },

  regarderPubButton: {
    backgroundColor: colors.accent,
    padding: RFValue(10),
    borderRadius: RFValue(10),
    marginTop: RFValue(10),
    marginHorizontal: RFValue(5),
  },
  darkRegarderPubButton: {
    backgroundColor: 'gray',
    padding: RFValue(10),
    borderRadius: RFValue(10),
    marginTop: RFValue(10),
    marginHorizontal: RFValue(5), 
  },
 
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(16),
  },
  levelButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: RFValue(10),
  },
  chooseCategoryButton: {
    marginTop: RFValue(20),
    padding: RFValue(10),
    backgroundColor: 'darkblue',
    borderRadius: RFValue(5),
    
  },
  chooseCategoryButtonText: {
    color: 'white',
    textAlign: 'center',
    
  },
  bonusMessage: {
    fontSize: RFValue(16),
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: RFValue(10),
    padding: RFValue(10),
    backgroundColor: 'lightyellow',
    borderRadius:RFValue(8)
  },
  congratulationsMessage: {
    fontSize: RFValue(18),
    color: 'green',
    marginTop: RFValue(20),
    backgroundColor: 'white',
    borderRadius:RFValue(20),
    padding: RFValue(10),
  },



});
