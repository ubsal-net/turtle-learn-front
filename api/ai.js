import axios from "axios";

const instance = axios.create({
  baseURL: "http://43.200.245.55:9000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchRandomQuestion = (categoryId) => {
  return instance.get(`/question/random?category=${categoryId}`);
};

export const fetchRandomQuestionSubmit = (token, data) => {
  return instance.post("/random-questions", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchRandomQuestionSaved = (token, id) => {
  return instance.get(`/random-questions/${id}`);
};

export const fetchFirstAIResponse = () => {
  return instance.get(
    "/ai?message=나는 10살 남자 김민규야 경계선 지능을 가지고 있지, 너는 이제부터 나의 페르소나가 되어서 나의 진로탐색을 도와주어야해&uuid="
  );
};

export const fetchSecondAIResponse = (message, uuid) => {
  return instance.get(`/ai?message=${message}&uuid=${uuid}`);
};

export const fetchExitAIResponse = (uuid) => {
  return instance.get(`/exit?uuid=${uuid}`);
};
