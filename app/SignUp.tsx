import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import React, { useState } from "react";
//import { useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

const dimensions = Dimensions.get("window");

export default function SignUp() {
  //const navigation = useNavigation(); // Get access to navigation
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State to control password visibility

  function clearVariables() {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPass('');
  }

  const validateEmail = (email) => {
    return email.toLowerCase().endsWith("@upr.edu");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUp = () => {
    if (!validateEmail(email)) {
      alert("Please enter a valid UPRM email address.");
      return;
    }
    if (password !== confirmPass) {
      alert("Passwords do not match.");
      return;
    }
    console.log("Sign Up successful", { firstName, lastName, email }); // Simulate successful sign-up
    // TODO: Implement actual sign-up logic here once the backend is ready
    clearVariables();
    //navigation.navigate('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.greenBar}>
        <Text style={{ fontSize: 55, color: "white", alignSelf: "center", justifyContent: "center", fontWeight: "500" }}>
          UPRM Marketplace
        </Text>
      </View>
      <View style={styles.topRow}>
        <Image source={require("../assets/images/uprmLogo.png")} style={{ width: 175, height: 175 }} />
        <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
          Join the UPRM Marketplace Community!
        </Text>
        <Image source={require("../assets/images/pawLogo.jpg")} style={{ width: 175, height: 175 }} />
      </View>
      <ScrollView>
        <View style={{ alignItems: "center", gap: 15, justifyContent: "center" }}>
          <View>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor="gray"
            />
          </View>
          <View>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor="gray"
            />
          </View>
          <View>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder="Enter UPRM email"
              placeholderTextColor="gray"
            />
          </View>
          <View>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholder="Create a password"
              placeholderTextColor="gray"
              secureTextEntry={!passwordVisible}
            />
            <Pressable onPress={togglePasswordVisibility} style={{ position: 'absolute', right: 10, top: 15 }}>
              <Text style={styles.toggleText}>{passwordVisible ? 'Hide' : 'Show'}</Text>
            </Pressable>
          </View>
          <View>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              value={confirmPass}
              onChangeText={setConfirmPass}
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="gray"
              secureTextEntry={!passwordVisible}
            />
          </View>
          <Link
            href="/"
          >
            <Pressable
              style={({ pressed }) => [
                styles.signUpButton,
                { backgroundColor: pressed ? "#000000" : "#41a425" },
              ]}
              onPress={handleSignUp}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Sign Up</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
      <Link
        href="/LogIn"
        style={{ alignSelf: "center", marginTop: 15, marginBottom: 30 }}
        onPress={clearVariables}
      >
        <Text style={{ fontSize: 15, textDecorationLine: "underline", fontWeight: "600" }}>
          Go back
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  greenBar: {
    width: "100%",
    height: dimensions.height / 10,
    backgroundColor: "#41a425",
    justifyContent: "center",
    alignItems: 'center',
  },
  topRow: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: -10,
  },
  input: {
    width: 350,
    height: 50,
    backgroundColor: "#fafafa",
    borderColor: "#41A425",
    borderRadius: 10,
    borderWidth: 3,
    padding: 10,
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 15,
    fontStyle: "italic",
    color: "gray",
    marginLeft: 5,
    marginTop: 10,
  },
  signUpButton: {
    marginTop: 20,
    width: 375,
    height: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleText: {
    color: "#41a425",
    fontSize: 15,
  },
});
