import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, fetchUser } from "../Redux/userSlcie";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const [token, setToken] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    imageUrl: "",
  });

  // ✅ جلب التوكن من AsyncStorage
  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      console.log("Loaded token:", storedToken);
      setToken(storedToken);
    };
    loadToken();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        bio: user.bio || "",
        imageUrl: user.imageUrl || "",
      });
    }
  }, [user]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled) {
      handleChange("imageUrl", result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }

    try {
      await dispatch(updateUser({ updatedData: formData, id: user.id })).unwrap();

      if (token) {
        await dispatch(fetchUser(token));
        console.log("Updated user successfully with token:", token);
      } else {
        console.log("⚠️ Token is null");
      }

      Alert.alert("Success", "Profile updated");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", err.message || "Failed to update");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.imageSection} onPress={pickImage}>
        <Image
          source={
            formData.imageUrl
              ? { uri: formData.imageUrl }
              : require("../assets/avatar.jpg")
          }
          style={styles.profileImage}
        />
        <Text style={styles.changePhotoText}>Change Photo</Text>
      </TouchableOpacity>

      <View style={styles.formSection}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => handleChange("name", text)}
        />

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={formData.username}
          onChangeText={(text) => handleChange("username", text)}
        />

        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.bio}
          onChangeText={(text) => handleChange("bio", text)}
          multiline
        />
      </View>

      <TouchableOpacity
        style={[styles.saveButton, loading && styles.disabledButton]}
        onPress={handleSave}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Save Changes</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  imageSection: {
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  changePhotoText: {
    marginTop: 8,
    color: "#007AFF",
  },
  formSection: { padding: 16 },
  label: { fontWeight: "600", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  textArea: { height: 80, textAlignVertical: "top" },
  saveButton: {
    backgroundColor: "#007AFF",
    margin: 16,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontWeight: "bold" },
  disabledButton: { backgroundColor: "#ccc" },
});

export default EditProfileScreen;
