
import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import onbstyles from '../../styles/onbstyles'



export default function Examplemap() {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.dispatch(
      StackActions.push("Continue"))
  };
  return (
    <View style= {onbstyles.container}>
      <Text style={onbstyles.header}>Example Map</Text>
      <TouchableOpacity style={onbstyles.button} onPress={handlePress}>
        <Text style={onbstyles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  )
}