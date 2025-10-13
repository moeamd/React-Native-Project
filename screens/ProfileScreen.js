import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import ProfileStats from "../components/statsSection";
import AboutSection from "../components/aboutSection";
// import WorkExperienceSection from "../components/workExperienceSection";
import PostCard from "../components/PostCard";
import { useDispatch } from "react-redux";
import { fetchUser, fetchUserById } from "../Redux/userSlcie";
import { BASE_URL } from "../config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export const ProfileScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { user: authUser, token } = useSelector((state) => state.auth);
  const { user: fetchedUser, viewedUser ,loading } = useSelector((state) => state.user);

  const viewedUserId = route?.params?.userId || null;
  const isMyProfile = !viewedUserId || viewedUserId === authUser?.id;
  

  const handelNewChat = async ()=> {
    try {
      console.log(profileData.id);
      console.log(fetchedUser.id);
      const members = [profileData.id ,fetchedUser.id]
      const token = await AsyncStorage.getItem("token");
      const res = await axios.post(`${BASE_URL}/chats`, {members},{
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);

        navigation.navigate("ChatScreen", {
                  chatId: res.data.id,
                  id: profileData.id,
                  name: profileData.name,
                  image:profileData.imageUrl 
                })
    }catch(err) {
      console.log("From handelNewChat" ,err);
      
    }finally{

    }
  }
  
  useEffect(() => {
    if (isMyProfile) {
      if (token) {
        dispatch(fetchUser(token));
      }
    } else {
      dispatch(fetchUserById(viewedUserId));
    }
  }, [dispatch, viewedUserId, isMyProfile, token]);
useEffect(() => {
  if (!isMyProfile && viewedUser) {
    console.log("تم تحميل بيانات المستخدم:", viewedUser);
  }
}, [viewedUser]);
  
  const profileData = isMyProfile ? fetchedUser || authUser : viewedUser;
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!profileData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No user data found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: profileData.imageUrl }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{profileData.name}</Text>
        <Text style={styles.username}>@{profileData.username}</Text>
        <Text style={styles.bio}>{profileData.bio || "No bio available"}</Text>

        {isMyProfile ? (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton} onPress={()=> handelNewChat()}>
              <Text style={styles.messageText}>Message</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Stats */}
      <ProfileStats
        posts={profileData.postsCount}
        photos={0}
        followers={profileData.followersNum}
        following={profileData.followingNum}
      />

      {/* About */}
      <AboutSection aboutText={profileData.bio || "No bio yet."} />

      {/* Posts Section */}
      <View style={styles.postsSection}>
        <Text style={styles.sectionTitle}>Latest Post</Text>
        {profileData.postsCount > 0 ? (
          <PostCard
            username={profileData.username}
            time="09:00 am"
            content="Sample Post..."
          />
        ) : (
          <Text>No posts yet</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  username: {
    fontSize: 14,
    color: "#777",
  },
  bio: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    marginTop: 8,
  },
  editButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  followButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  messageButton: {
    backgroundColor: "#34C759",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  followText: { color: "#fff", fontWeight: "600" },
  messageText: { color: "#fff", fontWeight: "600" },
  postsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
});

export default ProfileScreen;
