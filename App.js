 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import { NavigationContainer } from '@react-navigation/native';
 import { StyleSheet, Text, View } from 'react-native';
 import AppNavigator from './navigation/AppNavigator';
 import LoginScreen from './screens/LoginScreen';


export default function App() {
  return (<>
  
    {/* <NavigationContainer>
    <AppNavigator/> */}
    {/* </NavigationContainer> */}
    <LoginScreen/>
    </>
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
