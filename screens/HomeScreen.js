import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { styles } from '../styles/HomeScreenStyle';
import StoryCard from '../components/StoryCard.js';
import PostCard from '../components/PostCard.js';
import AddPost from '../components/AddPost.js';
import axios from 'axios';

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVsbGFoYWFidWt1ZmZhQGdtYWlsLmNvbSIsImlkIjoidmthZzRPQnhIN2hsUmt5Wms0dFYiLCJyb2xlIjoidXNlciIsIm5hbWUiOiJBYmR1bGxhaCBBYmRlbEdoYWZmYXIiLCJ1c2VySW1hZ2VVcmwiOm51bGwsImlhdCI6MTc2MDI2NTc4MSwiZXhwIjoxNzYwMzUyMTgxfQ.TsChav2Nu0LPuh_yn9fwbpEVnr25jNXVVYL4HM7Q1J8';
export const HomeScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //192.168.11.174
        const response = await axios.get('http://192.168.11.174:5000/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
            source={require('..')}
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

