import axios from "axios";
import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Avatar, Card, TextInput } from "react-native-paper";

export const ChatScreen = ({ route }) => {
    const { name, age, image } = route.params;
    const [message, setMessage] = useState('')
    const [data,setData] = useState([])

    console.log(route.params);
    
//     const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9tZGExQGdtYWlsLmNvbSIsImlkIjoiaFo4ZkJxQzVGMndKMXFON2VJdGoiLCJyb2xlIjoidXNlciIsIm5hbWUiOiJzbGFoYSAiLCJ1c2VySW1hZ2VVcmwiOm51bGwsImlhdCI6MTc1OTk1NDk1MSwiZXhwIjoxNzYwMDQxMzUxfQ.Pnb3QNnYv8y3L-Wgiiwvar52--2zZuvzVBTM5IvwKfk'
//     const url = 'http://localhost:5000/api/chats'

// const sendMessage = async () => {
//   try {
//     const res = await axios.get(url, {
//         headers: { Authorization: token },
//     });
//     setData(res.data);
//     console.log(res.data);
//   } catch (error) {
//     console.log(error.response?.data || error.message);
//   }
// };

  return (
    <View style={{ paddingRight: 10 ,paddingLeft: 10 ,display:'flex',gap:10, flexDirection:'column',justifyContent:'space-between', height:'100%'}}>
    <View style={{ padding: 20 ,display:'flex',gap:10, flexDirection:'row', alignItems:'center'}}>
      <Avatar.Image size={50} source={require("../assets/IMG-20210822-WA0009.jpg")} />
      <Text style={{ fontSize: 24, fontWeight: "" }}>{name}</Text>
    </View>
    <View>
        <TextInput
            mode="outlined"
            label="Write Your Message"
            placeholder="Type something"
            right={<TextInput.Icon icon="send" onPress={()=> {sendMessage()}}/>}
            activeUnderlineColor="#2ca0e8ff"
            underlineColor="#2ca0e8ff"
            value={message}
            onChangeText={(text)=> {
                setMessage(text)
            }}
        />
    </View>
    </View>  
  );
};
