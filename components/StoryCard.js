import React from 'react'
import { Image, Text, View } from 'react-native'
import { styles } from '../styles/HomeScreenStyle'

export const StoryCard = (props) => {
    return (
        <View style={styles.storySection}>
            <View style={styles.storyItem}>
                <Image
                    source={require('../assets/Screenshot (3).png')} 
                    style={styles.storyCircle}
                />
                <Text style={styles.storyText}>{props.name}</Text>
            </View>
        </View>
    )
}

export default StoryCard