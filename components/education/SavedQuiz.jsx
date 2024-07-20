import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { fetchRandomQuestion } from "../../api/index";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atoms/authState";

const { width, height } = Dimensions.get("window");

const SavedQuiz = ({ title }) => {
  const auth = useRecoilValue(authState);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await fetchRandomQuestion(auth.accessToken);
        setQuestions(response.data || []);
        console.log(title);
        console.log(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    getQuestions();
  }, [auth.accessToken]);

  const handleCardPress = (questionId) => {
    console.log("Question ID:", questionId);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>저장 문제</Text>
      <Text style={styles.subTitle}>
        랜덤 학습에서 학습한 문제들이 저장됩니다!
      </Text>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.grid}>
          {questions.map((question, index) => (
            <TouchableOpacity
              key={question.id}
              style={styles.cardContainer}
              onPress={() => handleCardPress(question.id)}
            >
              <View style={styles.card}>
                <Text style={styles.number}>{(index % 20) + 1}</Text>
              </View>
              <Image
                source={
                  question.selections[0].answer
                    ? require("../../assets/elementals/star2.png")
                    : require("../../assets/elementals/star1.png")
                }
                style={styles.statusIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: width * 0.05,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(125, 107, 185, 0.3)",
    padding: width * 0.05,
    borderRadius: 8,
  },
  title: {
    fontSize: width * 0.045,
    fontFamily: "paybooc-Bold",
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  subTitle: {
    fontSize: width * 0.035,
    marginBottom: height * 0.02,
    fontFamily: "paybooc-Medium",
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContainer: {
    width: "22%",
    alignItems: "center",
    marginVertical: height * 0.006,
  },
  card: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  number: {
    fontSize: width * 0.06,
    fontFamily: "paybooc-Bold",
  },
  statusIcon: {
    width: width * 0.055,
    height: height * 0.025,
    marginTop: 5,
  },
});

export default SavedQuiz;
