// components/questiondetail/QuestionDetail.jsx
import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";

const { width, height } = Dimensions.get("window");

const QuestionDetail = ({ questionDetail }) => {
  const answerLabels = ["A )", "B )", "C )", "D )"];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>기초 학습 {questionDetail.number}</Text>
      <View style={styles.topContainer}>
        <View style={styles.answerContainer}>
          <Text style={styles.question}>{questionDetail.question}</Text>
        </View>
        {questionDetail.selections.map((selection, index) => (
          <View key={selection.id} s style={styles.card}>
            <View style={styles.selectionContainer}>
              <View style={styles.quizContainer}>
                <Text style={styles.selectionLabel}>
                  {answerLabels[index]}{" "}
                </Text>
                <Text style={styles.selection}>{selection.content}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
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
    padding: 20,
    width: "100%",
    borderRadius: 8,
  },
  title: {
    fontSize: 25,
    fontFamily: "paybooc-Bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  question: {
    fontSize: 20,
    fontFamily: "paybooc-Bold",
    marginBottom: 20,
  },
  selectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  selectionLabel: {
    fontSize: 18,
    fontFamily: "paybooc-Bold",
    marginRight: 5,
  },
  selection: {
    fontSize: 18,
    fontFamily: "paybooc-Medium",
  },
  quizContainer: {
    flexDirection: "row",
  },
  answerContainer: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QuestionDetail;
