  import React, { useEffect, useState } from "react";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  import InteractiveMap from "../screens/InteractiveMap";
  import OnBoardingScreens from "../screens/OnBoardingScreens";
  import SplashScreen from "../screens/SplashScreen";
  import SigningAs from "../screens/SigningAsScreens";
  import LoginScreens from "../screens/SigningLogin";
  import Registration from "../screens/SigningRegister";


  const Stack = createNativeStackNavigator();

  export default function AppNavigator() {
    const [isShowSplash, setIsShowSplash] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsShowSplash(false);
      }, 2000);

      return () => clearTimeout(timer);
    }, []);

    if (isShowSplash) {
      return <SplashScreen />;
    }

    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoardingScreens" component={OnBoardingScreens} />
        <Stack.Screen name="InteractiveMap" component={InteractiveMap} />
        <Stack.Screen name="SigningAs" component={SigningAs} />
        <Stack.Screen name="loginScreens" component={LoginScreens} />
        <Stack.Screen name="Registration" component={Registration} />
      </Stack.Navigator>
    );
  }
