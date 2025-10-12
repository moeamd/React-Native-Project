import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { styles } from '../styles/HomeScreenStyle';
import StoryCard from '../components/StoryCard.js';
import PostCard from '../components/PostCard.js';
import AddPost from '../components/AddPost.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
         const token = await AsyncStorage.getItem("token");
        //192.168.11.174
        const response = await axios.get(`http://${myLocalHost}:5000/api/posts`, {
          headers: { Authorization: `Bearer ${token}`, },
        });

        setPosts(response.data)

      } catch (error) {
        console.error('Error geting posts:', error.message);
      }
    }
    fetchData();
  }, [token])

  return (
    <ScrollView style={styles.container}>

      <AddPost />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storySection}>
        <View style={styles.storyItem}>
          <Image
            source={user.imageUrl}
            style={styles.storyCircle}
          />
          <Text style={styles.storyText}>add Story</Text>

        </View>

        {['Jone', 'Smith', 'Kriston', 'Kriston', "Kriston", "Kriston", "Kriston"].map((name, index) => (
          <StoryCard key={index} index={index} name={name} />
        ))}

      </ScrollView>
      {
        posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))
      }

    </ScrollView >
  );
};

