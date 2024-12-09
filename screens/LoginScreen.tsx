import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../styles/LoginSystemStyles";
import Logo from "../assets/images/Logo.svg";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseConfig } from "../.firebase/firebaseConfig";
import { initializeApp } from "firebase/app";
import React, { useState } from "react";



const app = initializeApp(firebaseConfig);

export default function LoginScreens({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth(app);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    if (email === "" || password === "") {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setEmail("");
      setPassword("");

      navigation.replace("InteractiveMap");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          Alert.alert("Error", "The email address is not valid.");
          break;
        case "auth/user-not-found":
          Alert.alert("Error", "No user found with this email.");
          break;
        case "auth/wrong-password":
          Alert.alert("Error", "Incorrect password.");
          break;
        default:
          Alert.alert("Error", error.message);
      }
    }
  };
  const Divider = () => (
    <View style={styles.dividerContainer}>
      <View style={styles.line} />
      <Text style={styles.orText}>or</Text>
      <View style={styles.line} />
    </View>
  );
  const handleSignUp = () => {
    navigation.push("Registration");
  };
  return (
    <View style={styles.wrapper}>
      <Logo width={240} height={86} />
      <Text style={styles.subtitle}>Navigate the Campus, Your Way.</Text>
      <TextInput style={styles.inputText} placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.inputText} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonTextLogin}>Login</Text>
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity 
        style={styles.googleButton}
        >
        <Ionicons 
          name="logo-google"
          size={24}
          color="black"
          style={styles.googleIcon}
        />
        <Text style={styles.buttonTextGuest}>{isLoggingIn ? "Logging in..." : "Continue with Google"}</Text>
      </TouchableOpacity>
      <View style={styles.accountTextContainer}>
        <Text style={styles.textForAccount}>Don't have an account yet?</Text>
        <TouchableOpacity>
          <Text style={styles.textOpacity} onPress={handleSignUp}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
