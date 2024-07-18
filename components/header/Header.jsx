import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Sidebar from "../sidebar/Sidebar";

const { width, height } = Dimensions.get("window");

const Header = ({ title, backTo }) => {
  const navigation = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleBackPress = () => {
    if (backTo) {
      navigation.navigate(backTo);
    } else {
      navigation.goBack();
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity onPress={toggleSidebar} style={styles.menuButton}>
          <Icon name="menu" size={28} color="#000" />
        </TouchableOpacity>
      </View>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    paddingHorizontal: 10,
    paddingTop: height * 0.045,
    marginTop: height * 0.02,
    backgroundColor: "white",
  },
  backButton: {
    position: "absolute",
    left: 10,
    justifyContent: "flex-start",
    padding: 10,
    paddingTop: height * 0.055,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "paybooc-Bold",
    textAlign: "center",
  },
  menuButton: {
    position: "absolute",
    right: 10,
    justifyContent: "flex-end",
    padding: 10,
    paddingTop: height * 0.055,
  },
});

export default Header;
