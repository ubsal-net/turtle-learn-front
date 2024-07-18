// components/questiondetail/QuestionDetail.jsx
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Header from "../../components/header/Header";

const { width, height } = Dimensions.get("window");
// 이거 문서 한번읽어보시고 해보시죠 반응형맞추는 api입니다 사용하기 쉬워요 그냥 width * 0.1이런식으로 가로세로 길이잡으면됨 ㅎㅎ

const CareerExploration = ({ route }) => {
  const { title } = route.params;
  return (
    <>
      <Header title={title}></Header>
      <View style={styles.container}>
        <Text>나는 ai입니다</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default CareerExploration;
