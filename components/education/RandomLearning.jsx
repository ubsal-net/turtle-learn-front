import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RandomLearning = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>랜덤 학습</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 25,
    fontFamily: "paybooc-Bold",
  },
});

export default RandomLearning;
