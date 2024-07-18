import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const SavedQuiz = () => {
  const questions = [
    { id: 1, number: 1, solved: true },
    { id: 2, number: 2, solved: false },
    { id: 3, number: 3, solved: true },
    { id: 4, number: 4, solved: false },
  ];

  const handleCardPress = (questionId) => {
    console.log("Question ID:", questionId);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>저장 문제</Text>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.grid}>
          {questions.map((question, index) => (
            <TouchableOpacity
              key={question.id}
              style={styles.cardContainer}
              onPress={
                question.solved || question.number === 1
                  ? () => handleCardPress(question.id)
                  : null
              }
            >
              <View style={styles.card}>
                {question.number === 1 || question.solved ? (
                  <Text style={styles.number}>{(index % 20) + 1}</Text>
                ) : (
                  <Image
                    source={require("../../assets/elementals/lock.png")}
                    style={styles.lockIcon}
                  />
                )}
              </View>
              <Image
                source={
                  question.solved
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
  lockIcon: {
    width: width * 0.08,
    height: height * 0.04,
  },
});

export default SavedQuiz;
