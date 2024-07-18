import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LongBtn from "../../components/buttons/LongBtn";
import VeryShortBtn from "../../components/buttons/VeryShortBtn";
import Header from "../../components/header/Header";
import { fetchSignup } from "../../api/index";
const { width, height } = Dimensions.get("window");

const Signup = () => {
  const navigation = useNavigation();
  const [sex, setSex] = useState("MALE");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const handleSignup = async () => {
    if (!passwordMatch) {
      Alert.alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    const signupData = { username, password, name, age: Number(age), sex };

    try {
      await fetchSignup(signupData);
      Alert.alert("회원가입이 완료되었습니다.");
      navigation.navigate("SignIn");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        Alert.alert("회원가입 실패", "이미 존재하는 아이디입니다.");
      } else {
        Alert.alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header title="회원가입" />
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            아이디<Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.flex1, { marginRight: 8 }]}
              placeholder="아이디를 입력해주세요"
              placeholderTextColor="#666"
              value={username}
              onChangeText={setUsername}
            />
            <VeryShortBtn title="중복확인" onPress={() => {}} />
          </View>
          <Text style={styles.helperText}>최소 8자 이상 입력해 주세요.</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            비밀번호<Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력해주세요"
            placeholderTextColor="#666"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.helperText}>
            특수문자 대문자 포함 최소 8자 이상 입력해 주세요.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            비밀번호 확인<Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, !passwordMatch && styles.inputError]}
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            placeholderTextColor="#666"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {!passwordMatch && (
            <Text style={styles.errorText}>비밀번호가 일치하지 않습니다.</Text>
          )}
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer, styles.flex1]}>
            <Text style={styles.label}>
              이름<Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="이름을 입력해주세요"
              placeholderTextColor="#666"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={[styles.inputContainer, styles.flex1]}>
            <Text style={styles.label}>
              나이<Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="나이를 입력해주세요"
              placeholderTextColor="#666"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            성별<Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.radioContainer}
              onPress={() => setSex("MALE")}
            >
              <View
                style={[
                  styles.radioCircle,
                  sex === "MALE" && styles.radioCircleSelected,
                ]}
              >
                {sex === "MALE" && <View style={styles.radioInnerCircle} />}
              </View>
              <Text style={styles.radioText}>남자</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioContainer}
              onPress={() => setSex("FEMALE")}
            >
              <View
                style={[
                  styles.radioCircle,
                  sex === "FEMALE" && styles.radioCircleSelected,
                ]}
              >
                {sex === "FEMALE" && <View style={styles.radioInnerCircle} />}
              </View>
              <Text style={styles.radioText}>여자</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            본인 확인 이메일<Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.flex1, { marginRight: 8 }]}
              placeholder="이메일을 입력해주세요"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
            />
            <VeryShortBtn title="번호전송" onPress={() => {}} />
          </View>
          <TextInput
            style={[styles.input, { marginTop: 5 }]}
            placeholder="인증번호를 입력해주세요"
            placeholderTextColor="#666"
          />
        </View>

        <LongBtn title="회원가입하기" onPress={handleSignup} />
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
    position: "absolute",
    top: height * 0.12,
    left: width * 0.06,
    width: width * 0.88,
    height: height * 0.78,
    marginTop: height * 0.053,
  },
  inputContainer: {
    marginBottom: height * 0.03,
  },
  label: {
    fontSize: width * 0.04,
    fontFamily: "paybooc-Bold",
    marginBottom: height * 0.0045,
  },
  required: {
    color: "#FF4D4D",
  },
  helperText: {
    fontSize: width * 0.03,
    color: "#666",
    marginTop: 5,
  },
  errorText: {
    fontSize: width * 0.03,
    color: "#FF4D4D",
    marginTop: 5,
    position: "absolute",
    bottom: -height * 0.02,
  },
  input: {
    width: "100%",
    height: height * 0.048,
    borderColor: "#ccc",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: width * 0.04,
    fontFamily: "paybooc-Medium",
  },
  inputError: {
    borderColor: "#FF4D4D",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  flex1: {
    flex: 1,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: width * 0.03,
    paddingTop: height * 0.01,
  },
  radioCircle: {
    height: width * 0.06,
    width: width * 0.06,
    borderRadius: width * 0.03,
    borderWidth: 2,
    borderColor: "#7D6BB9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  radioCircleSelected: {
    height: width * 0.06,
    width: width * 0.06,
    borderRadius: width * 0.03,
    borderWidth: 2,
    borderColor: "#7D6BB9",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInnerCircle: {
    height: width * 0.03,
    width: width * 0.03,
    borderRadius: width * 0.015,
    backgroundColor: "#7D6BB9",
  },
  radioText: {
    fontSize: width * 0.04,
    color: "#000",
    fontFamily: "paybooc-Medium",
  },
});

export default Signup;
