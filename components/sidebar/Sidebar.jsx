import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import VeryShortBtn from "../../components/buttons/VeryShortBtn";
import { handleLogout } from "../../utils/reject";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState, userState } from "../../recoil/atoms/authState";
import { fetchProfile } from "../../api/index";

const { width, height } = Dimensions.get("window");

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const translateX = useSharedValue(width);
  const overlayOpacity = useSharedValue(0);
  const logout = handleLogout();
  const auth = useRecoilValue(authState);
  const setUser = useSetRecoilState(userState);
  const [accuracy, setAccuracy] = useState(0);
  const [submissionCount, setSubmissionCount] = useState(0);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetchProfile(auth.accessToken);
        const { name, age, sex, answerAccuracy, submissionCount } =
          response.data;
        setAccuracy(answerAccuracy.toFixed(1));
        setSubmissionCount(submissionCount);

        setUser({
          name,
          age,
          sex,
          answerAccuracy,
          submissionCount,
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (isOpen) {
      getProfile();
    }
  }, [isOpen, auth.accessToken, setUser]);

  useEffect(() => {
    translateX.value = isOpen ? withTiming(0) : withTiming(width);
    overlayOpacity.value = isOpen ? withTiming(0.5) : withTiming(0);
  }, [isOpen]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayOpacity.value,
    };
  });

  const onGestureEvent = (event) => {
    if (event.nativeEvent.translationX > 0) {
      translateX.value = withSpring(event.nativeEvent.translationX);
    }
  };

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationX > width * 0.25) {
        toggleSidebar();
      } else {
        translateX.value = withSpring(0);
      }
    }
  };

  return (
    <>
      {isOpen && (
        <Animated.View style={[styles.overlay, overlayStyle]}>
          <TouchableOpacity
            style={styles.overlayPressable}
            onPress={toggleSidebar}
          />
        </Animated.View>
      )}
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={[styles.sidebar, animatedStyle]}>
          <View style={styles.profileContainer}>
            <Image
              source={require("../../assets/elementals/profile.png")}
              style={styles.logo3}
            />
            <Text style={styles.profileText}>
              <Text style={styles.colorContainer}>{auth.name} 님</Text>
              {"\n"}반갑습니다.
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statsContainer}>
            <View style={styles.statsItem}>
              <Image
                source={require("../../assets/elementals/totalquiz.png")}
                style={styles.logo2}
              />
              <Text style={styles.statsText}>총 학습 문제</Text>
              <Text style={styles.statsValue}>{submissionCount}문제</Text>
            </View>
            <View style={styles.statsItem}>
              <Image
                source={require("../../assets/elementals/accuracy.png")}
                style={styles.logo2}
              />
              <Text style={styles.statsText}>정확도</Text>
              <Text style={styles.statsValue}>{accuracy}%</Text>
            </View>
          </View>
          <View style={styles.divider2} />
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logo/mainlogo2.png")}
              style={styles.logo}
            />
            <Text style={styles.logoSubText}>
              터틀런으로 다양한 학습을{"\n"}{" "}
              <Text style={styles.colorContainer}>쉽고 빠르게!</Text>
            </Text>
          </View>
          <View style={styles.logoutContainer}>
            <VeryShortBtn title="로그아웃" onPress={logout} />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    width: width * 0.7,
    height: height,
    backgroundColor: "white",
    zIndex: 100,
    right: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    padding: 40,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.065,
    marginBottom: 20,
  },
  profileText: {
    marginLeft: 10,
    fontSize: 18,
    color: "#000",
    fontFamily: "paybooc-Bold",
  },
  divider: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  divider2: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  statsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  statsItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  statsText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#000",
    fontFamily: "paybooc-Medium",
  },
  statsValue: {
    marginLeft: "auto",
    fontSize: 20,
    color: "#000",
    fontFamily: "paybooc-Bold",
    backgroundColor: "#DBD3EA",
  },
  highlightContainer: {
    backgroundColor: "rgba(125, 107, 185, 0.3)",
    borderRadius: 4,
    paddingHorizontal: 4,
    marginLeft: 10,
  },
  highlightedText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    width: width * 0.4,
    height: height * 0.15,
    resizeMode: "contain",
  },
  logo2: {
    resizeMode: "contain",
    width: width * 0.1,
    height: height * 0.05,
  },
  logo3: {
    resizeMode: "contain",
    width: width * 0.2,
    height: height * 0.1,
  },
  logoSubText: {
    fontSize: 16,
    color: "#666",
    marginTop: height * 0.02,
    textAlign: "center",
    fontFamily: "paybooc-Medium",
  },
  logoutContainer: {
    marginTop: height * 0.05,
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: "black",
    zIndex: 99,
  },
  overlayPressable: {
    width: "100%",
    height: "100%",
  },
  colorContainer: {
    backgroundColor: "#DBD3EA",
  },
});

export default Sidebar;
