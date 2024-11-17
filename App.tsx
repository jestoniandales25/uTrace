import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import * as Font from "expo-font";

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        const loadFonts = async () => {
        await Font.loadAsync({
            "HankenGrotesk-Regular": require("./assets/fonts/HankenGrotesk-Regular.ttf"),
        });
        setFontLoaded(true);
        };
        
    loadFonts();
    }, []);

    if (!fontLoaded) return null;

    return (
        <NavigationContainer>
            <AppNavigator/>
        </NavigationContainer>
    );
}
