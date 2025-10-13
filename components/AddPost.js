import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { styles } from '../styles/HomeScreenStyle'
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { BASE_URL } from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchPosts } from '../features/fetchPosts';

const AddPost = () => {

    const [postText, setPostText] = useState('');
    const [image, setImage] = useState(null);
    const [posts, setPosts] = useState([]);

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
                headers: {Authorization: `Bearer ${token}`},
            });
            // setPosts((prev) => [...prev, response.data]);
            console.log('✅ Post submitted:', response.data);
            setPostText('');
            setImage(null);
        } catch (error) {
            console.error('❌ Error submitting post:', error.message);
            if (error.response?.data) {
                console.log('🚨 Server error:', error.response.data);
            }
        }
    };

    return (
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
    )
}

export default AddPost