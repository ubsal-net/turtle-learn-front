import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Animated } from "react-native";

const SplashScreen = ({ navigation }) => {
  const [logo, setLogo] = useState(
    require("../../assets/splash/SplashLogo1.png")
  );
  const [message, setMessage] = useState("대충 간단한 한 줄짜리 힘되는 말");
  const logoOpacity = useRef(new Animated.Value(1)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const titleOpacity = useRef(new Animated.Value(1)).current;
  const backgroundColor = useRef(new Animated.Value(0)).current;
  const textColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: 700,
          useNativeDriver: false,
        }),
        Animated.timing(textOpacity, {
          toValue: 0,
          duration: 700,
          useNativeDriver: false,
        }),
        Animated.timing(titleOpacity, {
          toValue: 0,
          duration: 700,
          useNativeDriver: false,
        }),
        Animated.timing(backgroundColor, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(textColor, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setLogo(require("../../assets/splash/SplashLogo2.png"));
        setMessage("대충 바뀐 간단한 한 줄짜리 힘되는 말");

        Animated.parallel([
          Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(titleOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
        ]).start();
      });
    }, 1000);

    setTimeout(() => {
      navigation.replace("Selection");
    }, 4000);
  }, [
    navigation,
    logoOpacity,
    textOpacity,
    titleOpacity,
    backgroundColor,
    textColor,
  ]);

  const bgColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#7D6BB9", "#ffffff"],
  });

  const txtColor = textColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["white", "black"],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>
      <Animated.Image
        source={logo}
        style={[styles.logo, { opacity: logoOpacity }]}
      />
      <Animated.Text
        style={[styles.text, { color: txtColor, opacity: titleOpacity }]}
      >
        터틀런
      </Animated.Text>
      <Animated.Text
        style={[styles.subtitle, { color: txtColor, opacity: textOpacity }]}
      >
        {message}
      </Animated.Text>
    </Animated.View>
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

export default SplashScreen;
