import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import styles from "../styles/LogoutStyles";
import UserIcon from "../assets/images/circle-user-solid.svg";
import Ionicons from "@expo/vector-icons/Ionicons";
import { signOut } from "firebase/auth";
import { auth } from "../.firebase/firebaseConfig";


export default function LogoutScreen({onClose, navigation}) {
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
    const Divider = () => (
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
        </View>
      );

    const [username, setUsername] = useState<string | null>(null);
    useEffect(() => {
      const fetchUser = () => {
        const user = auth.currentUser;
        if (user && user.email) {
          const extractedUsername = user.email.split("@")[0]; // Extract username before '@'
          setUsername(extractedUsername);
        } else {
          setUsername(null); // Handle if no user is logged in
        }
      };
  
      fetchUser();
    }, []);

    const handleLogout = async () => {
      try {
        await signOut(auth);
        // Redirect to Login screen
        navigation.replace("loginScreens");
      } catch (error) {
        console.error("Error logging out:", error.message);
        Alert.alert("Logout Error", "An error occurred while logging out.");
      }
    };

    return (
        <View style={styles.popupContainer}>
        <View style={styles.popupContent}>
          <View style= {styles.popupHeaderContainer}>
            <Text style={styles.popupHeaderText}>Account Settings</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={34} color="#666666" />
            </TouchableOpacity>
          </View>
          <Divider />
          <View style={styles.popupInformationContainer}>
            <View style={styles.popupUserContainer}>
              <UserIcon />
              <Text>{username ? `${username}` : "No User Logged In"}</Text>
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
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
}
