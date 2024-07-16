import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const LongBtn = ({ title, onPress, icon }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.buttonContent}>
        <Text style={styles.buttonText}>{title}</Text>
        {icon && <Image source={icon} style={styles.icon} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#7D6BB9",
    paddingVertical: width * 0.03,
    paddingHorizontal: width * 0.05,
    marginVertical: width * 0.02,
    width: width * 0.89,
    maxWidth: 380,
    borderWidth: 2,
    borderColor: "#6651AB",
    borderRadius: 12,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: width * 0.04,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "paybooc-Bold",
  },
  icon: {
    width: width * 0.05,
    height: width * 0.05,
    marginLeft: width * 0.02,
  },
});

export default LongBtn;
