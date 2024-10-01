import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import onbstyles from '../../styles/onbstyles';
import * as Location from 'expo-location'

export default function Onb3() {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.dispatch(
            StackActions.replace("AppName"))
    };

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
        <View style={onbstyles.container}>
            <Image
                source={require('../../assets/onb3.jpg')}
                style={onbstyles.image3}
                resizeMode="contain"
            />
            <Text style={onbstyles.header3}>You're Ready To Explore!</Text>
            <Text style={onbstyles.text3}>
                Start navigating the campus with our real-time{'\n'}
                interactive map.
            </Text>
            <TouchableOpacity style={onbstyles.button} onPress={handlePress}>
                <Text style={onbstyles.buttonText}>Let's Go</Text>
            </TouchableOpacity>
        </View>
    );
};
