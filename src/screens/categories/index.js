import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, FlatList,Image, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { motsBibliotheque } from '../../../assets/data/mots';
import { useTheme } from '../../context/ThemeContexte';
import { useLanguage } from '../../context/LangageContexte';
import styles from './style';
import { useGame } from '../../context/GameContexte';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';



const categoryImages = {
  nouchi: require('../../../assets/categorie/nouchi.jpg'),
  CAN: require('../../../assets/categorie/logocan.jpeg'),
  Objets: require('../../../assets/categorie/objets.jpg'),
  Animaux: require('../../../assets/categorie/animal.jpg'),
  Nourriture: require('../../../assets/categorie/nourriture.jpg'),
  Sport: require('../../../assets/categorie/sport.jpg'),
  Véhicules: require('../../../assets/categorie/vehicule.jpg'),
  Pays: require('../../../assets/categorie/pays.jpg'),
  Métiers: require('../../../assets/categorie/metier.jpg'),
  Paysage: require('../../../assets/categorie/paysage.jpg'),
  Couleurs: require('../../../assets/categorie/couleur.jpg'),
  Anatomie: require('../../../assets/categorie/anatomie.jpg'),
  
};

const categoryConditions = {
  nouchi: {sommeRequise: 0, niveauRequis: 1},
  CAN: {sommeRequise: 0, niveauRequis: 1},
  Objets: { sommeRequise: 0, niveauRequis: 1},
  Anatomie: { sommeRequise: 200, niveauRequis: 150 },
  Animaux: { sommeRequise: 500, niveauRequis: 328 },
  Nourriture: { sommeRequise: 1000, niveauRequis: 450 },
  Sport: { sommeRequise: 2000, niveauRequis: 636 },
  Couleurs: { sommeRequise: 2500, niveauRequis: 1000 },
  Pays: { sommeRequise: 3500, niveauRequis: 1150 },
  Métiers: { sommeRequise: 5000, niveauRequis: 1400 },
  Paysage: { sommeRequise: 10000, niveauRequis: 1550 },
  Véhicules: { sommeRequise: 1200, niveauRequis: 1700 },
};

export default function CategoryScreen() {
  const { darkMode } = useTheme();
  const navigation = useNavigation();
  const { translate } = useLanguage();
  const { jetons, niveau, payerPourDebloquer } = useGame();
  const categories = Array.from(new Set(motsBibliotheque.map((mot) => mot.catégorie)));

  const [categoriesDebloquees, setCategoriesDebloquees] = useState([]);

  useEffect(() => {
    const loadCategoriesFromStorage = async () => {
      try {
        const savedCategories = await AsyncStorage.getItem('categoriesState');
        if (savedCategories) {
          setCategoriesDebloquees(JSON.parse(savedCategories));
        }
      } catch (error) {
        console.error('Error loading categories from AsyncStorage', error);
      }
    };

    loadCategoriesFromStorage();
  }, []);


  useEffect(() => {
    const saveCategoriesToStorage = async () => {
      try {
        await AsyncStorage.setItem('categoriesState', JSON.stringify(categoriesDebloquees));
      } catch (error) {
        console.error('Error saving categories to AsyncStorage', error);
      }
    };

    saveCategoriesToStorage();
  }, [categoriesDebloquees]);





const isCategoryLocked = (category) => {
  const niveauRequis = categoryConditions[category]?.niveauRequis;

  return niveauRequis !== undefined && niveau < niveauRequis;
};

  


const handleCategorySelection = async (category) => {
  if (categoriesDebloquees.includes(category)) {
    navigation.navigate('JEU', { category, categoriesDebloquees });
  } else {
    const sommeRequise = categoryConditions[category].sommeRequise;
    const niveauRequis = categoryConditions[category].niveauRequis;

    if (category === 'Objets' || category === 'CAN' ) {
      setCategoriesDebloquees((prevCategories) => [...prevCategories, category]);
      navigation.navigate('JEU', { category, categoriesDebloquees });
    } else {
      if (niveau >= niveauRequis) {
        if (sommeRequise === 0 || (sommeRequise > 0 && jetons >= sommeRequise)) {
          const confirmationPaiement = await new Promise((resolve) => {
            Alert.alert(
              "Vous devez payer pour débloquer",
              `Somme requise : ${sommeRequise} jetons`,
              [
                {
                  text: 'Non',
                  style: 'cancel',
                },
                {
                  text: 'Oui',
                  onPress: () => resolve(true),
                },
              ],
              { cancelable: false }
            );
          });

          if (confirmationPaiement) {
            // Logique pour le paiement et le déblocage de la catégorie
            const deblocageReussi = payerPourDebloquer(sommeRequise);

            if (deblocageReussi) {
              setCategoriesDebloquees((prevCategories) => [...prevCategories, category]);

              navigation.navigate('JEU', { category, categoriesDebloquees });
            } else {
              Alert.alert(
                translate('notEnoughTokens'),
                translate('notEnoughTokensToUnlockCategory')
              );
            }
          } else {
            // L'utilisateur a annulé le paiement
            Alert.alert('Déblocage annulé');
          }
        } else {
          // Le solde est insuffisant pour débloquer la catégorie
          Alert.alert(
            'Solde insuffisant',
            `Vous n'avez pas la somme requise de ${sommeRequise} jetons pour débloquer cette catégorie.`
          );
        }
      } else {
        // Le niveau est trop bas
        Alert.alert(
          translate('categoryLocked'),
          translate('unlockCondition')
        );
      }
    }
  }
};





  
const renderItem = ({ item }) => {

  const isLocked = isCategoryLocked(item);
  const categoryTextStyle = isLocked ? lockedTextStyle : styles.categoryText;

  return (
    <TouchableOpacity
      style={[styles.categoryButton, (isLocked || ['Couleurs','Véhicules', 'Paysage', 'Métiers', 'Pays'].includes(item)) && styles.lockedCategory]}
      onPress={() => !['Couleurs','Véhicules', 'Paysage', 'Métiers', 'Pays'].includes(item) && handleCategorySelection(item)}
      disabled={['Couleurs','Véhicules', 'Paysage', 'Métiers', 'Pays'].includes(item)}
    >
      <ImageBackground
        source={categoryImages[item]}
        style={styles.imageBackground}
      >
        <View>
          {isLocked && (
            <View style={styles.lockedOverlay}>
              <Image
                source={require('../../../assets/categorie/cadenas.png')}
                style={styles.lockedImage}
              />
              <Text style={lockedTextStyle}>
                {['Couleurs','Véhicules', 'Paysage', 'Métiers', 'Pays'].includes(item)
                  ? 'Bientôt disponible'
                  : `Niveau requis: ${categoryConditions[item]?.niveauRequis || 'Non spécifié'}`
                }
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.categoryText}>{item}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};



  

  const containerStyle = darkMode ? styles.darkContainer : styles.container;
  const titleStyle = darkMode ? styles.darkTitle : styles.title;
  const lockedTextStyle = darkMode ? styles.darkLockedText : styles.lockedText;

  return (
    <View style={containerStyle}>
       <BannerAd
        unitId="ca-app-pub-9840961515933669/6649867933"
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }}
      />
      <Text style={titleStyle}>{translate('select')}</Text>
      <FlatList
        data={categories}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </View>
  );
}