import React, { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/signingAsLoginRegisterStyles';
import Logo from '../assets/images/Logo.svg';


export default function SigningRegister({navigation}) {
    const handleLogin = () => {
    navigation.push('loginScreens');
  }
  return (
    <View style={styles.wrapper}>
      <Logo width={240} height={86}/>
      <Text style={styles.subtitle}>Navigate the Campus, Your Way.</Text>
      <TextInput style={styles.inputText} placeholder="Email Address" />
      <TextInput style={styles.inputText} placeholder="Password" />
      <TextInput style={styles.inputText} placeholder="Confirm Password" />
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.buttonTextLogin}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.accountTextContainer}>
        <Text style={styles.textForAccount}>Already have an account?</Text>
        <TouchableOpacity><Text style={styles.textOpacity} onPress={handleLogin}>Sign In</Text></TouchableOpacity>
      </View>
    </View>
  )
}
