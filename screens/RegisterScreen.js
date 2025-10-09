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

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    usernameErr: "",
    fullNameErr: "",
    emailErr: "",
    passwordErr: "",
    confirmPasswordErr: "",
  });

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

    // Username validation
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

    // Full name validation
    if (fullName.length === 0) {
      tempErrors.fullNameErr = "Full name is required";
      valid = false;
    } else if (fullName.length < 3) {
      tempErrors.fullNameErr = "Full name must be at least 3 characters";
      valid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length === 0) {
      tempErrors.emailErr = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      tempErrors.emailErr = "Enter a valid email address";
      valid = false;
    }

    // Password validation
    if (password.length === 0) {
      tempErrors.passwordErr = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      tempErrors.passwordErr = "Password must be at least 6 characters";
      valid = false;
    }

    // Confirm password validation
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

  const handleRegister = () => {
    validate();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.iconCircle}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={28}
              color="#00aaff"
            />
          </View>
          <Text style={styles.logoText}>
            <Text style={{ color: "#000", fontWeight: "700" }}>SOCIAL </Text>
            <Text style={{ color: "#00aaff", fontWeight: "700" }}>MATE</Text>
          </Text>
        </View>

        <View style={styles.tabContainer}>
          <Text style={[styles.tab, { color: "#888" }]}>Sign in</Text>
          <Text style={[styles.tab, styles.activeTab]}>Sign up</Text>
        </View>
      </View>

      {/* Form */}
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
          style={[
            styles.input,
            errors.fullNameErr ? styles.inputError : null,
          ]}
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
  header: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e6f7ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  logoText: {
    fontSize: 24,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tab: {
    fontSize: 16,
    marginHorizontal: 15,
    paddingBottom: 5,
  },
  activeTab: {
    color: "#00aaff",
    borderBottomWidth: 2,
    borderBottomColor: "#00aaff",
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
