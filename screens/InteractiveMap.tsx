import React, { useRef, useState } from "react";
import {Text, View, TouchableOpacity, TextInput, Animated, Easing, PanResponder} from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import styles from "../styles/InteractiveMapStyles";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Examplemap() {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(200)).current;

  const containerHeight = useRef(new Animated.Value(200)).current;
  const [currentHeight, setCurrentHeight] = useState(200);

  const handleTryPress = () => {
    setIsVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const handleMapPress = () => {
    navigation.dispatch(StackActions.push("Map"));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (e, gestureState) => {
        const newHeight = 200 - gestureState.dy;
        if (newHeight >= 100 && newHeight <= 600) {
          containerHeight.setValue(newHeight);
          setCurrentHeight(newHeight);
        }
      },

      onPanResponderRelease: (e, gestureState) => {
        const finalHeight = gestureState.dy > 50 ? 200 : 400;
        if (gestureState.dy > 50) {
          Animated.timing(slideAnim, {
            toValue: 200,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
          }).start(() => setIsVisible(false));
        } else {
          Animated.spring(containerHeight, {
            toValue: finalHeight,
            useNativeDriver: false,
          }).start();
        }
        setCurrentHeight(finalHeight);
      },
    })
  ).current;

  return (
    <View style={styles.container}>

      <View style={styles.searchContainer}>
        <Ionicons
          style={styles.searchIcon}
          name="search"
          size={24}
          color="black"
        />
        <TextInput
          style={styles.userInputWithIcon}
          placeholder="Where do you want to go?"
        />
      </View>

      <TouchableOpacity style={styles.tryButton} onPress={handleTryPress}>
        <Text style={styles.buttonText}>Try</Text>
      </TouchableOpacity>

      {isVisible && (
        <Animated.View
          style={[
            styles.animatedContainer,
            { transform: [{ translateY: slideAnim }], height: containerHeight },
          ]}
        >
          <View {...panResponder.panHandlers} style={styles.resizableHeader}>
            <Ionicons name="remove-outline" size={24} color="black" />
          </View>
          <Text style={styles.containerText}>
            I'm sliding from the bottom!
          </Text>
        </Animated.View>
      )}
    </View>
  );
}
