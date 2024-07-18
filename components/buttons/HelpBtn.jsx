import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const HelpBtn = () => {
  return (
    <TouchableOpacity style={styles.helpButton}>
      <Text style={styles.helpButtonText}>?</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  helpButton: {
    position: "absolute",
    top: height * 0.16,
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#6651AB",
  },
  helpButtonText: {
    color: "#7D6BB9",
    fontSize: 18,
  },
});

export default HelpBtn;
