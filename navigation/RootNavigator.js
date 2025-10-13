import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

import AppNavigator from "./AppNavigator";
import { AuthScreen } from "../screens/authScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log("Token:", token);
        if (token) {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          if (decoded.exp > currentTime) {
            setIsLoggedIn(true);
          } else {
            await AsyncStorage.removeItem("token");
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="Main">
            {props => <AppNavigator {...props} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="auth">
            {props => <AuthScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
