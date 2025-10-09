import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { FollowScreen } from "../screens/FollowScreen";
import { ChatScreen } from "../screens/ChatScreen";
import { InobxScreen } from "../screens/InobxScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


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
