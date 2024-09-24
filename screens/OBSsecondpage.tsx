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
        <TouchableOpacity style={OBSsecondpageStyles.button} onPress={handleFirstPage}><Text style={OBSsecondpageStyles.buttonText}>Back</Text></TouchableOpacity>
    </View>
  )
}