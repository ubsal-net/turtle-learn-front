import axios from "axios";
import { API_URL } from "@env";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 회원가입
export const fetchSignup = ({ username, password, name, age, sex }) => {
  return instance.post("/users", {
    username,
    password,
    name,
    age,
    sex,
  });
};

// 로그인
export const fetchLogin = ({ username, password }) => {
  return instance.post("/auths/login", {
    username,
    password,
  });
};

// 사이드바 + 페르소나 프롬프트를 위한 사용자 정보
export const fetchProfile = (token) => {
  return instance.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 문제
export const fetchQuestions = (token, categoryId) => {
  return instance.get(`/questions?categoryId=${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 상세 문제
export const fetchDetailQuestions = (token, id) => {
  return instance.get(`/questions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 기초 학습 정답 제출
export const fetchSubmit = (token, selectionId) => {
  return instance.post(
    "/questions/submissions",
    {
      selectionId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// 랜던 문제 정답 제출
export const fetchRandomQuestionSubmit = (token, data) => {
  return instance.post("/random-questions", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 저장 문제 호출
export const fetchRandomQuestion = (token) => {
  return instance.get("/random-questions", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
