import React, { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/LoginSystemStyles";
import Logo from "../assets/images/Logo.svg";

export default function SigningAs({ navigation }) {
  const handleLogin = () => {
    navigation.push("loginScreens");
  };
  const handleGuest = () => {
    navigation.push("InteractiveMap", { username: "Guest" });
  };
  return (
    <View style={styles.wrapper}>
      <Logo width={240} height={86} />
      <Text style={styles.subtitle}>Navigate the Campus, Your Way.</Text>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonTextLogin}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.guestButton} onPress={handleGuest}>
        <Text style={styles.buttonTextGuest}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}
