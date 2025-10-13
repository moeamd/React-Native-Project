import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Avatar, Card, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";

export const ChatScreen = ({ route }) => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  // console.log(data);
  
  const { id, name, age, image, chatId } = route.params;
  const flatListRef = useRef(null);
  const {user , loading} = useSelector((state)=>state.user)

  // console.log(id);
  // console.log(data);
  //   const getToken = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem("token");
  //     if (token !== null) {
  //       console.log("Token:", token);
  //       return token;
  //     }
  //   } catch (error) {
  //     console.log("Error getting token", error);
  //   }
  // };
  // const item = data.map((i)=> {
  //   // if (i.senderId === id) {
  //   //   console.log("From Me");
  //   // }else {
  //   //   console.log("from other");
  //   // }
  //   // console.log(i.senderId);
  // })

  // get messages
  const fetchMessages = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/chats/${chatId}/messages`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // console.log("API Response:", res.data);
      setData(res.data || []);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // send Messages
  const sendMessage = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/api/chats/${chatId}/messages`,
        { text: message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData((prev) => [...prev, res.data]);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

useFocusEffect(
  useCallback(() => {
    // if (!chatId || !user?.id) return ;
    fetchMessages();
  }, [chatId])
    // console.log(user)
    
);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f2f6ff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View style={styles.header}>
        <Avatar.Image
          size={50}
          source={require("../assets/IMG-20210822-WA0009.jpg")}
        />
        <Text style={styles.headerText}>{name}</Text>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item, index) =>
          item.id?.toString() || index.toString()
        }
        renderItem={({ item }) => (
          <Card
            style={[
              styles.card,
              item.senderId === user.id
                ? styles.myMessage
                : styles.otherMessage,
            ]}
          >
            <Card.Content>
              <Text
                style={{
                  fontSize: 14,
                  color: item.senderId === user.id ? "#fff" : "#1a1a1a",
                }}
              >
                {item.text}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  color: item.senderId === user.id ? "#e0e0e0" : "#3d3c3cff",
                  textAlign: "right",
                  marginTop: 3,
                }}
              >
                {new Date(item.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </Card.Content>
          </Card>
        )}
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          mode="flat"
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          right={
            <TextInput.Icon
              icon="send"
              color="#fff"
              onPress={() => {
                sendMessage();
                setMessage("");
              }}
              style={styles.sendIcon}
            />
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: "#dbe4f0",
    elevation: 2,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
    color: "#1a1a1a",
  },
  card: {
    marginVertical: 5,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    maxWidth: "75%",
  },
  myMessage: {
    backgroundColor: "#2F80ED",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    backgroundColor: "#e9eef8",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  inputContainer: {
    padding: 8,
    backgroundColor: "#ffffff",
    borderTopWidth: 0.5,
    borderColor: "#dbe4f0",
  },
  input: {
    backgroundColor: "#f1f4fb",
    borderRadius: 30,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sendIcon: {
    backgroundColor: "#2F80ED",
    borderRadius: 20,
    marginRight: 6,
  },
});

export default ChatScreen;