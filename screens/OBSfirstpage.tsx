import {Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import OBSfirstpageStyles from '../styles/OBSfirstpageStyles';

export default function OBSfirstpage() {
    return (
      <View style={OBSfirstpageStyles.container}>
        <Text style={OBSfirstpageStyles.textOutside}>Welcome!</Text>
        <Text style={OBSfirstpageStyles.ViewFrame}>Sample</Text>
        <TouchableOpacity style={OBSfirstpageStyles.button} onPress={() => alert('Button Pressed')}><Text style={OBSfirstpageStyles.buttonText}>Next</Text></TouchableOpacity>
      </View>
    )
}