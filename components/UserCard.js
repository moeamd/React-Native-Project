import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../styles/HomeScreenStyle'
import { useNavigation } from '@react-navigation/native'

const UserCard = ({ props }) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity style={styles.postHeader} onPress={()=> {
            navigation.navigate("Profile", {
            screen: "ProfileMain",
            params: { userId: props.id },
            });
        }}>
            <Image
                source={{ uri: props.userImageUrl }} // Replace with actual image URL
                style={styles.userCircle}
            />
            <View style={styles.postNameTime}>
                <Text style={styles.postAuthor}> {props.authorName}</Text>
                <View><Text>{new Date(props.createdAt).toLocaleString()}</Text></View>
            </View>
        </TouchableOpacity>
    )
}

export default UserCard