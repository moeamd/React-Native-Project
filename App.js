
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import RegisterScreen from "./screens/RegisterScreen";


export default function App() {
  return (
    <NavigationContainer>
        {/* <AppNavigator/> */}
        <RegisterScreen />;

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppNavigator from "./navigation/AppNavigator";
import LoginScreen from "./screens/LoginScreen";
import { StyleSheet, Text, View } from "react-native";
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <RegisterScreen />;
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={AppNavigator} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
