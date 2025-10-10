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
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
