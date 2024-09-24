import {Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import OBSfirstpageStyles from '../styles/OBSfirstpageStyles';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

export default function OBSfirstpage() {
  const navigation = useNavigation();

  const handleSample = () => {
    navigation.dispatch(StackActions.replace('Mapping'));
  }
  const handleSecondPage = () => {
    navigation.dispatch(StackActions.replace('Request Auth'));
  }

    return (
      <View style={OBSfirstpageStyles.container}>
        <View style={OBSfirstpageStyles.imageContainer}><Text style={OBSfirstpageStyles.imageText}>Image Container</Text></View>
        <Text style={OBSfirstpageStyles.textOutside}>Welcome!</Text>
        <Text style={OBSfirstpageStyles.ViewFrame}>Sample</Text>
        <TouchableOpacity style={OBSfirstpageStyles.button} onPress={handleSecondPage}><Text style={OBSfirstpageStyles.buttonText}>Next</Text></TouchableOpacity>
        <TouchableOpacity style={OBSfirstpageStyles.button} onPress={handleSample}><Text style={OBSfirstpageStyles.buttonText}>Map</Text></TouchableOpacity>
      </View>
    )
}