import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Selection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ㅎㅇ염 ㅎㅎ</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 170,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
  },
});

export default Selection;
