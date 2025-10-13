import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { fetchUser } from "../Redux/userSlcie";
import { BASE_URL } from "../config";

const LoginScreen = ({ setIsLoggedIn }) => {
  const navigation = useNavigation();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const token = useSelector(state => state.auth.token);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{7,15}$/;

    if (!emailOrPhone) {
      newErrors.emailOrPhone = "Email is required";
    } else if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      newErrors.emailOrPhone = "Enter a valid Email or Phone";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {

    try {
      if (validate()) {
        const res = await axios.post(`${BASE_URL}/auth/login`, {
          email: emailOrPhone,
          password: password,
        }, {
          headers:
          {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
          }
        });
        dispatch(fetchUser(res.data.token));
        console.log(res.data);
        await AsyncStorage.setItem("token", res.data.token);
        setIsLoggedIn(true)
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrors({ general: err.response.data.message });
      } else {
        setErrors({ general: "An error occurred. Please try again." });
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, errors.emailOrPhone && { borderColor: "red" }]}
        placeholder="Email"
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
      />
      {errors.emailOrPhone && (
        <Text style={styles.errorText}>{errors.emailOrPhone}</Text>
      )}

      <TextInput
        style={[styles.input, errors.password && { borderColor: "red" }]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FBFF",
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    width: "100%",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 13,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
});

export default LoginScreen;
