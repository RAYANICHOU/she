import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, FlatList,Image, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { motsBibliotheque } from '../../../assets/data/mots';
import { useTheme } from '../../context/ThemeContexte';
import { useLanguage } from '../../context/LangageContexte';
import styles from './style';
import { useGame } from '../../context/GameContexte';
import AsyncStorage from '@react-native-async-storage/async-storage';


const categoryImages = {
  Animaux: require('../../../assets/categorie/animal.jpg'),
  Nourriture: require('../../../assets/categorie/nourriture.jpg'),
  Sport: require('../../../assets/categorie/sport.jpg'),
  Objets: require('../../../assets/categorie/objets.jpg'),
  Véhicules: require('../../../assets/categorie/vehicule.jpg'),
  Métiers: require('../../../assets/categorie/metier.jpg'),
  Pays: require('../../../assets/categorie/pays.jpg'),
  Paysages: require('../../../assets/categorie/paysage.jpg'),
  Couleurs: require('../../../assets/categorie/couleur.jpg'),
  Anatomie: require('../../../assets/categorie/anatomie.jpg'),
};

const categoryConditions = {
  Animaux: { sommeRequise: 0, niveauRequis: 1 }, // Débloqué par défaut
  Nourriture: { sommeRequise: 0, niveauRequis: 1 }, // Débloqué par défaut
  Sport: { sommeRequise: 50, niveauRequis: 2 },
  Objets: { sommeRequise: 50, niveauRequis: 2 },
  Véhicules: { sommeRequise: 100, niveauRequis: 3 },
  Métiers: { sommeRequise: 100, niveauRequis: 3 },
  Pays: { sommeRequise: 150, niveauRequis: 4 },
  Paysages: { sommeRequise: 150, niveauRequis: 4 },
  Couleurs: { sommeRequise: 200, niveauRequis: 5 },
  Anatomie: { sommeRequise: 200, niveauRequis: 5 },
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
        } else {
          // Si aucune catégorie n'est enregistrée, initialisez avec les catégories par défaut
          setCategoriesDebloquees(['Animaux', 'Nourriture']);
        }
      } catch (error) {
        console.error('Error loading categories from AsyncStorage', error);
      }
    };

    loadCategoriesFromStorage();
  }, []);

  // Save categories to AsyncStorage whenever it changes
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
    // Vérifier si la catégorie est dans la liste des catégories débloquées
    const isUnlocked = categoriesDebloquees.includes(category);
  
    // Si la catégorie est débloquée, retourner false (non bloquée)
    if (isUnlocked) {
      return false;
    }
  
    // Accéder à la condition spécifique de la catégorie
    const condition = categoryConditions[category];

    // Vérifier les conditions normales de blocage
    return condition && (jetons < condition.sommeRequise || niveau < condition.niveauRequis);
  };
  
  


  const handleCategorySelection = async (category) => {
    const condition = categoryConditions[category];
    const sommeRequise = condition ? condition.sommeRequise : 0;

  
    if (
      (condition && jetons >= condition.sommeRequise && niveau >= condition.niveauRequis) ||
      categoriesDebloquees.includes(category)  // Vérifier si la catégorie est déjà débloquée
    ) {
      if (!categoriesDebloquees.includes(category)) {
        // La catégorie n'est pas encore débloquée, demander la confirmation de paiement
        const confirmationPaiement = await new Promise((resolve) => {
          Alert.alert(
            "Vous devez payer pour débloquer",
            `Somme requise : ${sommeRequise}`,
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
          const deblocageReussi = payerPourDebloquer(condition.sommeRequise);
  
          if (deblocageReussi) {
            // Mettre à jour le suivi des catégories débloquées
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
        // La catégorie est déjà débloquée, naviguer directement vers le jeu
        navigation.navigate('JEU', {category, categoriesDebloquees });
      }
    } else {
      Alert.alert(
        translate('categoryLocked'),
        translate('unlockCondition')
      );
    }
  };
  

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryButton, isCategoryLocked(item) && styles.lockedCategory]}
      onPress={() => handleCategorySelection(item)}
    >
      <ImageBackground
        source={categoryImages[item]}
        style={styles.imageBackground}
      >
        {isCategoryLocked(item) && (
          <View style={styles.lockedOverlay}>
            <Image
              source={require('../../../assets/categorie/cadenas.png')}
              style={styles.lockedImage}
            />
          </View>
        )}
        <Text style={styles.categoryText}>{item}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
  
  

  const containerStyle = darkMode ? styles.darkContainer : styles.container;
  const titleStyle = darkMode ? styles.darkTitle : styles.title;

  return (
    <View style={containerStyle}>
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
