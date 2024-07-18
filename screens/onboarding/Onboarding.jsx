import React, { useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import Swiper from "react-native-swiper";
import Onboarding1 from "../../components/onboarding/Onboarding1";
import Onboarding2 from "../../components/onboarding/Onboarding2";
import Onboarding3 from "../../components/onboarding/Onboarding3";
import Onboarding4 from "../../components/onboarding/Onboarding4";
import LongBtn from "../../components/buttons/LongBtn";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = ({ navigation }) => {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < 3) {
      swiperRef.current.scrollBy(1);
    } else {
      navigation.navigate("Selection");
    }
  };

  const handleIndexChanged = (index) => {
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.left}
        source={require("../../assets/elementals/left.png")}
      />
      <Image
        style={styles.right}
        source={require("../../assets/elementals/right.png")}
      />
      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={true}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        paginationStyle={styles.pagination}
        onIndexChanged={handleIndexChanged}
        style={{ zIndex: 99 }}
      >
        <View style={styles.slide}>
          <Onboarding1 />
        </View>
        <View style={styles.slide}>
          <Onboarding2 />
        </View>
        <View style={styles.slide}>
          <Onboarding3 />
        </View>
        <View style={styles.slide}>
          <Onboarding4 />
        </View>
      </Swiper>
      <View style={styles.bottomBtn}>
        <LongBtn
          title={currentIndex === 3 ? "시작하기" : "다음으로"}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    zIndex: 99,
  },
  pagination: {
    bottom: height * 0.15,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 12,
    marginHorizontal: 3,
    borderWidth: 1.5,
    backgroundColor: "white",
  },
  activeDot: {
    backgroundColor: "#7D6BB9",
    width: 15,
    height: 15,
    borderRadius: 12,
    marginHorizontal: 3,
  },
  bottomBtn: {
    position: "absolute",
    bottom: height * 0.05,
    width: width,
    alignItems: "center",
  },
  left: {
    position: "absolute",
    width: width * 0.3,
    height: height * 0.22,
    top: height * 0.1,
    left: width * 0.05,
    zIndex: 1,
  },
  right: {
    position: "absolute",
    width: width * 0.2,
    height: height * 0.18,
    top: height * 0.4,
    right: 0,
    zIndex: 1,
  },
});

export default OnboardingScreen;
