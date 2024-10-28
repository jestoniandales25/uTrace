import { View, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import styles from '../../styles/SplashScreenStyles';



const SplashScreen = () => {
  return (
    <View style={styles.container}>
        <View>
            <Image 
                source={require('../../assets/uTraceLogo.png')}
                style={styles.splashScreen}
              />
            <ActivityIndicator 
              size="large" 
              color="#4dd76a" 
              style={styles.loadingIndicator}
            />
        </View>
    </View>
  )
}

export default SplashScreen