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
import { motsBibliotheque } from "../../../assets/data/mots";

export default function SettingScreen() {

    
  const navigation = useNavigation();
  const { darkMode, setDarkMode } = useTheme();
  const { language, setLanguage, translate } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const availableLanguages = ["fr", "en"]; // Liste des langues disponibles

  const selectedLevelRef = useRef("Facile"); // Référence pour stocker le niveau précédent
  const [selectedLevel, setSelectedLevel] = useState("Facile"); // Niveau par défaut

  const containerStyle = {
    ...styles.container,
    backgroundColor: darkMode ? "#121212" : "#fff",
  };

  const sectionStyle = {
    ...styles.section,
    backgroundColor: darkMode ? "#121212" : "#f3f3f3",
  };

  const sectionTitleStyle = {
    ...styles.sectionTitle,
    color: darkMode ? "#fff" : "black",
  };

  const optionStyle = {
    ...styles.option,
    backgroundColor: darkMode ? "#1c1c1c" : "#f3f3f3",
  };

  const optionTextDark = {
    ...styles.optionTextDark,
    color: darkMode ? "#fff" : "black",
  };

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    setLanguage(language);
   
  };

  return (
    <ScrollView style={containerStyle}>
      <View style={sectionStyle}>
        <Text style={sectionTitleStyle}>{translate("appearance")}</Text>
        <View style={optionStyle}>
          <Text style={optionTextDark}>{translate("darkTheme")}</Text>
          <Switch
            value={darkMode}
            onValueChange={() => setDarkMode(!darkMode)}
          />
        </View>
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
    </ScrollView>
  );
}
