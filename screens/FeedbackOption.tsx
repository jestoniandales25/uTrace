import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, } from "react-native";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../.firebase/firebaseConfig";
import styles from "../styles/FeedbackOptionStyles";

export default function FeedbackOption({ navigation }) {
  const [feedback, setFeedback] = useState("");
  const [userData, setUserData] = useState({ username: "Guest", userId: null });

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUserData({
        username: currentUser.displayName || currentUser.email || "Anonymous",
        userId: currentUser.uid,
      });
    }
  }, []);

  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) {
      Alert.alert("Error", "Feedback cannot be empty!");
      return;
    }
    try {
      const feedbackRef = collection(db, "feedback");
      await addDoc(feedbackRef, {
        username: userData.username,
        feedback,
        userId: userData.userId, // Null for guests
        timestamp: serverTimestamp(),
      });
      Alert.alert("Success", "Thank you for your feedback!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "An error occurred while submitting feedback.");
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.popupContent}>
        <Text style={styles.feedbackText}>Feedback</Text>
        <TextInput
          style={styles.inputText}
          multiline
          placeholder="Share your thoughts..."
          value={feedback}
          onChangeText={setFeedback}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback} >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
