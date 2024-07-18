import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atoms/authState";
import { fetchSubmit } from "../../api/index";
import ConfettiCannon from "react-native-confetti-cannon";

const { width, height } = Dimensions.get("window");

const QuestionDetail = ({ questionDetail }) => {
  const auth = useRecoilValue(authState);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (selectionId) => {
    try {
      const response = await fetchSubmit(auth.accessToken, selectionId);
      console.log(response.data);

      if (response.data.answer) {
        setShowConfetti(true);
        Alert.alert("정답입니다!", "축하합니다!", [
          {
            text: "OK",
          },
        ]);
      } else {
        Alert.alert("틀렸습니다", "다시 시도해보세요.", [{ text: "OK" }]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const answerLabels = ["A )", "B )", "C )", "D )"];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>기초 학습 {questionDetail.number}</Text>
      <View style={styles.topContainer}>
        <View style={styles.answerContainer}>
          <Text style={styles.question}>
            {questionDetail.id}. {questionDetail.question}
          </Text>
        </View>
        {questionDetail.selections.map((selection, index) => (
          <TouchableOpacity
            key={selection.id}
            style={styles.card}
            onPress={() => handleSubmit(selection.id)}
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
      {showConfetti && <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    padding: 30,
    width: "100%",
    borderRadius: 8,
  },
  title: {
    fontSize: width * 0.045,
    fontFamily: "paybooc-Bold",
    textAlign: "center",
    marginBottom: height * 0.02,
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
    fontSize: 16,
    fontFamily: "paybooc-Medium",
  },
  quizContainer: {
    flexDirection: "row",
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

export default QuestionDetail;
