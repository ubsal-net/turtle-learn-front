import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

const { width, height } = Dimensions.get("window");

const Onboarding2 = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/onboarding/onboarding1.png")}
        style={styles.logo}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.subtitle}>
          학습유형으로는 {"\n"}청소년 성인지, 읽기 & 말하기 , {"\n"}문해력 탄탄,
          진로 탐색이 있어요.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  titleContainer: {
    position: "absolute",
    top: height * 0.7,
    width: width * 0.8,
    alignItems: "center",
  },
  subtitle: {
    fontSize: width * 0.04,
    textAlign: "center",
    fontFamily: "paybooc-Medium",
  },
  logo: {
    position: "absolute",
    width: width * 0.6,
    height: height * 0.45,
    top: height * 0.22,
    zIndex: 99,
  },
});

export default Onboarding2;
