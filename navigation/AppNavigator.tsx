import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OBSfirstpage from "../screens/OBSfirstpage";
import TrailMap from "../screens/Mapping";
import OBSsecondpage from "../screens/OBSsecondpage";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome Page" component={OBSfirstpage} /> 
            <Stack.Screen name="Mapping" component={TrailMap} />
            <Stack.Screen name="Request Auth" component={OBSsecondpage} />
        </Stack.Navigator>
    );
};
