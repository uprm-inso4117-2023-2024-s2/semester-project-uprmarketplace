import React, { useState } from 'react';
import { Text, View } from "@/components/Themed";
import { TextInput, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import { useNavigation, router} from 'expo-router';

const dimensions = Dimensions.get('window');

const ResetPasswordPage = () => {
 
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigation = useNavigation();

  const handlePasswordReset = async () => {
    // Reset error message state
    setErrMsg('');

    
    if (newPassword.length < 8) {
      setErrMsg('Password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrMsg('Passwords do not match.');
      return;
    }

    // Placeholder for your actual password reset logic
    alert('Your password has been reset successfully.');

    // Navigate away or perform other actions as needed
    router.navigate('LogIn');
  };

  return (
    <View style={styles.container}>
      <View style={styles.greenBar}>
        <Text style={styles.greenBarText}>UPRM Marketplace</Text>
      </View>
      <View style={styles.topRow}>
        <Image source={require('../assets/images/uprmLogo.png')} style={styles.logo} />
        <Text style={styles.headerText}>Reset Password</Text>
        <Image source={require('../assets/images/pawLogo.jpg')} style={styles.logo} />
      </View>
      <TextInput
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="New Password"
        placeholderTextColor="gray"
        secureTextEntry={true}
        style={styles.input}
      />
      <TextInput
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        placeholder="Confirm New Password"
        placeholderTextColor="gray"
        secureTextEntry={true}
        style={styles.input}
      />
      {errMsg ? <Text style={styles.errorMsg}>{errMsg}</Text> : null}
      <Pressable style={styles.resetButton} onPress={handlePasswordReset}>
        <Text style={styles.resetButtonText}>Reset Password</Text>
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

export default ResetPasswordPage;
