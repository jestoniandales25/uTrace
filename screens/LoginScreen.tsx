import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from "react-native";
import styles from "../styles/LoginSystemStyles";
import Logo from "../assets/images/Logo.svg";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getAuth, signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "../.firebase/firebaseConfig";
import { initializeApp } from "firebase/app";
import React, { useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";


const app = initializeApp(firebaseConfig);

export default function LoginScreens({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectUri = makeRedirectUri({
    scheme: "uTrace", // Replace with your app's custom scheme if applicable
  });
  const auth = getAuth(app);
  const WEB_CLIENT_ID = "58186438501-g46i1b1vv26ul64nog3pr8b31u0j1mg2.apps.googleusercontent.com";
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: WEB_CLIENT_ID,
    redirectUri,
  });

    // Handle Google Sign-In Respo  nse
    React.useEffect(() => {
      if (response?.type === "success") {
        const { id_token } = response.params;
  
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential)
          .then(() => {
            navigation.replace("InteractiveMap");
          })
          .catch((error) => {
            Alert.alert("Error", error.message);
          });
      }
    }, [response]);

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
        onPress={() => {promptAsync();}}
        disabled={!request}>
        <Ionicons 
          name="logo-google"
          size={24}
          color="black"
          style={styles.googleIcon}
        />
        <Text style={styles.buttonTextGuest}>Continue with Google</Text>
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
