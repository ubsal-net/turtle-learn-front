import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { fetchQuestions } from "../../api/index";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atoms/authState";

const BasicLearning = ({ categoryId }) => {
  const auth = useRecoilValue(authState);
  const [questions, setQuestions] = useState([]);

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

  return (
    <View styles={styles.mainContainer}>
      <Text style={styles.title}>단계선택</Text>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.grid}>
          {questions.map((question) => (
            <View key={question.id} style={styles.cardContainer}>
              <View style={styles.card}>
                <Text style={styles.number}>{question.number}</Text>
              </View>
              <Text style={question.solved ? styles.solved : styles.unsolved}>
                {question.solved ? "✓" : "✗"}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontFamily: "paybooc-Bold",
    textAlign: "center",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContainer: {
    width: "22%",
    alignItems: "center",
    marginVertical: 10,
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
    fontSize: 20,
    fontFamily: "paybooc-Bold",
  },
  solved: {
    fontSize: 18,
    color: "green",
    fontFamily: "paybooc-Medium",
    marginTop: 5,
  },
  unsolved: {
    fontSize: 18,
    color: "red",
    fontFamily: "paybooc-Medium",
    marginTop: 5,
  },
  mainContainer: {
    flex: 1,
  },
});

export default BasicLearning;
