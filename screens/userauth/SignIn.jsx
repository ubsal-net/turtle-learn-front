import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LongBtn from "../../components/buttons/LongBtn";
import Header from "../../components/header/Header";
import { fetchLogin } from "../../api/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecoilState } from "recoil";
import { authState } from "../../recoil/atoms/authState";

const { width, height } = Dimensions.get("window");

const Signin = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useRecoilState(authState);

  const handleLogin = async () => {
    try {
      const response = await fetchLogin({ username, password });
      const { accessToken, username: responseUsername, name } = response.data;

      await AsyncStorage.setItem("accessToken", accessToken);

      setAuth({
        accessToken,
        username: responseUsername,
        name,
        sessionExpired: false,
      });

      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        Alert.alert("로그인 실패", "아이디 또는 비밀번호가 틀렸습니다.");
      } else {
        Alert.alert("로그인 실패", "아이디 또는 비밀번호를 확인해주세요.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header title="로그인" />
      <View style={styles.content}>
        <Image
          source={require("../../assets/splash/SplashLogo2.png")}
          style={styles.logo}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="아이디를 입력해주세요"
            placeholderTextColor="#666"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력해주세요"
            placeholderTextColor="#666"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <LongBtn title="로그인" onPress={handleLogin} />
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>터틀런 계정이 없으신가요?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.signupLink}> 회원 가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: height * 0.2,
  },
  logo: {
    width: width * 0.4,
    height: height * 0.2,
    resizeMode: "contain",
    marginBottom: height * 0.02,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: "paybooc-Medium",
    marginBottom: 10,
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: height * 0.01,
    width: width * 0.88,
    justifyContent: "flex-start",
  },
  signupText: {
    color: "#666",
    fontFamily: "paybooc-Medium",
  },
  signupLink: {
    color: "#7D6BB9",
    fontWeight: "bold",
    fontFamily: "paybooc-Bold",
    textDecorationLine: "underline",
  },
  inputContainer: {
    width: width * 0.88,
    marginBottom: height * 0.01,
  },
});

export default Signin;
