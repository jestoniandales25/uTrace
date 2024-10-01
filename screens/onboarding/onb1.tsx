import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import onbstyles from '../../styles/onbstyles';

export default function Onb1() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.dispatch(
      StackActions.push("Continue"))
  };

  return (
    <View style={onbstyles.container}>
      <Image
        source={require('../../assets/onb1.png')}
        style={onbstyles.image}
        resizeMode="contain"
      />
      <Text style={onbstyles.header}>Welcome to TrailMap</Text>
      <Text style={onbstyles.text}>
        Your personal guide to navigating the campus with ease.{'\n'}
        Let's help you get where you need to go!
      </Text>
      <TouchableOpacity style={onbstyles.button} onPress={handlePress}>
        <Text style={onbstyles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};
