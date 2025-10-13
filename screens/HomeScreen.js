import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from '../styles/HomeScreenStyle';
import StoryCard from '../components/StoryCard.js';
import PostCard from '../components/PostCard.js';
import AddPost from '../components/AddPost.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../config";
import { fetchPosts } from '../features/fetchPosts.js';
import { Ionicons } from "@expo/vector-icons";

export const HomeScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        //192.168.11.174
        console.log(token);
        const response = await axios.get(`${BASE_URL}/posts`, {
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
  }, [])


  //addpost
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState(null);

  const uploadImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      console.log("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);

      const fileUri = result.assets[0].uri;
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        console.log("File does not exist");
        return;
      }
    }
  };

  const handleSubmitPost = async () => {
    const formData = new FormData();
    formData.append('title', 'Your title');
    formData.append('content', postText);
    if (image) {
      formData.append('image', {
        uri: image.uri || null,
        name: image.fileName || "photo.jpg",
        type: image.type || "image/jpeg",
      });
    } else {
      formData.append('image', null);
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.post(`${BASE_URL}/posts`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // setPosts((prev) => [...prev, response.data]);
      console.log('Post submitted:', response.data);
      setPostText('');
      setImage(null);
      setPosts((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('❌ Error submitting post:', error.message);
      if (error.response?.data) {
        console.log('🚨 Server error:', error.response.data);
      }
    }
  };
  return (
    <ScrollView style={styles.container}>

      {/* <AddPost /> */}
      <View style={styles.postSection}>
        <View style={styles.postAddContent}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require('../assets/Screenshot (3).png')}
              style={styles.userCircle}
            />
            <TextInput
              multiline={true}
              value={postText}
              onChangeText={setPostText}
              style={[styles.postInput, styles.noBorder]}
              placeholder="What's on your head?"
            />
          </View>
          {(postText != '' || image) && (
            <TouchableOpacity onPress={handleSubmitPost}>
              <Text style={styles.submitButton}>Post</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.mediaIcons}>
          <TouchableOpacity onPress={uploadImage}>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons
                name="image"
                size={20}
              />
              <Text >Image</Text>
            </View>

          </TouchableOpacity>

          <TouchableOpacity><Text >🎥Video</Text>
          </TouchableOpacity>

          <TouchableOpacity><Text >📎File</Text>
          </TouchableOpacity>
        </View>
        {image && <Image
          source={{ uri: image.uri }}
          style={styles.previewImage}

        />
        }
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storySection}>
        <View style={styles.storyItem}>
          <Image
            source={require('../assets/avatar.jpg')}
            style={styles.storyCircle}
          />
          <Text style={styles.storyText}>add Story</Text>

        </View>

        {/* {['Jone', 'Smith', 'Kriston', 'Kriston', "Kriston", "Kriston", "Kriston"].map((name, index) => (
          <StoryCard key={index} index={index} name={name} />
        ))} */}

      </ScrollView>
      {
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()} // or item._id if using MongoDB
          renderItem={({ item }) => <PostCard post={item} />}
          showsVerticalScrollIndicator={false}
        />
      }

    </ScrollView >
  );
};

