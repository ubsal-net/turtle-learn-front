import axios from "axios";

const instance = axios.create({
  baseURL: "http://146.56.109.210:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchSignup = ({ username, password, name, age, sex }) => {
  return instance.post("/users", {
    username,
    password,
    name,
    age,
    sex,
  });
};

export const fetchLogin = ({ username, password }) => {
  return instance.post("/auths/login", {
    username,
    password,
  });
};

export const fetchProfile = (token) => {
  return instance.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchQuestions = (token, categoryId) => {
  return instance.get(`/questions?categoryId=${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
