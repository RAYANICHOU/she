import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContexte";
import { useLanguage } from "../../context/LangageContexte";
import styles from "./style";
import { Linking } from "react-native";
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';




export default function SettingScreen() {

    
  const navigation = useNavigation();
  const { darkMode, setDarkMode } = useTheme();
  const { language, setLanguage, translate } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const availableLanguages = ["fr", "en"]; // Liste des langues disponibles
  useEffect(() => {
    // Au rendu initial, le thème sur sombre
    setDarkMode(true);
  }, []);


  
  const containerStyle = {
    ...styles.container,
    backgroundColor: darkMode ? "#121212" : "#ECE3D3",
  };

  const sectionStyle = {
    ...styles.section,
    backgroundColor: darkMode ? "#121212" : "#F1EBE0",
  };

  const sectionTitleStyle = {
    ...styles.sectionTitle,
    color: darkMode ? "#fff" : "black",
  };

  const optionStyle = {
    ...styles.option,
    backgroundColor: darkMode ? "#1c1c1c" : "#F1EBE0",
  };


  const optionTextDark = {
    ...styles.optionTextDark,
    color: darkMode ? "#fff" : "black",
  };


  const setThemeDark = () => {
    setDarkMode(true);
  };
 

  const setThemeLight = () => {
    setDarkMode(false);
  };

  const selectedOptionStyle = {
    backgroundColor: darkMode ? "gray" : "white",
  };

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    setLanguage(language);
  };


  
  const openWebPage = () => {

    const url = "https://leaclassique.nicepage.io/CONTACT.html";

    Linking.openURL(url).catch((err) =>
      console.error("Impossible d'ouvrir l'URL", err)
    );
  };

  return (
    <ScrollView style={containerStyle}>
      <View style={sectionStyle}>
        <Text style={sectionTitleStyle}>{translate("appearance")}</Text>
        <TouchableOpacity
          style={[optionStyle, !darkMode ? selectedOptionStyle : {}]}
          onPress={setThemeLight}
        >
          <Text style={optionTextDark}>{translate("lightTheme")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[optionStyle, darkMode ? selectedOptionStyle : {}]}
          onPress={setThemeDark}
        >
          <Text style={optionTextDark}>{translate("darkTheme")}</Text>
        </TouchableOpacity>
        
      </View>
      <View style={sectionStyle}>
        <Text style={sectionTitleStyle}>{translate("language")}</Text>
        {availableLanguages.map((lang) => (
          <TouchableOpacity
            key={lang}
            style={[
              optionStyle,
              selectedLanguage === lang
                ? { backgroundColor: darkMode ? "gray" : "white" }
                : {},
            ]}
            onPress={() => changeLanguage(lang)}
          >
            <Text style={optionTextDark}>
              {lang === "fr" ? "Français" : "English"}
            </Text>
          </TouchableOpacity>
        
        ))}
      </View>
      <View style={sectionStyle}>
  <TouchableOpacity onPress={openWebPage} style={optionStyle}>
    <Text style={optionTextDark}>{translate('ameliorate')}</Text>
  </TouchableOpacity>

  <BannerAd
        unitId="ca-app-pub-9840961515933669/6649867933"
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true
        }}
      />
</View>


    </ScrollView>
  );
}