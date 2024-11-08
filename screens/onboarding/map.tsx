import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

const MapViewComponent = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 8.485832488668247,
          longitude: 124.65643097510551,
          latitudeDelta: 0.0009,
          longitudeDelta: 0.0009,
        }}
      >
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapViewComponent;
