import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "../styles/onbstyles";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding1 from "../screens/onboarding/onb1";
import OnBoarding2 from "../screens/onboarding/onb2";
import OnBoarding3 from "../screens/onboarding/onb3";
import InterMap from "../screens/app";
import MapSample from "../screens/onboarding/examplemap";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeApp = async () => {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        };
        initializeApp();
            },[]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4dd76a" />
            </View>
        )
    }
    
    

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Get Started" component={OnBoarding1} />
            <Stack.Screen name="Continue" component={OnBoarding2} />
            <Stack.Screen name="Let's Go" component={OnBoarding3} />
            <Stack.Screen name="AppName" component={InterMap} />
            <Stack.Screen name="Sample" component={MapSample} />
        </Stack.Navigator>
    );
}
