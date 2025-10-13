import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { ProfileScreen } from "../screens/ProfileScreen";
import FollowScreen from "../screens/FollowScreen";
import { InobxScreen } from "../screens/InobxScreen";
import { ChatScreen } from "../screens/ChatScreen";
import { HomeScreen } from "../screens/HomeScreen";
import ProfileStack from "./profileStack";
import { useSelector } from "react-redux";

const Tabs = createBottomTabNavigator();
const InboxStack = createNativeStackNavigator();

function InboxStackScreen() {
  return (
    <InboxStack.Navigator screenOptions={{ headerShown: false }}>
      <InboxStack.Screen name="InboxList" component={InobxScreen} />
      <InboxStack.Screen name="ChatScreen" component={ChatScreen} />
    </InboxStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home-outline"
              size={24}
              color={focused ? "blue" : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Inbox"
        component={InboxStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="chatbubble-outline"
              size={24}
              color={focused ? "blue" : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-outline"
              size={24}
              color={focused ? "blue" : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Following"
        component={FollowScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="people-outline"
              size={24}
              color={focused ? "blue" : "gray"}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
