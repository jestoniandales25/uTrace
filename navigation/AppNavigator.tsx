import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapSample from "../screens/onboarding/examplemap";
import OnBoardingScreens from "../screens/onboarding/onBoardingScreens";
import SplashScreen from "../screens/onboarding/SplashScreen";
import UMap from "../screens/onboarding/map";



const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const [isShowSplash, setIsShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsShowSplash(false);
        }, 2000);
        
        return() => clearTimeout(timer);
            },[]);

    if (isShowSplash) {
        return <SplashScreen />;
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OnBoardingScreens" component={OnBoardingScreens} />
            <Stack.Screen name="Sample" component={MapSample} />
            <Stack.Screen name="Map" component={UMap} />
        </Stack.Navigator>
    );
}
