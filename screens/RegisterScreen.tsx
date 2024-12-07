import React, { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../styles/LoginSystemStyles";
import Logo from "../assets/images/Logo.svg";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db, firebaseConfig } from "../.firebase/firebaseConfig"; // Update the path based on your file structure
import { initializeApp } from "firebase/app";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";

const app = initializeApp(firebaseConfig);

export default function SigningRegister({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const auth = getAuth(app);

  const handleLogin = () => {
    navigation.push("loginScreens");
  };

  const handleSignUp = async () => {
    if (email === "" || password === "" || confirmPassword === "") {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
  
    try {
      // Create the user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Create a user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date().toISOString(),
      });
  
      Alert.alert("Success", "Account created successfully!");
  
      setEmail("");
      setPassword("");
      setConfirmPassword("");
  
      navigation.push("loginScreens");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  return (
    <View style={styles.wrapper}>
      <Logo width={240} height={86} />
      <Text style={styles.subtitle}>Navigate the Campus, Your Way.</Text>
      <TextInput style={styles.inputText} placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address"/>
      <TextInput style={styles.inputText} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>
      <TextInput style={styles.inputText} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry/>
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.buttonTextLogin} onPress={handleSignUp}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.accountTextContainer}>
        <Text style={styles.textForAccount}>Already have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.textOpacity} onPress={handleLogin}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
