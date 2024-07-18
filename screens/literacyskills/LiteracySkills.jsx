import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BasicLearning from "../../components/education/BasicLearning";
import RandomLearning from "../../components/education/RandomLearning";
import SavedQuiz from "../../components/education/SavedQuiz";
import Header from "../../components/header/Header";
import { Image, View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { handleSessionExpired } from "../../utils/reject";

const { width, height } = Dimensions.get("window");
const Tab = createBottomTabNavigator();

const LiteracySkills = ({ route }) => {
  const { title, categoryId } = route.params;
  const sessionExpired = handleSessionExpired();

  useEffect(() => {
    sessionExpired();
  }, []);

  return (
    <>
      <Header title={title} />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "transparent",
            height: height * 0.1,
          },
          tabBarBackground: () => (
            <View style={styles.gradientContainer}>
              <LinearGradient
                colors={["#7D6BB9", "#7276CC", "#798BE0"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              />
            </View>
          ),
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#aaa",
          tabBarLabelStyle: { fontSize: 12 },
        }}
      >
        <Tab.Screen
          name="기초 학습"
          children={() => <BasicLearning categoryId={categoryId} />}
          options={{
            tabBarLabel: "기초 학습",
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../assets/elementals/tab1.png")}
                  style={[
                    styles.icon1,
                    { tintColor: focused ? "#fff" : "#aaa" },
                  ]}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="랜덤 학습"
          children={() => <RandomLearning categoryId={categoryId} />}
          options={{
            tabBarLabel: "랜덤 학습",
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../assets/elementals/tab2.png")}
                  style={[
                    styles.icon2,
                    { tintColor: focused ? "#fff" : "#aaa" },
                  ]}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="저장 문제"
          children={() => <SavedQuiz categoryId={categoryId} />}
          options={{
            tabBarLabel: "저장 문제",
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../assets/elementals/tab3.png")}
                  style={[
                    styles.icon3,
                    { tintColor: focused ? "#fff" : "#aaa" },
                  ]}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginTop: height * 0.01,
    alignItems: "center",
    justifyContent: "center",
  },
  icon1: {
    width: width * 0.1,
    height: height * 0.02,
  },
  icon2: {
    width: width * 0.065,
    height: height * 0.035,
  },
  icon3: {
    width: width * 0.08,
    height: height * 0.035,
  },
  gradientContainer: {
    position: "absolute",
    width,
    height: "100%",
  },
  gradient: {
    flex: 1,
  },
});

export default LiteracySkills;
