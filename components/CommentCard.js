


import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import UserCard from './UserCard'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';

const CommentCard = ({postId}) => {
    const [comments, setComments] = useState([]);

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
    }, [postId])
    
    return (
        <>
            {comments.map((comment, index) => (
                <View key={index} style={{ marginTop: 10, backgroundColor: '#eee', padding: 10, borderRadius: 8 }}>
                    <UserCard props={comment} />
                    <View>
                        <Text>{comment.content}</Text>
                    </View>
                </View>
            ))
            }
        </>
    )
}

export default CommentCard