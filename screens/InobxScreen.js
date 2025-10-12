import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { Card, IconButton, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import { useCallback } from 'react';

export const InobxScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [myData, setMyData] = useState([]);
  const [frindsData, setFrindsData] = useState([]);
  const {user , loading} = useSelector((state)=>state.user )
  const url = "http://localhost:5000/api/chats";
  
  // console.log(user);
  
  //  get all chats
  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
      // console.log(res.data);
      console.log("Response status:", res.status);
console.log("Response data:", res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };
  // get frinds ID
  const getMyFrindId = (chat, myId) => {
    if (!Array.isArray(chat)) return [];
    const ids = chat.flatMap((chat) =>
      chat.members.filter((memberId) => memberId !== myId)
    );
    return Array.from(new Set(ids));
  };
  // console.log(frindIds);

  // get Frinds Data
  const getFrindsData = async () => {
    const frindIds = getMyFrindId(data, user.id);
    if (frindIds.length === 0) return;
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await Promise.all(
        frindIds.map((id) =>
          axios.get(`http://localhost:5000/api/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      const data = res.map((r) => r.data.user);
      setFrindsData(data);
      // console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  // merge data
  const mergeData = data.map((chat) => {

    const frindId = chat.members.find((id) => id !== user.id);
    const friend  = frindsData.find((f) => f.id === frindId);

    return {
      ...chat,
      friend: friend || {},
    };
  });


useFocusEffect(
  useCallback(() => {
    const loadData = async () => {
      await fetchData();
    };
    loadData();
  }, [user])
);


useEffect(() => {
  if (data.length > 0 && user?.id) {
    getFrindsData();
  }
}, [data, user]);





  return (
    <View style={{ padding: 20 }}>
      <TextInput
        label="Search."
        left={<TextInput.Icon icon="magnify" />}
        activeOutlineColor="#2ca0e8ff"
        underlineColor="#2ca0e8ff"
      />

        <View style={{ flex: 1 }}>
          <FlatList
            data={mergeData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ChatScreen", {
                    chatId:item.id,
                    id: item.friend.id,
                    name: item.friend.name,
                    image:
                      item.friend.userImageUrl ||
                      require("../assets/IMG-20210822-WA0009.jpg"),
                  })
                }
              >
                <Card.Title
                  title={item.friend?.name || "Unknown"}
                  subtitle={item.lastMessage || ""}
                  left={(props) => (
                    <Image
                      source={
                        item.friend?.userImageUrl
                          ? { uri: item.friend.userImageUrl }
                          : require("../assets/IMG-20210822-WA0009.jpg")
                      }
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                  )}
                  right={(props) => (
                    <View style={{ display: "flex", alignItems: "center" }}>
                      <Text>
                        {item.lastMessageAt
                          ? new Date(item.lastMessageAt).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                          : ""}
                      </Text>
                    </View>
                  )}
                  titleStyle={{ fontWeight: "bold", fontSize: 16 }}
                />
              </TouchableOpacity>
            )}
          />
        </View>

    </View>
  );
};
