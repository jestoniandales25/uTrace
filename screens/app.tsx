import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


export default function TrailMap() {
  const INITIAL_REGION = {
    latitude: 8.485888641857303,
    longitude: 124.65667449267691,
    latitudeDelta: 2,
    longitudeDelta: 2
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
      />
    </View>
  )
}