import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import HomeHeader from "../../components/header/HomeHeader";
import Sidebar from "../../components/sidebar/Sidebar";
import HelpBtn from "../../components/buttons/HelpBtn";
import { handleSessionExpired } from "../../utils/reject";

const { width, height } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sessionExpired = handleSessionExpired();

  useEffect(() => {
    sessionExpired();
  }, []);

  return (
    <View style={styles.container}>
      <HomeHeader toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Text style={styles.mainTitle}>학습 유형</Text>
      <HelpBtn />
      <View style={styles.cardContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("YouthGenderAwareness", {
                title: "청소년 성인지",
                categoryId: 1,
              })
            }
          >
            <Text style={styles.cardTitle}>청소년 성인지</Text>
            <View style={styles.subTitleContainer}>
              <Text style={styles.cardSubtitle}>
                소중한 나의 몸에{"\n"} 대해 학습해요!
              </Text>
            </View>
            <Image
              source={require("../../assets/home/first.jpg")}
              style={styles.cardImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("ReadingSpeaking", {
                title: "읽기 & 말하기",
                categoryId: 2,
              })
            }
          >
            <Text style={styles.cardTitle}>읽기 & 말하기</Text>
            <View style={styles.subTitleContainer}>
              <Text style={styles.cardSubtitle}>
                일상 생활에서의 필요한 {"\n"}대화법 학습을 해요!
              </Text>
            </View>
            <Image
              source={require("../../assets/home/second.png")}
              style={styles.cardImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("LiteracySkills", {
                title: "문해력 탄탄",
                categoryId: 3,
              })
            }
          >
            <Text style={styles.cardTitle}>문해력 탄탄</Text>
            <View style={styles.subTitleContainer}>
              <Text style={styles.cardSubtitle}>
                문해 과정 기본기를{"\n"} 학습해요!
              </Text>
            </View>
            <Image
              source={require("../../assets/home/third.png")}
              style={styles.cardImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("CareerExploration", {
                title: "진로 탐색",
                categoryId: 4,
              })
            }
          >
            <Text style={styles.cardTitle}>진로 탐색</Text>
            <View style={styles.subTitleContainer}>
              <Text style={styles.cardSubtitle}>
                자신을 좀 더 알아가는{"\n"} 시간을 가져봐요!
              </Text>
            </View>
            <Image
              source={require("../../assets/home/fourth.jpg")}
              style={styles.cardImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
    fontFamily: "paybooc-Bold",
    marginTop: height * 0.03,
  },
  cardContainer: {
    flex: 1,
    width: width * 0.9,
    marginTop: height * 0.02,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    width: width * 0.42,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#222222",
    fontFamily: "paybooc-Bold",
  },
  cardImage: {
    width: "100%",
    height: width * 0.42,
    resizeMode: "contain",
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#222222",
    textAlign: "center",
    fontFamily: "paybooc-Medium",
  },
  subTitleContainer: {
    width: width * 0.35,
    height: height * 0.055,
    backgroundColor: "rgba(125, 107, 185, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});

export default Home;
