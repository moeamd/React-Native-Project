import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { FollowScreen } from "../screens/FollowScreen";
import { ChatScreen } from "../screens/ChatScreen";

const Tabs = createBottomTabNavigator();
export default function AppNavigator() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Home"
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
        name="Chats"
        component={ChatScreen}
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
