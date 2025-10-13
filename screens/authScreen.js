import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RegisterScreen from "./RegisterScreen";
import LoginScreen from "./LoginScreen";
import { Ionicons } from "@expo/vector-icons";

export const AuthScreen = ({setIsLoggedIn }) => {
  const [activeTab, setActiveTab] = useState("SignIn");

  return (
    <View style={styles.container}>
      <View style={{flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
        <View style={styles.logoContainer}>
      
          <Text style={styles.logoText}>
            <Text style={{ color: "#000", fontWeight: "700" }}>SOCIAL </Text>
            <Text style={{ color: "#00aaff", fontWeight: "700" }}>MATE</Text>
          </Text>
        </View>
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab("SignIn")}>
            <Text
              style={[
                styles.tabText,
                activeTab === "SignIn" && styles.activeTab,
              ]}
            >
              Sign in
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab("SignUp")}>
            <Text
              style={[
                styles.tabText,
                activeTab === "SignUp" && styles.activeTab,
              ]}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, width: "100%" }}>
        {activeTab === "SignIn" ? <LoginScreen  setIsLoggedIn={setIsLoggedIn} /> : <RegisterScreen />}
      </View>
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
  tabs: {
    flexDirection: "row",
    marginBottom: 30,
  },
  tabText: {
    fontSize: 18,
    color: "#999",
    marginHorizontal: 10,
    fontWeight: "500",
  },
  activeTab: {
    color: "#007AFF",
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
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
});
