import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppNavigator from "./navigation/AppNavigator";
import LoginScreen from "./screens/LoginScreen";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store/store";
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={AppNavigator} />
      </Stack.Navigator>
      </Provider>
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
