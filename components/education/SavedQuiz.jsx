import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SavedQuiz = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>저장 문제</Text>
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

export default SavedQuiz;
