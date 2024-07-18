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
import {
  fetchQuestions,
  fetchDetailQuestions,
  fetchSubmit,
} from "../../api/index";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atoms/authState";
import QuestionDetail from "../questiondetail/QuestionDetail";

const { width, height } = Dimensions.get("window");

const BasicLearning = ({ categoryId }) => {
  const auth = useRecoilValue(authState);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await fetchQuestions(auth.accessToken, categoryId);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error(error);
      }
    };

    getQuestions();
  }, [categoryId, auth.accessToken]);

  const handleCardPress = async (questionId) => {
    try {
      const response = await fetchDetailQuestions(auth.accessToken, questionId);
      setSelectedQuestion(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackPress = () => {
    setSelectedQuestion(null);
  };

  const handleSubmit = async (selectionId) => {
    try {
      await fetchSubmit(auth.accessToken, selectionId);

      setQuestions((prevQuestions) =>
        prevQuestions.map((question, index) => {
          if (question.id === selectedQuestion.id) {
            return { ...question, solved: true };
          }
          return question;
        })
      );
      setSelectedQuestion(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {selectedQuestion === null ? (
        <>
          <Text style={styles.title}>단계선택</Text>
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.grid}>
              {questions.map((question, index) => {
                const displayedNumber = (index % 20) + 1;
                return (
                  <TouchableOpacity
                    key={question.id}
                    style={styles.cardContainer}
                    onPress={
                      question.solved ||
                      displayedNumber === 1 ||
                      index === 0 ||
                      questions[index - 1]?.solved
                        ? () => handleCardPress(question.id)
                        : null
                    }
                  >
                    <View style={styles.card}>
                      {displayedNumber === 1 ||
                      question.solved ||
                      index === 0 ||
                      questions[index - 1]?.solved ? (
                        <Text style={styles.number}>{displayedNumber}</Text>
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
                );
              })}
            </View>
          </ScrollView>
        </>
      ) : (
        <QuestionDetail
          questionDetail={selectedQuestion}
          onBackPress={handleBackPress}
          onSubmit={handleSubmit}
        />
      )}
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

export default BasicLearning;
