import AsyncStorage from "@react-native-async-storage/async-storage";
import { Axios } from "axios";
import { BASE_URL } from "../config";





export const fetchPosts = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        //192.168.11.174
        console.log(token);
        const response = await Axios.get(`${BASE_URL}/posts`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {
        console.error('Error geting posts:', error.message);
    }
}