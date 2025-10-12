import React, { useEffect } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { styles } from '../styles/HomeScreenStyle';
import StoryCard from '../components/StoryCard.js';
import PostCard from '../components/PostCard.js';
import AddPost from '../components/AddPost.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeScreen = () => {

  return (
    <ScrollView style={styles.container}>

      {/* Add post Section */}
      <AddPost />
      {/* Stor>y Section */}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storySection}>
        <View style={styles.storyItem}>
          {/* <Image
            source={user.imageUrl}
            style={styles.storyCircle}
          /> */}
          <Text style={styles.storyText}>add St</Text>
        </View>
        <StoryCard />
      </ScrollView>

      {/* Post Section */}
      <PostCard />
      <PostCard />

    </ScrollView >
  );
};

