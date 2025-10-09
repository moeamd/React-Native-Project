import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../styles/HomeScreenStyle'
import CommentCard from './CommentCard';
import UserCard from './UserCard';

const PostCard = () => {


    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentText, setCommentText] = useState('');

    const handleCommentPress = () => {
        setShowCommentBox(prev => !prev);
    };

    const handleSubmitComment = () => {
        console.log('Comment submitted:', commentText);
        setCommentText('');
        setShowCommentBox(false);
    };

    return (
        <View style={styles.postContainer}>
            <UserCard />
            
            <Text style={styles.postText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla mauris ac id arcu non.
            </Text>
            <Image
                source={require('../assets/Screenshot (3).png')} // Replace with actual image URL
                style={styles.postImage}
            />
            <View style={styles.engagementRow}>
                <TouchableOpacity >
                    <Text>❤️ 1064</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCommentPress}>
                    <Text>💬 135</Text>
                </TouchableOpacity>

                <Text>🔄 Share</Text>
            </View>
            {showCommentBox && (
                <View>
                    <View style={styles.commentBox}>

                        <TextInput
                            multiline={true}
                            style={[styles.commentInput, styles.noBorder]}
                            placeholder="Add a comment..."
                            value={commentText}
                            onChangeText={setCommentText}
                        />
                        <TouchableOpacity onPress={handleSubmitComment}>
                            <Text style={styles.submitButton}>Post</Text>
                        </TouchableOpacity>
                    </View>
                    <CommentCard />
                </View>
            )}
        </View>
    )
}

export default PostCard