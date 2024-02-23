import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0.02 * windowWidth, 
  },
  section: {
    marginBottom: 0.02 * windowWidth,
    padding: 0.03 * windowWidth, 
    borderRadius: 0.01 * windowWidth,
    backgroundColor: '#F1EBE0',
  },
  sectionTitle: {
    fontSize: 0.05 * windowWidth,
    fontWeight: 'bold',
    marginBottom: 0.02 * windowWidth,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0.03 * windowWidth,
    borderRadius: 0.01 * windowWidth,
    marginBottom: 0.02 * windowWidth,
  },
  optionTextDark: {
    fontSize: 0.04 * windowWidth,
  },






});
export default styles;
