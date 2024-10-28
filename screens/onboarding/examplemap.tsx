import React, { useRef, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Animated, Easing, PanResponder } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import navstyles from '../../styles/navstyles';
import Ionicons from '@expo/vector-icons/Ionicons'

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
    <View style={navstyles.container}>
      <Text style={navstyles.header}>Example Map</Text>

      <View style={navstyles.searchContainer}>
        <Ionicons style={navstyles.searchIcon} name="search" size={24} color="black" />
        <TextInput style={navstyles.userInputWithIcon} placeholder="Where do you want to go?" />
      </View>

      <TouchableOpacity style={navstyles.tryButton} onPress={handleTryPress}>
        <Text style={navstyles.buttonText}>Try</Text>
      </TouchableOpacity>
      
      {isVisible && (
        <Animated.View 
          style={[
            navstyles.animatedContainer,
            { transform: [{ translateY: slideAnim }], height: containerHeight },
          ]}
        >
          <View
            {...panResponder.panHandlers}
            style={navstyles.resizableHeader}
          >
            <Ionicons name="remove-outline" size={24} color="black" />
          </View>
          <Text style={navstyles.containerText}>I'm sliding from the bottom!</Text>
        </Animated.View>
      )}
    </View>
  );
}
