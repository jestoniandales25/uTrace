import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import styles from "../styles/SplashScreenStyles";
import Wrapper from "../components/Wrapper";
import Logo from "../assets/images/Logo.svg";

const SplashScreen = () => {
  return (
    <Wrapper>
      <View style={styles.view}>
        <Logo width={240} height={86}/>
        <Text style={styles.text}>Navigate the campus, Your Way.</Text>
        <ActivityIndicator size="large" color="#FDB218" style={styles.loading}/>
      </View>
    </Wrapper>
  );
};

export default SplashScreen;
