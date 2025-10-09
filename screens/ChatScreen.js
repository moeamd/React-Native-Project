import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { Avatar, Card, TextInput } from "react-native-paper";

export const ChatScreen = ({ route }) => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const { id, name, age, image, chatId } = route.params;
  const flatListRef = useRef(null);
  // console.log(id);
  // console.log(data);
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vZW1hZDUwNEBnbWFpbC5jb20iLCJpZCI6IlhUd28xb24wMThRMkhhT1dXd2d0Iiwicm9sZSI6InVzZXIiLCJuYW1lIjoiUm9zaGR5IiwidXNlckltYWdlVXJsIjpudWxsLCJpYXQiOjE3NjAwMjI5MzAsImV4cCI6MTc2MDEwOTMzMH0.HDqeuiI2s3P-VvJxPKoGIscARMaVe21gNO8vWY7rKnk";

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
      const res = await axios.get(
        `http://localhost:5000/api/chats/${chatId}/messages`,
        { headers: { Authorization: token } }
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
      const res = await axios.post(
        `http://localhost:5000/api/chats/${chatId}/messages`,
        { text: message },
        { headers: { Authorization: token } }
      );
      setData((prev) => [...prev, res.data]);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
      // console.log(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

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
                item.senderId !== id ? styles.myMessage : styles.otherMessage,
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
          marginTop:20,
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
    backgroundColor: "#2ca0e8",
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
});
