import { View, Text, Image, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react'
import { styles } from '../styles/HomeScreenStyle'
import CommentCard from './CommentCard';
import UserCard from './UserCard';
import axios from 'axios';
import { token } from '../screens/HomeScreen';

const PostCard = ({ post }) => {

    const [menuVisible, setMenuVisible] = useState(false);
    const [showCommentBox, setShowCommentBox] = useState(false);

    const [commentText, setCommentText] = useState('');

    const handleCommentPress = () => {
        setShowCommentBox(prev => !prev);
    };

    const handleSubmitComment = async () => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/comments/${post.id}`,
                
                { content: commentText }, // plain JSON body
                
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Comment submitted:', response.data);
            setCommentText('');
            setShowCommentBox(false);
        } catch (error) {
            if (error.response) {
                console.error('Server error:', error.response.status, error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error submitting comment:', error.message);
            }
        }
    };

    const handleLikePress = () => {

    }
    return (
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
            <View style={[styles.postContainer, { position: 'relative' }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <UserCard props={post} />
                    <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
                        <Ionicons
                            name="ellipsis-vertical"
                            size={20}
                        />
                    </TouchableOpacity>
                    {menuVisible && (
                        <View 
                        style={{
                            position: 'absolute',
                            top: 45, // adjust based on icon size
                            right: 0,
                            width: 100,
                            backgroundColor: 'white',
                            borderRadius: 8,
                            elevation: 5,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            padding: 10,
                            zIndex: 50
                        }}>
                            <TouchableOpacity onPress={() => {
                                handleUpdatePost(post);
                                setMenuVisible(false);
                            }}>
                                <Text style={{ paddingVertical: 6 }}>Edit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                handleCopyLink(post.id);
                                setMenuVisible(false);
                            }}>
                                <Text style={{ paddingVertical: 6 }}>Copy Link</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                handleReportPost(post.id);
                                setMenuVisible(false);
                            }}>
                                <Text style={{ paddingVertical: 6 }}>Report Post</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                handleDeletePost(post.id);
                                setMenuVisible(false);
                            }}>
                                <Text style={{ paddingVertical: 6, color: 'red' }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <View>
                    <Text style={styles.postText}>
                        {post.content}
                    </Text>
                    {post.imageUrl && <Image
                        source={{ uri: post.imageUrl }}
                        style={styles.postImage}
                    />
                    }
                </View>
                <View style={styles.engagementRow}>
                    <TouchableOpacity onPress={handleLikePress}>
                        <Text>❤️ {post.likes}</Text>
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
                        <CommentCard postId={post.id} />
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default PostCard