import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location'

export default function TrailMap() {
  const INITIAL_REGION = {
    latitude: 8.485888641857303,
    longitude: 124.65667449267691,
    latitudeDelta: 2,
    longitudeDelta: 2
  }
  const [location, setLocation] = useState();

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please Grant Location Permissions.");
        return;
      }
    };
    getPermissions();
  }, []);

  return (
    <View style = {{ flex: 1 }}>
      <MapView style = {StyleSheet.absoluteFill}
        provider = {PROVIDER_GOOGLE}
        initialRegion = {INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
      />
    </View>
  )
}