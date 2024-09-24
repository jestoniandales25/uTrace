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

    return (
      <View style={OBSfirstpageStyles.container}>
        <Text style={OBSfirstpageStyles.textOutside}>Welcome!</Text>
        <Text style={OBSfirstpageStyles.ViewFrame}>Sample</Text>
        <TouchableOpacity style={OBSfirstpageStyles.button} onPress={handleSample}><Text style={OBSfirstpageStyles.buttonText}>Next</Text></TouchableOpacity>
      </View>
    )
}