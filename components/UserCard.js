import React from 'react'
import { Image, Text, View } from 'react-native'
import { styles } from '../styles/HomeScreenStyle'

const UserCard = () => {
    return (
        <View style={styles.postHeader}>
            <Image
                source={require('../assets/Screenshot (3).png')} // Replace with actual image URL
                style={styles.userCircle}
            />
            <View style={styles.postNameTime}>
                <Text style={styles.postAuthor}>Kriston Watson</Text>
                <View><Text> 09:30 am </Text></View>
            </View>
        </View>
    )
}

export default UserCard