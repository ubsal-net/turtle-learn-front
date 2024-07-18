import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const Onboarding1 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.firstContainer}>
        <View style={styles.firstTitle}>
          <Text style={styles.title}>터틀런이 뭔가요?</Text>
        </View>
        <Text style={styles.subtitle}>
          경계선 지능인의 소통 및 자립 능력을 {"\n"}키우기 위한 교육융 어플로,
          반복적인 {"\n"}교육과 훈련 프로그램을 제공합니다.
        </Text>
      </View>
      <View style={styles.secondContainer}>
        <View style={styles.secondTitle}>
          <Text style={styles.title}>어떻게 학습을 하나요?</Text>
        </View>
        <Text style={styles.subtitle}>
          성인지 학습, 일상 대화 연습,{"\n"} 문해력 향상, 진로탐색 등 4지선다형
          문제로{"\n"} 학습하고 AI 페르소나와 대화하며 피드백을{"\n"} 받을 수
          있습니다.
        </Text>
      </View>
      <View style={styles.thirdContainer}>
        <Text style={styles.subtitle}>터틀런으로 즐겁게 학습하기 GOGO!!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  firstContainer: {
    position: "absolute",
    top: height * 0.3,
    alignItems: "center",
  },
  secondContainer: {
    position: "absolute",
    top: height * 0.48,
    alignItems: "center",
  },
  thirdContainer: {
    position: "absolute",
    top: height * 0.7,
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: width * 0.05,
    fontFamily: "paybooc-Bold",
    color: "white",
  },
  firstTitle: {
    backgroundColor: "#7D6BB9",
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.06,
    width: width * 0.45,
    borderRadius: 12,
    marginBottom: height * 0.015,
  },
  secondTitle: {
    backgroundColor: "#7D6BB9",
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.06,
    width: width * 0.57,
    borderRadius: 12,
    marginBottom: height * 0.015,
  },
  titleContainer: {
    position: "absolute",
    top: height * 0.7,
    width: width * 0.8,
    alignItems: "center",
  },
  subtitle: {
    fontSize: width * 0.04,
    textAlign: "center",
    fontFamily: "paybooc-Medium",
  },
});

export default Onboarding1;
