import { View, Text, Image, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from 'react'
import { styles } from '../styles/HomeScreenStyle'
import CommentCard from './CommentCard';
import UserCard from './UserCard';
import axios from 'axios';
import * as Clipboard from 'expo-clipboard';
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const PostCard = ({ post }) => {

    const [menuVisible, setMenuVisible] = useState(false);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [commentText, setCommentText] = useState('');

    const handleCommentPress = () => {
        setShowCommentBox(prev => !prev);
    };

    const handleSubmitComment = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.post(
                `${BASE_URL}/comments/${post.id}`,
                { content: commentText }, // plain JSON body
                { headers: { Authorization: `Bearer ${token}`, }, }
            );

            console.log('Comment submitted:', response.data);
            setCommentText('');
            setShowCommentBox(false);
            handleCommentFetch();
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
    const handleUpdatePost = async (post) => {
        try {
            // Get saved token
            const token = await AsyncStorage.getItem("token");

            const response = await axios.put(
                `${BASE_URL}/posts/${post._id}`,
                {
                    title: post.title,
                    content: post.content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            console.log("Post updated successfully:", response.data);


        } catch (error) {
            console.error("Error updating post:", error.message);
        }
    };

    const handleCopyLink = async (postId) => {
        try {
            const postLink = `${BASE_URL}/posts/${postId}`;
            await Clipboard.setStringAsync(postLink);
            Alert.alert("Link Copied", "The post link has been copied to your clipboard!");
        } catch (error) {
            console.error("Error copying link:", error.message);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            // Get token from AsyncStorage
            const token = await AsyncStorage.getItem("token");

            // Send delete request
            const response = await axios.delete(
                `${BASE_URL}/posts/${postId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log("Post deleted successfully:", response.data);

        } catch (error) {
            console.error("Error deleting post:", error.message);
        }
    }

    const handleReportPost = () => {

    }

    const handleLikePress = () => {
    }

    const [comments, setComments] = useState([]);
    const handleCommentFetch = async () => {
        const postId = post.id;
        useEffect(() => {
            const fetchData = async () => {
                try {
                    //192.168.11.174    
                    console.log('Fetching comments for postId:', postId);
                    const token = await AsyncStorage.getItem("token");
                    const response = await axios.get(`${BASE_URL}/comments/${postId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    setComments(response.data)
                    console.log(comments)
                } catch (error) {
                    console.error('Error geting comments:', error.message);
                }
            }
            fetchData();
        }, [])
    }
    handleCommentFetch();


    const { user, loading } = useSelector((state) => state.user);
    const isOwner = user && post && (user.id === post.authorId);
    console.log("user" + user.id);
    console.log("post" + post.authorId);
    return (
        <TouchableWithoutFeedback style={{ flex: 1, zIndex: 0 }} onPress={() => setMenuVisible(false)}>
            <View style={[styles.postContainer, { position: 'relative' }, { ...StyleSheet.absoluteFillObject }]}>
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
                            style={styles.menuDropDown}>
                            {isOwner && (
                                <TouchableOpacity onPress={() => {
                                    handleUpdatePost(post);
                                    setMenuVisible(false);
                                }}>
                                    <Text style={{ paddingVertical: 6 }}>Edit</Text>
                                </TouchableOpacity>
                            )}

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
                            {isOwner && (
                                <TouchableOpacity onPress={() => {
                                    handleDeletePost(post.id);
                                    setMenuVisible(false);
                                }}>
                                    <Text style={{ paddingVertical: 6, color: 'red' }}>Delete</Text>
                                </TouchableOpacity>
                            )}
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
                    <TouchableOpacity onPress={() => { handleCommentPress(); handleCommentFetch(); }}>
                        <Text>💬{Array.isArray(comments) ? comments.length : 0} </Text>
                    </TouchableOpacity>


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
                            <TouchableOpacity onPress={() => { handleSubmitComment(); handleCommentFetch(); }}>

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