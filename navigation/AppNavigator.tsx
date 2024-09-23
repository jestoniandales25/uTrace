import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OBSfirstpage from "../screens/OBSfirstpage";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome Page" component={OBSfirstpage} /> 
        </Stack.Navigator>
    );
};
