import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Alert, ScrollView } from "react-native";
import styles from "../styles/AccountSettingsPopUpStyles";
import UserIcon from "../assets/images/icons/circle-user-solid.svg";
import Ionicons from "@expo/vector-icons/Ionicons";
import { signOut } from "firebase/auth";
import { auth } from "../.firebase/firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../.firebase/firebaseConfig";


export default function LogoutScreen({onClose, navigation}) {
  const [username, setUsername] = useState<string | null>(null);
  const [history, setHistory] = useState<{ searchTerm: string; timestamp: string }[]>([]);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1)

  const formattedDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
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
  const getFormattedDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString(); 
    }
  };
  const fetchUserHistory = async (user) => {
    try {
      const historyRef = collection(db, "users", user.uid, "history");
      const historyQuery = query(historyRef, orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(historyQuery);

      const historyData = querySnapshot.docs.map((doc) => ({
        id: doc.id, 
        searchTerm: doc.data().searchTerm,
        timestamp: doc.data().timestamp,
      })).slice(0, 4);;
      setHistory(historyData);
    } catch (error) {
      console.error("Error fetching user history:", error.message);
      setHistory([]); 
    }
  };
      
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && user.email) {
        const extractedUsername = user.email.split("@")[0];
        setUsername(extractedUsername);
  
        try {
          await fetchUserHistory(user);
        } catch (error) {
          console.error("Error fetching user history:", error.message);
          setHistory([]); 
        }
      } else {
        setUsername(null);
        setHistory([]); 
      }
    });
  
    return () => unsubscribe(); 
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
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
            <>
              {history.some((entry) => getFormattedDate(entry.timestamp) === "Today") && (
                <View style={styles.popupHistoryContainer}>
                  <Text style={styles.historyText}>Today - {formattedDate}</Text>
                  {history.filter((entry) => getFormattedDate(entry.timestamp) === "Today").map((entry, index) => (
                    <Text key={index} style={styles.popupHistoryText}>
                      {entry.searchTerm}
                    </Text>
                  ))}
                </View>
              )}
              {history.some((entry) => getFormattedDate(entry.timestamp) === "Yesterday" ) && (
                <View style={styles.popupHistoryContainer}>
                  <Text style={styles.historyText}>Yesterday - {formattedYesterday}</Text>
                  {history.filter((entry) => getFormattedDate(entry.timestamp) === "Yesterday").map((entry, index) => (
                    <Text key={index} style={styles.popupHistoryText}>
                      {entry.searchTerm}
                    </Text>
                  ))}
                </View>
              )}
            </>
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
