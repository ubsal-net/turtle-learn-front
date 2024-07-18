import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import Header from "../../components/header/Header";
import { LinearGradient } from "expo-linear-gradient";
import { fetchFistAIResponse } from "../../api/ai";

const { width, height } = Dimensions.get("window");

const CareerExploration = ({ route }) => {
  const { title } = route.params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef();

  useEffect(() => {
    try {
      const getAi = async () => {
        const response = await fetchFistAIResponse();
        console.log(response.data);
      };
      getAi();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSendMessage = async () => {
    if (message.trim().length > 0) {
      const newMessage = {
        id: messages.length.toString(),
        text: message,
        sender: "user",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");

      try {
        const response = await fetchSecondAIResponse(message);
        const responseMessage = {
          id: (messages.length + 1).toString(),
          text: response.data.response,
          sender: "ai",
        };
        setMessages((prevMessages) => [...prevMessages, responseMessage]);
        flatListRef.current.scrollToEnd({ animated: true });
      } catch (error) {
        const errorMessage = {
          id: (messages.length + 1).toString(),
          text: "에러 입니다.",
          sender: "ai",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
        flatListRef.current.scrollToEnd({ animated: true });
      }
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "ai" ? styles.aiMessage : styles.userMessage,
      ]}
    >
      {item.sender === "ai" && (
        <Image
          source={require("../../assets/logo/ai.png")}
          style={styles.avatar}
        />
      )}
      <View
        style={[
          styles.messageBubble,
          item.sender === "ai"
            ? styles.aiMessageBubble
            : styles.userMessageBubble,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <>
      <Header title={title} />
      <View style={styles.container}>
        <Text style={styles.chatTitle}>AI 대화</Text>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({ animated: true })
          }
          onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
        />
        {messages.length > 0 && (
          <TouchableOpacity style={styles.endChatButton}>
            <Text style={styles.endChatButtonText}>대화 종료</Text>
          </TouchableOpacity>
        )}
        <LinearGradient
          colors={["#7D6BB9", "#7276CC", "#798BE0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientContainer}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="대화를 해보세요!"
              placeholderTextColor="#808080"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleSendMessage}
                style={styles.sendButton}
              >
                <Image
                  source={require("../../assets/elementals/profile.png")}
                  style={styles.sendIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  chatTitle: {
    fontSize: 25,
    fontFamily: "paybooc-Bold",
    textAlign: "center",
    marginVertical: 20,
  },
  messageList: {
    flex: 1,
    padding: 10,
    marginBottom: height * 0.03,
  },
  messageListContent: {
    justifyContent: "flex-start",
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: height * 0.02,
  },
  aiMessage: {
    justifyContent: "flex-start",
  },
  userMessage: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  avatar: {
    width: width * 0.13,
    height: height * 0.06,
    marginRight: width * 0.03,
    marginBottom: height * 0.02,
  },
  messageBubble: {
    maxWidth: width * 0.75,
    padding: width * 0.04,
    borderRadius: 15,
  },
  aiMessageBubble: {
    backgroundColor: "rgba(125, 107, 185, 0.3)",
  },
  userMessageBubble: {
    backgroundColor: "#E9F0FB",
    alignSelf: "flex-end",
  },
  messageText: {
    fontSize: 18,
    color: "#222222",
    fontFamily: "paybooc-Medium",
  },
  gradientContainer: {
    height: height * 0.12,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#fff",
    elevation: 2,
    marginTop: height * 0.005,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    color: "#000",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonContainer: {
    marginLeft: 10,
  },
  sendButton: {
    backgroundColor: "#7D6BB9",
    borderRadius: 50,
    padding: 10,
  },
  sendIcon: {
    width: 24,
    height: 24,
    tintColor: "white",
  },
  endChatButton: {
    position: "absolute",
    bottom: height * 0.14,
    left: "40%",
    backgroundColor: "#6651AB",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3,
  },
  endChatButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "paybooc-Bold",
  },
});

export default CareerExploration;
