import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Alert, ScrollView } from "react-native";
import styles from "../styles/LogoutStyles";
import UserIcon from "../assets/images/circle-user-solid.svg";
import Ionicons from "@expo/vector-icons/Ionicons";
import { signOut } from "firebase/auth";
import { auth } from "../.firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../.firebase/firebaseConfig";


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

    const [history, setHistory] = useState<
          { room: string; timestamp: string }[]
        >([]);
    // Fetch user history from Firestore
    useEffect(() => {
      const fetchHistory = async () => {
        try {
          const user = auth.currentUser;
          if (!user) return;

          const userRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            setHistory(userData.history || []);
          } else {
            console.log("No history found for the user.");
            setHistory([]);
          }
        } catch (error) {
          console.error("Error fetching user history:", error.message);
        }
      };

      fetchHistory();
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
            <ScrollView>
            {history.length > 0 ? (
              history.map((entry, index) => (
                <View key={index} style={styles.popupHistoryContainer}>
                  <Text style={styles.popupHistoryText}>
                    {entry.room} - {new Date(entry.timestamp).toLocaleString()}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.noHistoryText}>No history available</Text>
            )}
          </ScrollView>
            <Divider /> 
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
}
