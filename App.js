import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppNavigator from "./navigation/AppNavigator";
import LoginScreen from "./screens/LoginScreen";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store/store";
import RegisterScreen from "./screens/RegisterScreen";
import { AuthScreen } from "./screens/authScreen";
import RootNavigator from "./navigation/RootNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
  );
}


