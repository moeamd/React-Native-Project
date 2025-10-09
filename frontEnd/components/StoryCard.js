import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { styles } from '../styles/HomeScreenStyle'

export const StoryCard = () => {
    return (
        <View style={styles.storySection}>

            {['Jone', 'Smith', 'Kriston', 'Kriston', "Kriston", "Kriston", "Kriston"].map((name, index) => (
                <View key={index} style={styles.storyItem}>
                    <Image
                        source={require('../assets/Screenshot (3).png')} // Replace with actual image URL
                        style={styles.storyCircle}
                    />
                    <Text style={styles.storyText}>{name}</Text>
                </View>
            ))}
        </View>
    )
}

export default StoryCard