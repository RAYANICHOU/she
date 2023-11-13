import React from "react";
import styles from "./style";
import { View, Text, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { motsBibliotheque } from '../../../assets/data/mots';
import { useTheme } from '../../context/ThemeContexte';
import { useLanguage } from '../../context/LangageContexte';
import i18n from '../../components/i18n';



const categoryImages = {
  Animaux: require ('../../../assets/categorie/animal.jpg'),
  Nourriture: require ('../../../assets/categorie/nourriture.jpg'),
  Sport: require('../../../assets/categorie/sport.jpg'),
  Objets: require('../../../assets/categorie/objets.jpg'),
  Véhicules: require('../../../assets/categorie/vehicule.jpg'),
  Métiers: require('../../../assets/categorie/metier.jpg'),
  Pays: require('../../../assets/categorie/pays.jpg'),
  Paysages: require('../../../assets/categorie/paysage.jpg'),
  Couleurs: require('../../../assets/categorie/couleur.jpg'),
  Anatomie: require('../../../assets/categorie/anatomie.jpg'),

};


export default function CategoryScreen() {

  const { darkMode } = useTheme();
  const navigation = useNavigation();
  const {translate} =useLanguage();
  const categories = Array.from(new Set(motsBibliotheque.map((mot) => mot.catégorie)));
  

  const handleCategorySelection = (category) => {
    
    navigation.navigate('JEU', { category });
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryButton}
      onPress={() => handleCategorySelection(item)}
    >
     <ImageBackground
        source={categoryImages[item]}
        style={imageBackgroundStyle} // Utilisation du style conditionnel
      >
        <Text style={styles.categoryText}>{item}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );


  const containerStyle = darkMode ? styles.darkContainer : styles.container;
  const titleStyle = darkMode ? styles.darkTitle : styles.title;
  const imageBackgroundStyle = darkMode ? styles.darkImageBackground: styles.imageBackground;

 
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


