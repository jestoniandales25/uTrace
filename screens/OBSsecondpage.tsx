import {Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import OBSsecondpageStyles from '../styles/OBSsecondpageStyles';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

export default function OBSfirstpage() {
  const navigation = useNavigation();

  const handleFirstPage = () => {
    navigation.dispatch(StackActions.replace('Welcome Page'));
  }

  return (
    <View style={OBSsecondpageStyles.container}>
        <View style={OBSsecondpageStyles.imageContainer}><Text style={OBSsecondpageStyles.imageText}>Image Container</Text></View>
        <Text style={OBSsecondpageStyles.textOutside}>Permission Screen</Text>
        <Text style={OBSsecondpageStyles.ViewFrame}>Permission Text</Text>
        <TouchableOpacity style={OBSsecondpageStyles.button}><Text style={OBSsecondpageStyles.buttonText}>Continue</Text></TouchableOpacity>
        <TouchableOpacity style={OBSsecondpageStyles.button} onPress={handleFirstPage}><Text style={OBSsecondpageStyles.buttonText}>Back</Text></TouchableOpacity>
    </View>
  )
}