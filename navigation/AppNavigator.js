import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { FollowScreen } from "../screens/FollowScreen";
import { ChatScreen } from "../screens/ChatScreen";
import { InobxScreen } from "../screens/InobxScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const InboxStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function InboxStackScreen() {
  return (
    <InboxStack.Navigator screenOptions={{ headerShown: false }}>
      <InboxStack.Screen name="InboxList" component={InobxScreen} />
      <InboxStack.Screen name="ChatScreen" component={ChatScreen} />
    </InboxStack.Navigator>
  );
}
export default function AppNavigator() {
   const navigation = useNavigation();
  useEffect(() => {
    const check = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        if (error.response?.status === 401) {
          await AsyncStorage.removeItem("token");
          navigation.replace("auth");
        }
      }
    };
    return check();
  },[]);

  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Trend"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="home-outline"
              size={20}
              color={focused ? "blue" : "gray"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Inbox"
        component={InboxStackScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="chatbubble-outline"
              size={20}
              color={focused ? "blue" : "gray"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="person-outline"
              size={20}
              color={focused ? "blue" : "gray"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Following"
        component={FollowScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="people-outline"
              size={20}
              color={focused ? "blue" : "gray"}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
