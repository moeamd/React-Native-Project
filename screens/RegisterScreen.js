import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios"; 
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null); 

  const [errors, setErrors] = useState({
    usernameErr: "",
    fullNameErr: "",
    emailErr: "",
    passwordErr: "",
    confirmPasswordErr: "",
  });

  const navigation = useNavigation(); 

  // static usernames to simulate API
  const existingUsernames = ["nada123", "ahmed", "mohamed98", "userTest"];

  const validate = () => {
    let valid = true;
    let tempErrors = {
      usernameErr: "",
      fullNameErr: "",
      emailErr: "",
      passwordErr: "",
      confirmPasswordErr: "",
    };

    if (username.length === 0) {
      tempErrors.usernameErr = "Username is required";
      valid = false;
    } else if (username.length < 3) {
      tempErrors.usernameErr = "Username must be at least 3 characters";
      valid = false;
    } else if (existingUsernames.includes(username.toLowerCase())) {
      tempErrors.usernameErr = "Username already taken";
      valid = false;
    }

    if (fullName.length === 0) {
      tempErrors.fullNameErr = "Full name is required";
      valid = false;
    } else if (fullName.length < 3) {
      tempErrors.fullNameErr = "Full name must be at least 3 characters";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length === 0) {
      tempErrors.emailErr = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      tempErrors.emailErr = "Enter a valid email address";
      valid = false;
    }

    if (password.length === 0) {
      tempErrors.passwordErr = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      tempErrors.passwordErr = "Password must be at least 6 characters";
      valid = false;
    }

    if (confirmPassword.length === 0) {
      tempErrors.confirmPasswordErr = "Please confirm your password";
      valid = false;
    } else if (confirmPassword !== password) {
      tempErrors.confirmPasswordErr = "Passwords do not match";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  // Pick image
  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  //Send data to backend
  const handleRegister = async () => {
    if (!validate()) return;

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("name", fullName);
      formData.append("email", email);
      formData.append("password", password);

      // if (image) {
      //   formData.append("image", {
      //     uri: image,
      //     type: "image/jpeg",
      //     name: "profile.jpg",
      //   });
      // }

      await axios.post("http://localhost:5000/api/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigation.navigate("login"); //move to login screen
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        emailErr:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      }));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={[styles.input, errors.usernameErr ? styles.inputError : null]}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        {errors.usernameErr ? (
          <Text style={styles.errorText}>{errors.usernameErr}</Text>
        ) : null}

        <TextInput
          style={[styles.input, errors.fullNameErr ? styles.inputError : null]}
          placeholder="Your Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        {errors.fullNameErr ? (
          <Text style={styles.errorText}>{errors.fullNameErr}</Text>
        ) : null}

        <TextInput
          style={[styles.input, errors.emailErr ? styles.inputError : null]}
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {errors.emailErr ? (
          <Text style={styles.errorText}>{errors.emailErr}</Text>
        ) : null}

        <TextInput
          style={[styles.input, errors.passwordErr ? styles.inputError : null]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors.passwordErr ? (
          <Text style={styles.errorText}>{errors.passwordErr}</Text>
        ) : null}

        <TextInput
          style={[
            styles.input,
            errors.confirmPasswordErr ? styles.inputError : null,
          ]}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {errors.confirmPasswordErr ? (
          <Text style={styles.errorText}>{errors.confirmPasswordErr}</Text>
        ) : null}

        {/*Pick image */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#ccc" }]}
          onPress={handlePickImage}
        >
          <Text style={styles.buttonText}>
            {image ? "Image Selected " : "Select Profile Image"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
    backgroundColor: "#fff",
  },
  form: {
    width: "85%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 5,
    fontSize: 13,
  },
  button: {
    backgroundColor: "#00aaff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

