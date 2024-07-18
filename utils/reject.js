import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../recoil/atoms/authState";
import { Alert } from "react-native";

export const handleSessionExpired = (message = "세션이 만료되었습니다.") => {
  const navigation = useNavigation();
  const setAuth = useSetRecoilState(authState);
  const auth = useRecoilValue(authState);

  const sessionExpired = async () => {
    if (auth.accessToken) {
      return;
    } else {
      await AsyncStorage.removeItem("accessToken");
      setAuth({ accessToken: "", sessionExpired: true });
      Alert.alert(message, "다시 로그인 해주세요.", [
        {
          text: "OK",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Selection" }],
            });
          },
        },
      ]);
    }
  };

  return sessionExpired;
};

export const handleLogout = () => {
  const navigation = useNavigation();
  const setAuth = useSetRecoilState(authState);

  const logout = async () => {
    await AsyncStorage.removeItem("accessToken");
    setAuth({ accessToken: "", sessionExpired: true });
    Alert.alert("로그아웃 완료!", "다시 로그인 해주세요.", [
      {
        text: "OK",
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Selection" }],
          });
        },
      },
    ]);
  };

  return logout;
};
