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
import { useSelector, useDispatch } from "react-redux";

// 🟦 غيّر IP إلى IP جهازك الحقيقي
const API_URL = "http://10.150.220.39:5000/api/users";

// 🟩 دالة آمنة لجلب المستخدمين
const fetchUsers = async () => {
  try {
    const res = await axios.get(API_URL);
    const data = res.data;

    if (Array.isArray(data)) return data;
    if (Array.isArray(data.users)) return data.users;
    if (Array.isArray(data.data)) return data.data;

    console.warn("⚠️ Unexpected API response:", data);
    return [];
  } catch (error) {
    console.error("❌ Error fetching users:", error.message);
    return [];
  }
};

// 🟦 دالة للفولو / أنفولو
const handleFollowToggle = async (currentUser, targetUser) => {
  if (!currentUser || !targetUser) return { success: false };

  const isFollowing = currentUser.followingId?.includes(targetUser.id);

  try {
    let updatedCurrentUser = { ...currentUser };
    let updatedTargetUser = { ...targetUser };

    if (!isFollowing) {
      // ➕ Follow
      updatedCurrentUser.followingId = [
        ...(updatedCurrentUser.followingId || []),
        targetUser.id,
      ];
      updatedCurrentUser.followingNumber =
        (updatedCurrentUser.followingNumber || 0) + 1;

      updatedTargetUser.followersId = [
        ...(updatedTargetUser.followersId || []),
        currentUser.id,
      ];
      updatedTargetUser.followersNumber =
        (updatedTargetUser.followersNumber || 0) + 1;
    } else {
      // ➖ Unfollow
      updatedCurrentUser.followingId = (updatedCurrentUser.followingId || []).filter(
        (id) => id !== targetUser.id
      );
      updatedCurrentUser.followingNumber = Math.max(
        (updatedCurrentUser.followingNumber || 1) - 1,
        0
      );

      updatedTargetUser.followersId = (updatedTargetUser.followersId || []).filter(
        (id) => id !== currentUser.id
      );
      updatedTargetUser.followersNumber = Math.max(
        (updatedTargetUser.followersNumber || 1) - 1,
        0
      );
    }

    // ✅ تحديث البيانات في السيرفر
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
    console.error("❌ Error during follow/unfollow:", error.message);
    return { success: false };
  }
};

const FollowScreen = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  // 🟩 غيّر اسم المتغير عشان ميتعارضش مع useSelector
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🟦 تحميل المستخدمين من السيرفر
  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUserList(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    loadUsers();
  }, []);

  // 🟩 زرار الفولو
  const onFollowPress = async (targetUser) => {
    const result = await handleFollowToggle(currentUser, targetUser);
    if (result.success) {
      // 🔄 تحديث الواجهة
      setUserList((prevUsers) =>
        prevUsers.map((u) =>
          u.id === targetUser.id ? result.updatedTargetUser : u
        )
      );

      // لو عندك slice في Redux للمستخدم الحالي:
      // dispatch(updateUser(result.updatedCurrentUser));
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!Array.isArray(userList)) {
    return (
      <View style={styles.center}>
        <Text>⚠️ Unexpected data format from server</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover People</Text>
      </View>

      <ScrollView>
        {userList.map((user) => (
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
                {currentUser.followingId?.includes(user.id)
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
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#333" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: "600", color: "#222" },
  followers: { fontSize: 14, color: "#777" },
  followBtn: {
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  followText: { color: "#fff", fontWeight: "bold" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default FollowScreen;
