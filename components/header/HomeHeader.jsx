import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const HomeHeader = ({ toggleSidebar }) => {
  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/logo/mainlogo1.png")}
        style={styles.logo}
      />
      <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
        <Ionicons name="menu" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: height * 0.13,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: height * 0.05,
    backgroundColor: "white",
  },
  logo: {
    width: width * 0.25,
    height: height * 0.05,
    marginLeft: width * 0.04,
  },
  menuButton: {
    padding: 10,
  },
});

export default HomeHeader;
