import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Animated, Text, TouchableOpacity, TouchableWithoutFeedback, Vibration, View } from 'react-native';
import { AdEventType, RewardedAdEventType, RewardedInterstitialAd } from 'react-native-google-mobile-ads';

import { Card } from 'react-native-elements';
import { motsBibliotheque } from '../../../assets/data/mots';
import { useGame } from '../../context/GameContexte';
import { useLanguage } from '../../context/LangageContexte';
import { useTheme } from '../../context/ThemeContexte';
import { lettresClavier } from '../../utils/lettres';
import { styles } from './style';


const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest('ca-app-pub-9840961515933669/4969992741', {
  requestNonPersonalizedAdsOnly: true
});



const maxEssaisParMot = 4 ;

export default function GameScreen() {

  const { darkMode } = useTheme();
  const { translate } = useLanguage();
  const [motsRestants, setMotsRestants] = useState([...motsBibliotheque]);
  const [consecutiveCorrectGuesses, setConsecutiveCorrectGuesses] = useState(0);
  const [essaisRestants, setEssaisRestants] = useState(maxEssaisParMot);
  const [lettresMotEnCours, setLettresMotEnCours] = useState([]);
  const [totalJetonsGagnes, setTotalJetonsGagnes] = useState(0);
  const [pubVue, setPubVue] = useState(false);
  const [indiceMotEnCours, setIndiceMotEnCours] = useState(false);
  const [clignotement, setClignotement] = useState(false);
  const [lettresCorrectes, setLettresCorrectes] = useState ([]);
  const [lettresIncorrectes, setLettresIncorrectes] = useState([]);
  const [lettreAgrandie, setLettreAgrandie] = useState(null);
  const [lettresPosition, setLettresPosition] = useState([...lettresClavier]);


  const [showBonusMessage, setShowBonusMessage] = useState(false);
  const { jetons, niveau, updateJetons, updateNiveau, motEnCours, updateMotEnCours } = useGame();
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showSuper, setShowSuper] = useState(false);
  const [showLearnt, setShowLearnt] = useState(false);
  const [rewardedInterstitialLoaded, setRewardedInterstitialLoaded] = useState(false);

  const loadRewardedInterstitial = () => {
    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setRewardedInterstitialLoaded(true);
      }
    );

    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log(`User earned reward of ${reward.amount} ${reward.type}`);
      }
    );

    const unsubscribeClosed = rewardedInterstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setRewardedInterstitialLoaded(false);
        rewardedInterstitial.load();
      }
    );

    rewardedInterstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeEarned();
    }
  };

  
  










  const containerStyle = darkMode ? styles.darkContainer : styles.container;
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
  const categoryTextStyle = darkMode ? styles.darkCategoryText : styles.categoryText;



  const navigation = useNavigation();
  const route = useRoute();
  const selectedCategory = route.params?.category;
  const categoriesDebloquees = route.params?.categoriesDebloquees || [];








  const startTokenInterval = () => {
    const intervalDuration = 5 * 60 * 1000;
  
    const updateTokens = async () => {
      try {
        const newJetons = jetons + 25;
    
        if (newJetons < 200) {
          await updateJetons((prevJetons) => prevJetons + 20);
          setShowBonusMessage(true);
    
          setTimeout(() => {
            setShowBonusMessage(false);
          }, 2000);
        } else {
          console.log("L'utilisateur a atteint la limite de 200 jetons.");
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour des jetons:', error);
      }
    };
    
  
    const intervalId = setInterval(updateTokens, intervalDuration);
    return () => clearInterval(intervalId);
  };
  
  useEffect(() => {
    const intervalCleanup = startTokenInterval();
    return () => intervalCleanup();
  }, [jetons]);
  
  
  




  
  const STORAGE_KEY = 'gameState';

  useEffect(() => {
    const loadGameState = async () => {
      try {
        const savedStateJSON = await AsyncStorage.getItem(STORAGE_KEY);
        const savedCategory = await AsyncStorage.getItem('selectedCategory');
    
        if (savedStateJSON) {
          const savedState = JSON.parse(savedStateJSON);
    
          setMotsRestants(savedState.motsRestants);
          
        } else {
          if (savedCategory) {
            initialiserJeuAvecCategorie(savedCategory);
          } else {
            if (selectedCategory) {
              initialiserJeuAvecCategorie(selectedCategory);
            }
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l\'état du jeu:', error);
      }
    };
    
  
    loadGameState();
  }, [selectedCategory]);


  useEffect(() => {
    const choisirMotSiCategorieSelectionnee = () => {
      if (selectedCategory) {
        choisirMotAleatoire();
      }
    };
  
    choisirMotSiCategorieSelectionnee();
  }, [selectedCategory]);
    
  

  useEffect(() => {
    const saveGameState = async () => {
      try {
        const gameState = {
          motsRestants,
          jetons,
          updateJetons,
          niveau,
       
        };
        const gameStateJSON = JSON.stringify(gameState);
        await AsyncStorage.setItem(STORAGE_KEY, gameStateJSON);
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de l\'état du jeu:', error);
      }
    };

    saveGameState();
  }, [motsRestants, jetons,updateJetons, niveau]);















  const redistribuerLettres = () => {
    const lettresMelangees = lettresClavier.sort(() => Math.random() - 0.5);
    setLettresPosition([...lettresMelangees]);
  };

  useEffect (()=>{
    redistribuerLettres();
  }, [motEnCours]);
  


  const obtenirLettreBonus = async () => {
    const coutLettreBonus = 20;
    
    console.log('Nombre de jetons avant la déduction :', jetons);
  
    if (motEnCours && lettresMotEnCours.length < 3) {
      if (jetons >= coutLettreBonus) {
        const nouveauJetons = jetons - coutLettreBonus;
        await updateJetons(nouveauJetons);
  
        for (let i = 0; i < motEnCours.length; i++) {
          const lettre = motEnCours[i].toUpperCase();
          if (!lettresMotEnCours.includes(lettre)) {
            setLettresMotEnCours([...lettresMotEnCours, lettre]);
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
    }
  };
  

  




  const initialiserJeuAvecCategorie = (category) => {
    const motsFiltres = motsBibliotheque.filter(
      (mot) => mot.catégorie === category && mot.niveau === niveau
    );
  
    if (!motsFiltres.length) {
      Alert.alert(translate('congratulations'), translate('guessedAllWords'));
      navigation.navigate('CATEGORIE');
      return;
    }
  
    const motsParNiveauActuel = motsFiltres.filter((mot) => mot.niveau === niveau);
  
    if (!motsParNiveauActuel.length) {
      const premierMot = motsFiltres[0];
      updateMotEnCours(premierMot.mot);
      setIndiceMotEnCours(premierMot.indice);
    } else {
      const indexMotAleatoire = Math.floor(Math.random() * motsParNiveauActuel.length);
      const nouveauMotObj = motsParNiveauActuel[indexMotAleatoire];
      updateMotEnCours(nouveauMotObj.mot);
      setIndiceMotEnCours(nouveauMotObj.indice);
    }
  
    setEssaisRestants(maxEssaisParMot);
    setMotsRestants(motsFiltres.filter((mot) => mot !== nouveauMotObj));
    setLettresMotEnCours([]);
    setLettresIncorrectes([]);
    setClignotement(false);
  };
  
  

  useEffect(() => {
    const motsFiltres = motsBibliotheque.filter(
      (mot) => mot.catégorie === selectedCategory && mot.niveau === niveau
    );
  
    if (!motsFiltres.length) {
      navigation.navigate('CATEGORIE');
    } else {
      const indexMotAleatoire = Math.floor(Math.random() * motsFiltres.length);
      const nouveauMotObj = motsFiltres[indexMotAleatoire];
      const nouveauMot = nouveauMotObj.mot;
      const indiceDuMot = nouveauMotObj.indice;
  
      updateMotEnCours(nouveauMot);
      setIndiceMotEnCours(indiceDuMot);
      setEssaisRestants(maxEssaisParMot);
      setMotsRestants(motsFiltres.filter((mot) => mot !== nouveauMotObj));
      setLettresMotEnCours([]);
      setLettresIncorrectes([]);
    }
  }, [selectedCategory, niveau]);
  
  

  const choisirMotAleatoire = () => {
    let motsFiltres;
  
    if (selectedCategory) {
      motsFiltres = motsBibliotheque.filter((mot) => mot.catégorie === selectedCategory);
    } else {
     
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



    redistribuerLettres();
    updateMotEnCours(nouveauMot);
    setIndiceMotEnCours(indiceDuMot);
    
    setEssaisRestants(maxEssaisParMot);
    setMotsRestants(motsFiltres.filter((mot) => mot !== nouveauMotObj));
    setLettresMotEnCours([]);
    setLettresIncorrectes([]);
    
    setClignotement(false);
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

  const toutesLesLettresCorrectes = () => {

    if (!motEnCours) return false;
    return [...motEnCours.toUpperCase()].every((lettre) => lettresMotEnCours.includes(lettre));
  };








  const passerAEtapeSuivante = async () => {
    if (motEnCours && toutesLesLettresCorrectes()) {
      const jetonsGagnes = 20;
      const nouveauNombreJetons = jetons + jetonsGagnes;
     
      await updateJetons(nouveauNombreJetons);
      
    
      console.log(jetonsGagnes);
      setTimeout(() => {
        setClignotement(true);
        
        if (consecutiveCorrectGuesses + 1 === 3) {
          setShowSuper(true);
          setShowCongratulations(false);
        } else if (consecutiveCorrectGuesses + 1 === 5) {
          setShowSuper(false);
          setShowLearnt(true);
        } else {
          setShowSuper(false);  
          setShowCongratulations(true);
        }
  
        setTimeout(() => {
          setShowCongratulations(false);
   
          setShowLearnt(false);
          setShowSuper(false);
          setClignotement(false);
          choisirMotAleatoire();
          setEssaisRestants(maxEssaisParMot);
          updateNiveau(niveau + 1);
  
          
          setConsecutiveCorrectGuesses((prev) =>
            prev + 1 === 5 ? 0 : prev + 1
          );
        }, 1000);
      }, 900);
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
        <Text>{lettresMotEnCours.includes(lettre) ? lettre : ''}</Text>
      </Text>
    </View>
  ));
  

  return <View style={styles.motEnCoursContainer}>{cases}</View>;
};
  
 

  

  const renderClavier = () => {
    return (
      <View style={clavierStyle}>
        {lettresPosition.map((lettre) => (
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

  
  const regarderPub = async () => {
    await loadRewardedInterstitial();

    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        const nouveauxJetons = jetons + 100;
        updateJetons(nouveauxJetons);
        Alert.alert(translate('rewardEarned'));
        unsubscribeEarned();
        unsubscribeClosed();
      }
    );

    const unsubscribeClosed = rewardedInterstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        unsubscribeEarned();
        unsubscribeClosed();
      }
    );

    if (rewardedInterstitialLoaded) {
      rewardedInterstitial.show();
    } else {
      console.log("La publicité récompensée n'est pas encore chargée.");
    }
  };


  const passerMot = async () => {
  Alert.alert(
    translate('skipWordConfirmation'),
    translate('skipWordConfirmationMessage'),
    [
      {
        text: translate('payTokens'),
        onPress: async () => {
          if (jetons >= 60) {
            await updateJetons(jetons - 60);
            updateNiveau(niveau + 1);
            setEssaisRestants(maxEssaisParMot);
            setLettresMotEnCours([]);
            setLettresIncorrectes([]);
          } else {
            Alert.alert(
              translate('notEnoughTokensToSkipWord')
            );
          }
        },
      },
      {
        text: translate('watchAd'),
        onPress: regarderPub,
      },
    ],
    { cancelable: true }
  );
};




const verifierLettre = (lettre) => {
  const penalite = 20;
  const lettreEntre = lettre.toUpperCase();

  if (jetons < 40) {

    Alert.alert(
      translate('notEnoughTokens'),
      translate('notEnoughTokensToTryLetter'),
      [
        {
          text: translate('watchAd'),
          onPress: () => {
            regarderPub();
          },
        },
        {
          text: translate('wait'),
        },
      ],
      { cancelable: true }
    );
    return;
  }

  if (motEnCours && motEnCours.toUpperCase().includes(lettreEntre)) {
    if (!lettresMotEnCours.includes(lettreEntre)) {
      setLettresMotEnCours([...lettresMotEnCours, lettreEntre]);
      setLettresCorrectes([...lettresCorrectes, lettreEntre]);

      if (lettresMotEnCours.join('') === motEnCours.toUpperCase()) {
        const jetonsGagnes = 40;
        setTotalJetonsGagnes(totalJetonsGagnes + jetonsGagnes);
        passerAEtapeSuivante();
      }
    }
  } else {
    if (!lettresIncorrectes.includes(lettreEntre)) {
      Vibration.vibrate(500);
      const nouveauxEssaisRestants = essaisRestants - 1;

      if (nouveauxEssaisRestants === 0) {
        // Si le mot est incorrect, retirer 40 jetons
        const penaliteJetons = 40;
        updateJetons(jetons - penaliteJetons);

        Alert.alert(
          translate('incorrectWord'),
          `${translate('theWordWas')}: '${motEnCours}'. ${translate('youLost')}.`
        );

        choisirMotAleatoire();
      } else {
        setEssaisRestants(nouveauxEssaisRestants);
        setLettresIncorrectes([...lettresIncorrectes, lettreEntre]);
      }
    }
  }
};

  
  return selectedCategory ? (
    <View style={containerStyle}>
      {selectedCategory && (
        <Text style={categoryTextStyle}>
          {translate('category')}: {selectedCategory}
        </Text>
      )}
      <View style={jetonsContainerStyle}>
      
        <Text style={soldeTextStyle}>🪙 {jetons + totalJetonsGagnes} {translate('tokens')}</Text>
      </View>
      <View style={styles.bonusMessageContainer}>
        {showBonusMessage && (
          <Animated.Text style={styles.bonusMessage}>+20 jetons (chaque 5 minutes)</Animated.Text>
        )}
      </View>
      <Text style={indiceTextStyle}>Niveau: {niveau}</Text>
          
      {renderMotEnCours()}
      {showCongratulations && (
        <Text style={styles.congratulationsMessage}>{translate('congratulations')}</Text>
      )}
          {showSuper && (
        <Text style={styles.congratulationsMessage}>{translate('super')}</Text>
      )}

      {showLearnt && (
        <Text style={styles.congratulationsMessage}>
          {translate('learntAllSecrets')}
        </Text>
      )}
      
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
          onPress={passerMot}
        >
          <Text style={styles.buttonText}>{translate('skipWord')}</Text>
        </TouchableOpacity>


      </View>
    
    </View>
  ) : (
    <View style={containerStyle}>
      <Text style={soldeTextStyle}>{translate('choose')}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('CATEGORIE')}
        style={styles.chooseCategoryButton}
      >
        <Text style={styles.chooseCategoryButtonText}>{translate('chooseText')}</Text>
      </TouchableOpacity>
    </View>
  );
  
}
