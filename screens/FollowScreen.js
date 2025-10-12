import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

// ضع هنا IP جهازك بدل localhost لو على موبايل
const API_URL = "http://192.168.1.6:5000/api/users";

// دالة لجلب المستخدمين
const fetchUsers = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
};

// دالة للفولو / أنفولو
const handleFollowToggle = async (currentUser, targetUser) => {
  if (!currentUser || !targetUser) return { success: false };

  const isFollowing = currentUser.followingId.includes(targetUser.id);

  try {
    let updatedCurrentUser = { ...currentUser };
    let updatedTargetUser = { ...targetUser };

    if (!isFollowing) {
      // Follow
      updatedCurrentUser.followingId.push(targetUser.id);
      updatedCurrentUser.followingNumber += 1;

      updatedTargetUser.followersId.push(currentUser.id);
      updatedTargetUser.followersNumber += 1;
    } else {
      // Unfollow
      updatedCurrentUser.followingId = updatedCurrentUser.followingId.filter(
        (id) => id !== targetUser.id
      );
      updatedCurrentUser.followingNumber -= 1;

      updatedTargetUser.followersId = updatedTargetUser.followersId.filter(
        (id) => id !== currentUser.id
      );
      updatedTargetUser.followersNumber -= 1;
    }

    // تحديث السيرفر
    await axios.put(`${API_URL}/${currentUser.id}`, {
      followingId: updatedCurrentUser.followingId,
      followingNumber: updatedCurrentUser.followingNumber,
    });
    await axios.put(`${API_URL}/${targetUser.id}`, {
      followersId: updatedTargetUser.followersId,
      followersNumber: updatedTargetUser.followersNumber,
    });

    return { success: true, updatedCurrentUser, updatedTargetUser };
  } catch (error) {
    console.error("Error during follow/unfollow:", error.message);
    return { success: false };
  }
};

// الكومبوننت الرئيسية
const FollowScreen = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    followingId: [],
    followingNumber: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const onFollowPress = async (targetUser) => {
    const result = await handleFollowToggle(currentUser, targetUser);
    if (result.success) {
      // تحديث UI مباشرة
      setCurrentUser(result.updatedCurrentUser);
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === targetUser.id ? result.updatedTargetUser : u
        )
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover People</Text>
      </View>

      <ScrollView>
        {users.map((user) => (
          <View key={user.id} style={styles.card}>
            <Image source={{ uri: user.image }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.followers}>
                {user.followersNumber || 0} followers
              </Text>
            </View>

            <TouchableOpacity
              style={styles.followBtn}
              onPress={() => onFollowPress(user)}
            >
              <Text style={styles.followText}>
                {currentUser.followingId.includes(user.id)
                  ? "Unfollow"
                  : "Follow"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7faff", paddingTop: 40 },
  header: { alignItems: "center", marginBottom: 10 },
  title: { fontSize: 20, fontWeight: "600" },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    marginHorizontal: 15,
    marginVertical: 6,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
  },
  avatar: { width: 45, height: 45, borderRadius: 25 },
  info: { flex: 1, marginLeft: 10 },
  name: { fontWeight: "600", fontSize: 16 },
  followers: { color: "gray", fontSize: 13 },
  followBtn: {
    backgroundColor: "#007bff",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  followText: { color: "#fff", fontWeight: "500" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FollowScreen;