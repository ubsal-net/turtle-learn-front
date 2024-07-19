import { useRecoilValue } from "recoil";
import axios from "axios";
import { AI_URL } from "@env";
import { userState } from "../recoil/atoms/authState";

const instance = axios.create({
  baseURL: AI_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchRandomQuestion = (categoryId) => {
  return instance.get(`/question/random?category=${categoryId}`);
};

export const useFetchFirstAIResponse = () => {
  const user = useRecoilValue(userState);

  const fetchFirstAIResponse = async () => {
    return instance.get(
      `/setting/ai?age=${user.age}&username=${user.name}&sex=${user.sex}&uuid=`
    );
  };

  return fetchFirstAIResponse;
};

export const fetchSecondAIResponse = (message, uuid) => {
  return instance.get(`/chat/ai?message=${message}&uuid=${uuid}`);
};

export const fetchExitAIResponse = (uuid) => {
  return instance.get(`/exit?uuid=${uuid}`);
};
