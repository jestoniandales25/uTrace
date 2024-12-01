import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../styles/LogoutStyles";
import UserIcon from "../assets/images/circle-user-solid.svg";
import Ionicons from "@expo/vector-icons/Ionicons";


export default function LogoutScreen({onClose}) {
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
    )
}
