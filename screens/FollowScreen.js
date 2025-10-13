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
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../Redux/userSlcie";
import { BASE_URL } from "../config";

// ضع هنا IP جهازك بدل localhost لو على موبايل

// دالة لجلب المستخدمين

// الكومبوننت الرئيسية
const FollowScreen = () => {
  const [users, setUsers] = useState([]);
  const { user: currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const API_URL = `${BASE_URL}/users`;

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

  // تأمين القيم الافتراضية
  const followingIds = currentUser.followingId ?? [];
  const followersIds = targetUser.followersId ?? [];

  const isFollowing = followingIds.includes(targetUser.id);

  try {
    // نسخ المستخدمين وتحديثهم
    let updatedCurrentUser = {
      ...currentUser,
      followingId: [...followingIds],
      followingNum: currentUser.followingNum ?? 0,
    };

    let updatedTargetUser = {
      ...targetUser,
      followersId: [...followersIds],
      followersNum: targetUser.followersNum ?? 0,
    };

    if (!isFollowing) {
      // Follow
      updatedCurrentUser.followingId.push(targetUser.id);
      updatedCurrentUser.followingNum += 1;

      updatedTargetUser.followersId.push(currentUser.id);
      updatedTargetUser.followersNum += 1;
    } else {
      // Unfollow
      updatedCurrentUser.followingId = updatedCurrentUser.followingId.filter(
        (id) => id !== targetUser.id
      );
      updatedCurrentUser.followingNum = Math.max(
        0,
        updatedCurrentUser.followingNum - 1
      );

      updatedTargetUser.followersId = updatedTargetUser.followersId.filter(
        (id) => id !== currentUser.id
      );
      updatedTargetUser.followersNum = Math.max(
        0,
        updatedTargetUser.followersNum - 1
      );
    }

    // تحديث البيانات في السيرفر
    await axios.put(`${API_URL}/${currentUser.id}`, {
      followingId: updatedCurrentUser.followingId,
      followingNum: updatedCurrentUser.followingNum,
    });

    await axios.put(`${API_URL}/${targetUser.id}`, {
      followersId: updatedTargetUser.followersId,
      followersNum: updatedTargetUser.followersNum,
    });

    return { success: true, updatedCurrentUser, updatedTargetUser };
  } catch (error) {
    console.error("Error during follow/unfollow:", error.message);
    return { success: false };
  }
};


  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        console.log("Fetched users:", data.users);
        setUsers(data.users);
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
    // تحديث المستخدم الحالي في Redux
    dispatch(updateUser({ 
      id: result.updatedCurrentUser.id, 
      updatedData: {
        followingId: result.updatedCurrentUser.followingId,
        followingNum: result.updatedCurrentUser.followingNum,
      },
    }));

    // تحديث المستخدم الهدف في الواجهة
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
            <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
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
                {(currentUser?.followingId ?? []).includes(user.id)
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
