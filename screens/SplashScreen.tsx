import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import styles from "../styles/SplashScreenStyles";
import Logo from "../assets/images/Logo.svg";

export default function SplashScreen() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.view}>
        <Logo width={240} height={86}/>
        <Text style={styles.text}>Navigate the campus, Your Way.</Text>
        <ActivityIndicator size="large" color="#FDB218" style={styles.loading}/>
      </View>
    </View>
  );
};
