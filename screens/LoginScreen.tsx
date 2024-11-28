import React, { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../styles/LoginSystemStyles";
import Logo from "../assets/images/Logo.svg";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function LoginScreens({ navigation }) {
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
      <TextInput style={styles.inputText} placeholder="Email Address" />
      <TextInput style={styles.inputText} placeholder="Password" />
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.buttonTextLogin}>Login</Text>
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity style={styles.googleButton}>
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
