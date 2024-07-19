import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { fetchRandomQuestion } from "../../api/ai";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atoms/authState";
import { fetchRandomQuestionSubmit } from "../../api/index";

const { width, height } = Dimensions.get("window");

const RandomLearning = ({ categoryId }) => {
  const [randomQuestion, setRandomQuestion] = useState({
    question: "",
    selections: [],
  });
  const auth = useRecoilValue(authState);

  useEffect(() => {
    const getQuestion = async () => {
      try {
        const response = await fetchRandomQuestion(categoryId);
        setRandomQuestion(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestion();
  }, [categoryId]);

  const handleAnswerPress = async (selection) => {
    try {
      const response = await fetchRandomQuestionSubmit(auth.accessToken, {
        categoryId,
        question: randomQuestion.question,
        selections: randomQuestion.selections,
      });
      console.log(response.data);
      if (selection.answer) {
        Alert.alert("정답입니다!", "축하합니다!");
      } else {
        Alert.alert("틀렸습니다", "다시 시도해보세요.");
      }
      const newResponse = await fetchRandomQuestion(categoryId);
      setRandomQuestion(newResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const answerLabels = ["A )", "B )", "C )", "D )"];

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>랜덤 학습</Text>
        <Text style={styles.subTitle}>
          학습자의 수준에 맞춰 랜덤으로 문제가 출력됩니다.
        </Text>
        <View style={styles.topContainer}>
          <View style={styles.answerContainer}>
            <Text style={styles.question}>{randomQuestion.question}</Text>
          </View>
          {randomQuestion.selections.map((selection, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => handleAnswerPress(selection)}
            >
              <View style={styles.selectionContainer}>
                <View style={styles.quizContainer}>
                  <Text style={styles.selectionLabel}>
                    {answerLabels[index]}{" "}
                  </Text>
                  <Text style={styles.selection}>{selection.content}</Text>
                </View>
              </View>
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
    backgroundColor: "white",
    width: "100%",
  },
  topContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(125, 107, 185, 0.3)",
    padding: 20,
    width: "100%",
    borderRadius: 8,
  },
  title: {
    fontSize: width * 0.045,
    fontFamily: "paybooc-Bold",
    textAlign: "center",
    marginBottom: height * 0.015,
  },
  subTitle: {
    fontSize: width * 0.035,
    marginBottom: height * 0.02,
    fontFamily: "paybooc-Medium",
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  question: {
    fontFamily: "paybooc-Bold",
    marginBottom: 20,
    padding: 5,
    fontSize: 23,
  },
  selectionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectionLabel: {
    fontSize: 18,
    fontFamily: "paybooc-Bold",
    marginRight: 5,
  },
  selection: {
    fontSize: 15,
    fontFamily: "paybooc-Medium",
    flexShrink: 1,
  },
  quizContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  answerContainer: {
    backgroundColor: "white",
    flex: 1,
    padding: 25,
    justifyContent: "flex-start",
    marginBottom: 50,
    borderRadius: 8,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default RandomLearning;
