import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import OBSfirstpageStyles from '../styles/OBSfirstpageStyles';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

export default function OBSfirstpage() {
    return (
      <View style={OBSfirstpageStyles.container}>
        <Text style={OBSfirstpageStyles.textOutside}>OBPfirstpage</Text>
      </View>
    )
}