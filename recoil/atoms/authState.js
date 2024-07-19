import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    accessToken: "",
    username: "",
    name: "",
    sessionExpired: false,
  },
});

export const userState = atom({
  key: "userState",
  default: {
    name: "",
    age: 0,
    sex: "",
    answerAccuracy: 0,
    submissionCount: 0,
    sessionExpired: false,
  },
});
