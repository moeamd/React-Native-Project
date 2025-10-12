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
  console.log(data);
  
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
        `http://10.150.220.39:5000/api/chats/${chatId}/messages`,
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
        `http://10.150.220.39:5000/api/chats/${chatId}/messages`,
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
      style={{ flex: 1, backgroundColor: "#f5f5f5" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Avatar.Image
          size={50}
          source={require("../assets/IMG-20210822-WA0009.jpg")}
        />
        <Text style={styles.headerText}>{name}</Text>
      </View>
      <View style={{ flex: 1 }}>
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
              <Card.Content
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingEnd: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 8,
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                  }}
                >
                  {new Date(item.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                <Text style={{ color: item.senderId !== id ? "#fff" : "#000" }}>
                  {item.text}
                </Text>
              </Card.Content>
            </Card>
          )}
          contentContainerStyle={{ paddingVertical: 10 }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />
      </View>
      <View
        style={{
          marginTop: 20,
          // position: "absolute",
          // bottom: 0,
          // left: 0,
          // right: 0,
          // padding: 10,
          // // backgroundColor: "#fff",
        }}
      >
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 20,
            paddingHorizontal: 15,
            backgroundColor: "#fff",
          }}
          mode="outlined"
          label="Write Your Message"
          placeholder="Type something"
          value={message}
          onChangeText={setMessage}
          right={
            <TextInput.Icon
              icon="send"
              onPress={() => {
                sendMessage();
                setMessage("");
              }}
            />
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },
  headerText: { fontSize: 18, fontWeight: "600", marginLeft: 10 },
  card: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 12,
    maxWidth: "80%",
  },
  myMessage: {
    backgroundColor: "blue",
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "red",
    alignSelf: "flex-start",
  },
});
