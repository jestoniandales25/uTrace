import React, { useState, useRef } from "react";
import { Text, TextInput, View, TouchableOpacity, Animated } from "react-native";
import { WebView } from "react-native-webview";
import styles from "../styles/InteractiveMapStyles";
import SearchIcon from "../assets/images/magnifying-glass-solid.svg";
import UserIcon from "../assets/images/circle-user-solid.svg";
import LogoutScreen from "./LogoutScreen";


export default function InteractiveMap() {
  const [isFocused, setIsFocused] = useState(false); 
  const searchContainerWidthAnim = useRef(new Animated.Value(250)).current; 
  const userContainerAnim = useRef(new Animated.Value(1)).current; 
  
  const handleFocus = () => {
    setIsFocused(true);
  
    //Animation for adjustments
    Animated.timing(searchContainerWidthAnim, {
      toValue: 330, 
      duration: 300,
      useNativeDriver: false, 
    }).start();
  
    Animated.timing(userContainerAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  
  const handleBlur = () => {
    setIsFocused(false);
  
    //Default for adjustments
    Animated.timing(searchContainerWidthAnim, {
      toValue: 300, 
      duration: 300,
      useNativeDriver: false, 
    }).start();
  
    Animated.timing(userContainerAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  

  const [isUserPopupVisible, setUserPopupVisible] = useState(false);
  const toggleUserPopup = () => {
    setUserPopupVisible(!isUserPopupVisible);
  };
  //LOG DATA LOCATION TEST, will be removed after debugging
  const handleWebViewMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log(`Latitude: ${data.lat}, Longitude: ${data.lng}`);
  };
  // ============================================================
  const [isOn, setIsOn] = useState(false);

  const handlePress = () => {
    setIsOn(!isOn);
  };

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={require("../assets/maps/maps.html")}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={handleWebViewMessage}
        style={styles.map}
      />
      <View style={styles.topContainer}>
        <Animated.View
          style={[
            styles.searchContainer,
            { width: searchContainerWidthAnim }, // Animated width
          ]}
        >
          <View style={styles.searchIconContainer}>
            <SearchIcon />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Where do you want to go?"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Animated.View>
      
        <Animated.View style={[styles.userContainer, { opacity: userContainerAnim, transform: [{ scale: userContainerAnim }], }]}>
          <TouchableOpacity style={styles.userButton} onPress={toggleUserPopup}>
            <UserIcon />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <TouchableOpacity style={styles.tryButton} onPress={handlePress}>
        <Text style={styles.buttonText}>Try</Text>
      </TouchableOpacity>

      {isUserPopupVisible && (
      <LogoutScreen onClose={toggleUserPopup} />
    )}

    </View>
  );
}
