import { StyleSheet, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#ECE3D3",
  },
  darkContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2e2e2d',
  },
  title: {
    fontSize: RFValue(20),
    marginBottom: RFValue(20),
    fontWeight: 'bold',
  },
  darkTitle: {
    fontSize: RFValue(20),
    marginBottom: RFValue(20),
    fontWeight: 'bold',
    color: 'white',
  },
  categoryButton: {
    width: windowWidth * 0.45,
    aspectRatio: 1,
    margin: RFValue(5),
    borderRadius: RFValue(30),
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkImageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: 'white',
  },
  lockedCategory: {
    opacity: 0.5,
  },
  lockedImage: {
    width: RFValue(50),
    height: RFValue(50),
    resizeMode: 'contain',
    marginLeft: RFValue(40),
  },
  lockedText: {
    color: 'white',
  },
  darkLockedText: {
    color: 'white',
  }
});

export default styles;
