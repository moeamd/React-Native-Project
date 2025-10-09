import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { styles } from '../styles/HomeScreenStyle'
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';


const AddPost = () => {

    const [postText, setPostText] = useState('');
    const [image, setImage] = useState("");

    const handleImagePick = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel || response.errorCode) {
                console.warn('Image selection canceled or failed');
            } else {
                setImage(response.assets[0]);
            }
        });
    };

    const handleSubmitPost = async () => {
        const formData = new FormData();
        formData.append('author', 'Kriston Watson');
        formData.append('content', postText);

        if (image) {
            formData.append('image', {
                uri: image.uri,
                type: image.type,
                name: image.fileName,
            });
        }

        try {
            const response = await axios.post('https://your-api-url.com/api/posts', formData, {
                headers: {
                    Authorization: `Bearer YOUR_TOKEN_HERE`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Post submitted:', response.data);
            setPostText('');
            setImage(null);
        } catch (error) {
            console.error('Error submitting post:', error.message);
        }
    };

    return (
        <View style={styles.postSection}>
            <View style={styles.postAddContent}>
                <Image
                    source={require('../assets/Screenshot (3).png')} // Replace with actual image URL
                    style={styles.userCircle}
                />
                <TextInput
                    multiline={true}
                    value={postText}
                    onChangeText={setPostText}
                    style={[styles.postInput, styles.noBorder]}
                    placeholder="What's on your head?"
                />
                {postText != '' && (
                    <TouchableOpacity onPress={handleSubmitPost}>
                        <Text style={styles.submitButton}>Post</Text>
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.mediaIcons}>
                <TouchableOpacity onPress={handleImagePick}>
                    <Text >📷Image</Text>
                </TouchableOpacity>
                {image && <Image source={{ uri: image.uri }} style={styles.previewImage} />}

                <TouchableOpacity><Text >🎥Video</Text>
                </TouchableOpacity>

                <TouchableOpacity><Text >📎File</Text>
                </TouchableOpacity>
            </View>
        </View>



    )
}

export default AddPost