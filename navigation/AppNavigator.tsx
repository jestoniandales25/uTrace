import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding1 from "../screens/onboarding/onb1";
import OnBoarding2 from "../screens/onboarding/onb2";
import OnBoarding3 from "../screens/onboarding/onb3";
import InterMap from "../screens/app";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Get Started" component={OnBoarding1} />
            <Stack.Screen name="Continue" component={OnBoarding2} />
            <Stack.Screen name="Let's Go" component={OnBoarding3} />
            <Stack.Screen name="AppName" component={InterMap} />
        </Stack.Navigator>
    );
}
