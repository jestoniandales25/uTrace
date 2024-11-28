import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import styles from "../styles/InteractiveMapStyles";
import SearchIcon from "../assets/images/magnifying-glass-solid.svg";
import UserIcon from "../assets/images/circle-user-solid.svg";
import Ionicons from "@expo/vector-icons/Ionicons";


export default function InteractiveMap() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1)
  const formattedYesterday = yesterday.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

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
  const Divider = () => (
    <View style={styles.dividerContainer}>
      <View style={styles.line} />
    </View>
  );

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
        <View style={styles.searchContainer}>
          <View style={styles.searchIconContainer}>
            <SearchIcon />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Where do you want to go?"
          />
        </View>
        <View style={styles.userContainer}>
          <TouchableOpacity style={styles.userButton} onPress={toggleUserPopup}>
            <UserIcon />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.tryButton} onPress={handlePress}>
        <Text style={styles.buttonText}>Try</Text>
      </TouchableOpacity>

      {isUserPopupVisible && (
      <View style={styles.popupContainer}>
        <View style={styles.popupContent}>
          <View style= {styles.popupHeaderContainer}>
            <Text style={styles.popupHeaderText}>Account Settings</Text>
            <TouchableOpacity onPress={toggleUserPopup}>
              <Ionicons name="close" size={34} color="#666666" />
            </TouchableOpacity>
          </View>
          <Divider />
          <View style={styles.popupInformationContainer}>
            <View style={styles.popupUserContainer}>
              <UserIcon />
              <Text>User Account 109</Text>
            </View>
            <Text style={styles.historyText}>History</Text>
            <Divider />
            <Text style={styles.todayText}>
              Today - {formattedDate}
            </Text>
            <View style={styles.popupHistoryContainer}>
                <Text style={styles.popupHistoryText}>Room 09 - 202 | ICT Building | 2nd Floor</Text>
                <Text style={styles.popupHistoryText}>Room 09 - 306 | ICT Building | 3rd Floor</Text> 
            </View>
            <Text style={styles.todayText}>
              Yesterday - {formattedYesterday}
            </Text>
            <View style={styles.popupHistoryContainer}>
                <Text style={styles.popupHistoryText}>Room 09 - 202 | ICT Building | 2nd Floor</Text> 
            </View>
            <Divider /> 
            <TouchableOpacity style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )}

    </View>
  );
}
