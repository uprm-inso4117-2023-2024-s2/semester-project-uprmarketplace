import React, { useState } from 'react';  // Imports React library and useState hook for managing component state.
import { Text, View } from "@/components/Themed"; // Imports custom Text and View components from "@/components/Themed" for themed UI elements. 
import { TextInput, StyleSheet, Pressable, Image, Dimensions } from 'react-native';  // Imports various React Native components and APIs for UI and device features.
import { useNavigation, router } from 'expo-router'; // Imports useNavigation hook for navigation and router object for programmatic navigation from 'expo-router'.

const dimensions = Dimensions.get('window');  // Gets device window dimensions for responsive design.

const ForgotPasswordPage = () => {

  // useState hooks to manage the email input and error message states.
  const [email, setEmail] = useState('');
  const [errMsg, setErrMsg] = useState('');

  // Hook to access the navigation object for navigating between screens.
  const navigation = useNavigation();


  const handlePasswordReset = async () => {
    // Placeholder for your password reset logic
    setErrMsg('');

    // Validates the email address to ensure it ends with '@upr.edu'.
    if (!email.endsWith('@upr.edu')) {
      setErrMsg('Please enter a valid UPRM email address.');
      return;
    }

    // Displays an alert indicating the password reset link has been sent.
    alert('Password reset link has been sent to your email.');
    
    // Navigates to the 'ResetPass' screen.
    router.navigate('ResetPass');
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.greenBar}>
        <Text style={styles.greenBarText}>UPRM Marketplace</Text>
      </View>
      <View style={styles.topRow}>
        <Image source={require('../assets/images/uprmLogo.png')} style={styles.logo} />
        <Text style={styles.headerText}>
          Forgot Password
        </Text>
        <Image source={require('../assets/images/pawLogo.jpg')} style={styles.logo} />
      </View>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="UPR Email"
        placeholderTextColor="gray"
        style={styles.input}
      />
      {errMsg ? <Text style={styles.errorMsg}>{errMsg}</Text> : null}
      <Pressable style={styles.resetButton} onPress={handlePasswordReset}>
        <Text style={styles.resetButtonText}>Send Reset Link</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    height: "100%",
    width: "100%",
  },
  greenBar: {
    width: '100%',
    height: dimensions.height / 10,
    backgroundColor: '#41a425',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenBarText: {
    fontSize: 55,
    color: 'white',
    alignSelf: 'center',
    fontWeight: '500',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    width: 175,
    height: 175,
  },
  input: {
    width: 350,
    height: 50,
    backgroundColor: '#fafafa',
    borderColor: '#41A425',
    borderRadius: 10,
    borderWidth: 3,
    padding: 10,
    marginTop: 20,
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#41a425',
    width: 375,
    height: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorMsg: {
    color: 'red',
    fontSize: 12,
    marginTop: 10,
  },
});

// Exports the ForgotPasswordPage component to be used elsewhere in the app.
export default ForgotPasswordPage;
