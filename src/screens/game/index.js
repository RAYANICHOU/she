import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, Vibration, View } from 'react-native';
import { Card } from 'react-native-elements';
import { motsBibliotheque } from '../../../assets/data/mots';
import { useLanguage } from '../../context/LangageContexte';
import { useTheme } from '../../context/ThemeContexte';
import { lettresClavier } from '../../utils/lettres';
import { styles } from './style';

const maxEssaisParMot = 3;

export default function GameScreen() {

  const { darkMode } = useTheme();
  const { translate } = useLanguage();
  const [motsRestants, setMotsRestants] = useState([...motsBibliotheque]);
  const [motEnCours, setMotEnCours] = useState(null);
  const [essaisRestants, setEssaisRestants] = useState(maxEssaisParMot);
  const [jetons, setJetons] = useState(100);
  const [lettresMotEnCours, setLettresMotEnCours] = useState([]);
  const [totalJetonsGagnes, setTotalJetonsGagnes] = useState(0);
  const [pubVue, setPubVue] = useState(false);
  const [indiceMotEnCours, setIndiceMotEnCours] = useState(false);
  const [clignotement, setClignotement] = useState(false);
  const [lettresCorrectes, setLettresCorrectes] = useState ([]);
  const [lettresIncorrectes, setLettresIncorrectes] = useState([]);


  const containerStyle = darkMode ? styles.darkContainer : styles.container;
  const headerStyle = darkMode ? styles.darkHeader : styles.header;
  const jetonsContainerStyle = darkMode ? styles.darkJetonsContainer : styles.jetonsContainer;
  const soldeTextStyle = darkMode ? styles.darkSoldeText : styles.soldeText;
  const cardStyle = darkMode ? styles.darkCard : styles.card;
  const regarderPubButtonStyle = darkMode ? styles.darkRegarderPubButton : styles.regarderPubButton;
  const lettreBonusButtonStyle = darkMode ? styles.darkLettreBonusButton : styles.lettreBonusButton;
  const indiceTextStyle = darkMode ? styles.darkIndiceText : styles.indiceText;
  const clavierStyle = darkMode ? styles.darkClavier : styles.clavier;
  const lettreClavierStyle = darkMode ? styles.darkLettreClavier : styles.lettreClavier;
  const lettreTextStyle = darkMode ? styles.darkLettreText : styles.lettreText;
  const letterBoxStyle = darkMode ? styles.darkLetterBox : styles.letterBox;
  const navigation = useNavigation();
  const route = useRoute();
  const selectedCategory = route.params?.category;
  
  
  
  useEffect(() => {

    const motsFiltres = motsBibliotheque.filter((mot) => mot.catégorie === selectedCategory);
  
    if (!motsFiltres.length) {
      navigation.navigate('CATEGORIE');
    } else {
      const indexMotAleatoire = Math.floor(Math.random() * motsFiltres.length);
      const nouveauMotObj = motsFiltres[indexMotAleatoire];
      const nouveauMot = nouveauMotObj.mot;
      const indiceDuMot = nouveauMotObj.indice;
  
      setMotEnCours(nouveauMot);
      setIndiceMotEnCours(indiceDuMot);
      setEssaisRestants(maxEssaisParMot);
      setMotsRestants(motsFiltres.filter((mot) => mot !== nouveauMotObj));
      setLettresMotEnCours([]);
    }
  }, [selectedCategory]);
  

  const choisirMotAleatoire = () => {
    
    if (!motsRestants.length) {
      
      Alert.alert(translate('congratulations'), translate('guessedAllWords'));
      navigation.navigate('CATEGORIE');
      return;
    }

    const indexMotAleatoire = Math.floor(Math.random() * motsRestants.length);
    const nouveauMotObj = motsRestants[indexMotAleatoire];
    const nouveauMot = nouveauMotObj.mot;
    const indiceDuMot = nouveauMotObj.indice;

    setMotEnCours(nouveauMot);
    setIndiceMotEnCours(indiceDuMot);
    setEssaisRestants(maxEssaisParMot);
    setMotsRestants(motsRestants.filter((mot) => mot !== nouveauMotObj));
    setLettresMotEnCours([]);
    setLettresIncorrectes([]);
    setClignotement(false);
  };

  const verifierLettre = async (lettre) => {
    
    const lettreEntre = lettre.toUpperCase();
  
    if (motEnCours && motEnCours.toUpperCase().includes(lettreEntre)) {
      if (!lettresMotEnCours.includes(lettreEntre)) {
        setLettresMotEnCours([...lettresMotEnCours, lettreEntre]);
        setLettresCorrectes([...lettresCorrectes, lettreEntre]);
  
        if (lettresMotEnCours.join('') === motEnCours.toUpperCase()) {
          const jetonsGagnes = 20;
          setTotalJetonsGagnes(totalJetonsGagnes + jetonsGagnes);
          passerAEtapeSuivante();
        }
      }
    } else {
      if (!lettresIncorrectes.includes(lettreEntre)) {
        Vibration.vibrate(500);
        setEssaisRestants(essaisRestants - 1);
        setLettresIncorrectes([...lettresIncorrectes, lettreEntre]);
  
        if (essaisRestants === 0) {
          const penalite = 20;
          setJetons(jetons - penalite);
          Alert.alert(
            translate('incorrectWord'),
            `${translate('theWordWas')} : '${motEnCours}'. ${translate('youLost')} ${penalite} ${translate('tokens')}.`
          );
  
          choisirMotAleatoire();
        }
      }
    }
  };
  

  useEffect(() => {

    const toutesLesLettresCorrectes =
      motEnCours &&
      [...motEnCours.toUpperCase()].every((lettre) => lettresMotEnCours.includes(lettre));

    if (toutesLesLettresCorrectes) {
      setTimeout(() => {
        passerAEtapeSuivante();
      }, 100);
    }
  }, [lettresMotEnCours]);

  const obtenirLettreBonus = () => {
    if (motEnCours && lettresMotEnCours.length < 3) {
      if (jetons >= 20) {
        for (let i = 0; i < motEnCours.length; i++) {
          const lettre = motEnCours[i].toUpperCase();
          if (!lettresMotEnCours.includes(lettre)) {
            setLettresMotEnCours([...lettresMotEnCours, lettre]);
            setJetons(jetons - 30);
            Alert.alert(
              translate('letterBonusObtained'),
              `${translate('letterBonusIs')} '${lettre}'. ${translate('cost')}  30 ${translate('tokens')}.`
            );
            break;
          }
        }
      } else {
        Alert.alert(
          translate('notEnoughTokens'),
          translate('notEnoughTokensToBuyLetterBonus')
        );
      }
    } else if (lettresMotEnCours.length === 3) {
      Alert.alert(
        translate('limitReached'),
        translate('limitReachedMessage')
      );
    } else {
      Alert.alert(
        translate('unableToGetLetterBonus'),
        translate('notEnoughTokensOrNoMoreLetters')
      );
    }
  };

  const regarderPub = () => {

      setJetons(jetons + 100);
      setPubVue(true);
      Alert.alert(translate('adWatched'), `${translate('youWon')} 100 ${translate('tokens')}`);
    
  };
  
  
  useEffect(() => {
    choisirMotAleatoire();
  }, []);

  const toutesLesLettresCorrectes = () => {

    if (!motEnCours) return false;
    return [...motEnCours.toUpperCase()].every((lettre) => lettresMotEnCours.includes(lettre));
  };

  const passerAEtapeSuivante = () => {

    if (motEnCours && toutesLesLettresCorrectes()) {
      const jetonsGagnes = 30;
      setTotalJetonsGagnes(totalJetonsGagnes + jetonsGagnes);
      setClignotement(true);
      setTimeout(() => {
        setClignotement(false);
        choisirMotAleatoire();
        setEssaisRestants(maxEssaisParMot);
      }, 0.1);
    }
  };
  

  const renderMotEnCours = () => {
    

    if (!motEnCours) return null;
    const motEnMajuscules = motEnCours.toUpperCase();
    const toutesLesLettresDevinees = [...motEnMajuscules].every((lettre) =>
      lettresMotEnCours.includes(lettre)
    );
    const cases = motEnMajuscules.split('').map((lettre, index) => (
      <View
        key={index}
        style={[
          letterBoxStyle,
          {
            backgroundColor: clignotement ? '#1976d2' : 'transparent',
          },
        ]}
      >
        <Text style={lettreTextStyle}>{lettresMotEnCours.includes(lettre) ? lettre : ''}</Text>
      </View>
    ));
    
    return <View style={styles.motEnCoursContainer}>{cases}</View>;

  };

  const renderClavier = () => {
    return (
      <View style={clavierStyle}>
        {lettresClavier.map((lettre) => (
          <TouchableOpacity
            key={lettre}
            style={[
              lettreClavierStyle,
              {
                backgroundColor: lettresMotEnCours.includes(lettre)
                  ? '#1976d2'
                  : (lettresIncorrectes.includes(lettre) ? 'red' : 'transparent'),
              },
            ]}
            onPress={() => verifierLettre(lettre)}
            disabled={!motEnCours || lettresMotEnCours.includes(lettre)}
          >
            <Text style={lettreTextStyle}>{lettre}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };


  return (

    <View style={containerStyle}>
      <Text style={headerStyle}>{translate('appTitle')}</Text>
      <View style={jetonsContainerStyle}>
        <Text style={soldeTextStyle}>🪙 {jetons + totalJetonsGagnes} {translate('tokens')}</Text>
      </View>
      {renderMotEnCours()}
      <Text style={indiceTextStyle}>Indice: {indiceMotEnCours}</Text>
      <Card containerStyle={cardStyle}>
        <Text style={styles.infoText}>{translate('trying')} : {essaisRestants}</Text>
        {renderClavier()}
      </Card>
      <View style={styles.levelButtons}>
        <TouchableOpacity
          style={lettreBonusButtonStyle}
          onPress={obtenirLettreBonus}
          
        >
          <Text style={styles.buttonText}>{translate('bl')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={regarderPubButtonStyle}
          onPress={regarderPub}
          enabled={pubVue}
        >
          <Text style={styles.buttonText}>{translate('watchAd')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
