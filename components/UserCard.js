import React from 'react'
import { Image, Text, View } from 'react-native'
import { styles } from '../styles/HomeScreenStyle'

const UserCard = ({ props }) => {
    return (
        <View style={styles.postHeader}>
            <Image
                source={{ url: props.userImageUrl }} // Replace with actual image URL
                style={styles.userCircle}
            />
            <View style={styles.postNameTime}>
                <Text style={styles.postAuthor}> {props.authorName}</Text>
                <View><Text>  {props.createdAt?.toLocaleString()} </Text></View>
            </View>
        </View>
    )
}

export default UserCard