import React, { useState, useEffect } from "react";
import { View, Text, Switch, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContexte";
import { useLanguage } from "../../context/LangageContexte";
import styles from "./style";

export default function SettingScreen() {
  const navigation = useNavigation();
  const { darkMode, setDarkMode, selectedLanguage, changeLanguage, availableLanguages } = useTheme();
  const { translate } = useLanguage();

  useEffect(() => {
    // You can perform any additional logic here when settings change
  }, [darkMode, selectedLanguage]);

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

  return (
    <ScrollView style={containerStyle}>
      <View style={sectionStyle}>
        <Text style={sectionTitleStyle}>{translate("appearance")}</Text>
        <View style={optionStyle}>
          <Text style={optionTextDark}>{translate("darkTheme")}</Text>
          <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
        </View>
      </View>
      <View style={sectionStyle}>
        <Text style={sectionTitleStyle}>{translate("language")}</Text>
        {availableLanguages.map((lang) => (
          <TouchableOpacity
            key={lang}
            style={[
              optionStyle,
              selectedLanguage === lang ? { backgroundColor: darkMode ? "gray" : "white" } : {},
            ]}
            onPress={() => changeLanguage(lang)}
          >
            <Text style={optionTextDark}>{lang === "fr" ? "Français" : "English"}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
