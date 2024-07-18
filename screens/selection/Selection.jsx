import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import ShortBtn from "../../components/buttons/ShortBtn";

const { width, height } = Dimensions.get("window");

const Selection = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.left}
        source={require("../../assets/elementals/left.png")}
      />
      <Image
        style={styles.right}
        source={require("../../assets/elementals/right.png")}
      />
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/splash/SplashLogo2.png")}
          style={styles.logo}
        />
        <Text style={styles.text}>터틀런으로 다양한 학습을 </Text>
        <Text style={styles.text}>쉽고 빠르게!</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <ShortBtn
          title="터틀런이 처음이신가요?"
          onPress={() => navigation.navigate("Onboarding")}
        />
        <ShortBtn
          title="학습하러 가기"
          onPress={() => navigation.navigate("SignIn")}
          icon={require("../../assets/elementals/book.png")}
        />
      </View>
      <Image
        source={require("../../assets/elementals/bottom.png")}
        style={styles.bottomImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: height * 0.1,
    alignItems: "center",
  },
  logo: {
    width: width * 0.45,
    height: height * 0.2,
  },
  text: {
    fontSize: width * 0.045,
    marginTop: height * 0.01,
    marginBottom: height * 0.01,
    textAlign: "center",
    fontFamily: "paybooc-Medium",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: height * 0.15,
  },
  buttonsContainer: {
    marginBottom: height * 0.1,
  },
  bottomImage: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: height * 0.3,
    zIndex: -1,
  },
  left: {
    position: "absolute",
    width: width * 0.3,
    height: height * 0.22,
    top: height * 0.1,
    left: width * 0.05,
    zIndex: -1,
  },
  right: {
    position: "absolute",
    width: width * 0.2,
    height: height * 0.18,
    top: height * 0.4,
    right: 0,
    zIndex: -1,
  },
});

export default Selection;
