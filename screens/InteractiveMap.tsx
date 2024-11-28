import React, { useMemo, useRef, useState } from "react";
import { Text, TextInput, View, TouchableOpacity, Button } from "react-native";
import { WebView } from "react-native-webview";
import styles from "../styles/InteractiveMapStyles";
import SearchIcon from "../assets/images/magnifying-glass-solid.svg";
import UserIcon from "../assets/images/circle-user-solid.svg";

export default function InteractiveMap() {
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
          <TouchableOpacity style={styles.userButton}>
            <UserIcon />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.tryButton} onPress={handlePress}>
        <Text style={styles.buttonText}>Try</Text>
      </TouchableOpacity>
    </View>
  );
}
