import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const VeryShortBtn = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#7D6BB9",
    borderRadius: 8,
    width: width * 0.225,
    alignItems: "center",
    padding: 12.5,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "paybooc-Bold",
  },
});

export default VeryShortBtn;
