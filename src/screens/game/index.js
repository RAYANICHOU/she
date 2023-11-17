import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, Vibration, View, TouchableWithoutFeedback, Animated } from 'react-native';
import { Card } from 'react-native-elements';
import { motsBibliotheque } from '../../../assets/data/mots';
import { useLanguage } from '../../context/LangageContexte';
import { useTheme } from '../../context/ThemeContexte';
import { lettresClavier } from '../../utils/lettres';
import { styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGame } from '../../context/GameContexte';




const maxEssaisParMot = 3;

export default function GameScreen() {
  


  const { darkMode } = useTheme();
  const { translate } = useLanguage();
  const [motsRestants, setMotsRestants] = useState([...motsBibliotheque]);
  const [motEnCours, setMotEnCours] = useState(null);
  const [essaisRestants, setEssaisRestants] = useState(maxEssaisParMot);
  const [lettresMotEnCours, setLettresMotEnCours] = useState([]);
  const [totalJetonsGagnes, setTotalJetonsGagnes] = useState(0);
  const [pubVue, setPubVue] = useState(false);
  const [indiceMotEnCours, setIndiceMotEnCours] = useState(false);
  const [clignotement, setClignotement] = useState(false);
  const [lettresCorrectes, setLettresCorrectes] = useState ([]);
  const [lettresIncorrectes, setLettresIncorrectes] = useState([]);
  const [lettreAgrandie, setLettreAgrandie] = useState(null);
  
  const { jetons, niveau, updateJetons, updateNiveau } = useGame();


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
  const categoriesDebloquees = route.params?.categoriesDebloquees || [];

  
  const STORAGE_KEY = 'gameState';

  useEffect(() => {
    const loadGameState = async () => {
      try {
        const savedStateJSON = await AsyncStorage.getItem(STORAGE_KEY);
        const savedCategory = await AsyncStorage.getItem('selectedCategory');
  
        if (savedStateJSON) {
          const savedState = JSON.parse(savedStateJSON);
          // Restaurez l'état du jeu à partir des données stockées
          setMotsRestants(savedState.motsRestants);
          setMotEnCours(savedState.motEnCours);
          setEssaisRestants(savedState.essaisRestants);
         
        } else {
          if (savedCategory) {
            initialiserJeuAvecCategorie(savedCategory);
          } else {
            choisirMotAleatoire();
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'état du jeu:', error);
      }
    };
  
    loadGameState();
  }, []);
  

  useEffect(() => {
    const saveGameState = async () => {
      try {
        const gameState = {
          motsRestants,
          motEnCours,
          essaisRestants,
          jetons,
          niveau,
        };
        const gameStateJSON = JSON.stringify(gameState);
        await AsyncStorage.setItem(STORAGE_KEY, gameStateJSON);
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de l\'état du jeu:', error);
      }
    };

    saveGameState();
  }, [motsRestants, motEnCours, essaisRestants, jetons, niveau]);




  const initialiserJeuAvecCategorie = (category) => {
    const motsFiltres = motsBibliotheque.filter((mot) => mot.catégorie === category);
  
    if (!motsFiltres.length) {
      Alert.alert(translate('congratulations'), translate('guessedAllWords'));
      navigation.navigate('CATEGORIE');
      return;
    }
  
    const indexMotAleatoire = Math.floor(Math.random() * motsFiltres.length);
    const nouveauMotObj = motsFiltres[indexMotAleatoire];
    const nouveauMot = nouveauMotObj.mot;
    const indiceDuMot = nouveauMotObj.indice;
  
    setMotEnCours(nouveauMot);
    setIndiceMotEnCours(indiceDuMot);
    setEssaisRestants(maxEssaisParMot);
    setMotsRestants(motsFiltres.filter((mot) => mot !== nouveauMotObj));
    setLettresMotEnCours([]);
    setLettresIncorrectes([]);
    setClignotement(false);
  };
  
















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
      setLettresIncorrectes([]);
    }
  }, [selectedCategory]);
  

  const choisirMotAleatoire = () => {
    let motsFiltres;
  
    if (selectedCategory) {
      motsFiltres = motsBibliotheque.filter((mot) => mot.catégorie === selectedCategory);
    } else {
      // Filter words based on unlocked categories when no category is selected
      motsFiltres = motsBibliotheque.filter((mot) => categoriesDebloquees.includes(mot.catégorie));
    }
  
    if (!motsFiltres.length) {
      Alert.alert(translate('congratulations'), translate('guessedAllWords'));
      navigation.navigate('CATEGORIE');
      return;
    }
  
    const indexMotAleatoire = Math.floor(Math.random() * motsFiltres.length);
    const nouveauMotObj = motsFiltres[indexMotAleatoire];
    const nouveauMot = nouveauMotObj.mot;
    const indiceDuMot = nouveauMotObj.indice;
  
    setMotEnCours(nouveauMot);
    setIndiceMotEnCours(indiceDuMot);
    setEssaisRestants(maxEssaisParMot);
    setMotsRestants(motsFiltres.filter((mot) => mot !== nouveauMotObj));
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
        const nouveauxEssaisRestants = essaisRestants - 1;
  
        if (nouveauxEssaisRestants === 0) { // Si les essais sont épuisés
          // Vérifier si l'utilisateur a suffisamment de jetons pour la pénalité
          const penalite = 20;
          if (jetons >= penalite) {
            updateJetons(jetons - penalite);
            Alert.alert(
              translate('incorrectWord'),
              `${translate('theWordWas')} : '${motEnCours}'. ${translate('youLost')} ${penalite} ${translate('tokens')}.`
            );
            choisirMotAleatoire();
          } else {
            // Proposer de regarder une pub pour gagner des jetons, ou une autre logique appropriée
            Alert.alert(
              translate('notEnoughTokens'),
              translate('watchAdOrEarnTokens')
            );
          }
        } else {
          setEssaisRestants(nouveauxEssaisRestants);
          setLettresIncorrectes([...lettresIncorrectes, lettreEntre]);
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
      if (jetons >= 30) {
        for (let i = 0; i < motEnCours.length; i++) {
          const lettre = motEnCours[i].toUpperCase();
          if (!lettresMotEnCours.includes(lettre)) {
            setLettresMotEnCours([...lettresMotEnCours, lettre]);
            updateJetons(jetons - 30);
            Alert.alert(
              translate('bonusLetterObtained'),
              `${translate('letterBonusIs')} '${lettre}'. ${translate('cost')}  30 ${translate('tokens')}.`
            );
            break;
          }
        }
      } else {
        Alert.alert(
          translate('cannotObtainBonusLetter'),
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
        translate('cannotObtainBonusLetter'),
        translate('notEnoughTokensOrNoMoreLetters')
      );
    }
  };




  const regarderPub = () => {
    setPubVue(true); 
    updateJetons(jetons + 100); 
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
      updateNiveau(niveau + 1);

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
      <Text style={lettreTextStyle}>
        {lettresMotEnCours.includes(lettre) ? lettre : ''}
      </Text>
    </View>
  ));

  return <View style={styles.motEnCoursContainer}>{cases}</View>;
};

  

  const renderClavier = () => {
    return (
      <View style={clavierStyle}>
        {lettresClavier.map((lettre) => (
          <TouchableWithoutFeedback
            key={lettre}
            onPress={() => verifierLettre(lettre)}
            onPressIn={() => agrandirLettre(lettre)}
            onPressOut={() => reduireLettre(lettre)}
            disabled={!motEnCours || lettresMotEnCours.includes(lettre)}
          >
            <Animated.View
              style={[
                lettreClavierStyle,
                {
                  backgroundColor: lettresMotEnCours.includes(lettre)
                    ? '#1976d2'
                    : lettresIncorrectes.includes(lettre)
                    ? 'red'
                    : 'transparent',
                  transform: [{ scale: lettreAgrandie === lettre ? 1.2 : 1 }],
                },
              ]}
            >
              <Text style={lettreTextStyle}>{lettre}</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    );
  };
  

  const agrandirLettre = (lettre) => {
    setLettreAgrandie(lettre);
  };

  const reduireLettre = (lettre) => {
    setTimeout(() => {
      setLettreAgrandie(null);
    }, 300); 
  };

  return (

    <View style={containerStyle}>
         {selectedCategory && <Text>Category: {selectedCategory}</Text>}
       <View style={jetonsContainerStyle}>
        <Text style={soldeTextStyle}>🪙 {jetons + totalJetonsGagnes} {translate('tokens')}</Text>
      </View>
      <Text style={indiceTextStyle}>Niveau: {niveau}</Text>

      <Text style={headerStyle}>{translate('appTitle')}</Text>
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
