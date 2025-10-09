import React from 'react'
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';


export const HomeScreen = () => {
    const {user , loading} = useSelector((state)=>state.user )
  console.log(user);
  
   console.log(user);
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}
