import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import onbstyles from '../../styles/onbstyles';

export default function Onb2() {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.dispatch(
            StackActions.push("Let's Go"))
    };

    return (
        <View style={onbstyles.container}>
            <Image
                source={require('../../assets/onb2.jpg')}
                style={onbstyles.image}
                resizeMode="contain"
            />
            <Text style={onbstyles.header2}>Enable Location Access</Text>
            <Text style={onbstyles.text2}>
                We need your location to provide accurate directions{'\n'}
                to guide you across the campus.
            </Text>
            <TouchableOpacity style={onbstyles.button} onPress={handlePress}>
                <Text style={onbstyles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <Text style={onbstyles.text_mini}>
                We respect your privacy and will only use your location{'\n'}
                for navigation.
            </Text>
        </View>
    );
};
