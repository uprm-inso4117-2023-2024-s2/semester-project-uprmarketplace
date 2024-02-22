// Import necessary React and React Native components and hooks
import React, { useState } from "react";
import { Text, View } from "@/components/Themed";
import { Dimensions, Image, Pressable, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

// Retrieve device window dimensions to make layout responsive
const dimensions = Dimensions.get("window");

// Dummy user data for login validation (placeholder until backend implementation)
const registeredUsers = [
  { email: "user1@upr.edu", password: "test1" },
  { email: "user2@upr.edu", password: "test2" },
  { email: "user3@upr.edu", password: "test3" },
];

// Define the main component for the login screen
export default function LogIn() {
  // State hooks for managing input fields and password visibility
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation(); // Access navigation object for screen transitions

  // Function to clear input fields
  function clearVariables() {
    setEmail('');
    setPassword('');
  }

  // Validates the email address to ensure it ends with "@upr.edu"
  const validateEmail = (email) => {
    return email.toLowerCase().endsWith("@upr.edu");
  };

  // Function to toggle the visibility of the password input
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  // Function to handle the login process
  const handleLogin = () => {

    // Validates the email format
    if (!validateEmail(email)) {
      alert("Please enter a valid UPRM email address.");
      return;
    }

    // Ensures both email and password fields are filled
    if (!email || !password) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Attempts to find a user match in the dummy data
    const user = registeredUsers.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );

    // Navigation and state reset on successful login, alert on failure
    if (user) {
      alert("Login Successful" + " You have successfully logged in.")
      navigation.navigate('(tabs)');
      clearVariables();
    } else {
      alert("Login Failed! " + "Invalid email or password. Please try again.");
    }

  };


  // The JSX markup for rendering the login screen
  return (
    <View style={styles.container}>
      <View style={styles.greenBar}>
        <Text
          style={{
            fontSize: 55,
            color: "white",
            alignSelf: "center",
            fontWeight: "500",
          }}
        >
          UPRM Marketplace
        </Text>
      </View>
      <View style={styles.topRow}>
        <Image
          source={require("../assets/images/uprmLogo.png")}
          style={{ width: 175, height: 175 }}
        />
        <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
          Welcome to the UPRM Marketplace. {"\n"}Please log in to continue.
        </Text>
        <Image
          source={require("../assets/images/pawLogo.jpg")}
          style={{ width: 175, height: 175 }}
        />
      </View>
      <View
        style={{
          width: "100%",
          height: "30%",
          alignItems: "center",
          gap: 25,
          justifyContent: "center",
        }}
      >
        <View>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail} // Update email state on change
            style={styles.input}
            placeholder="UPR Email"
            placeholderTextColor="gray"
          />
        </View>
        <View>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword} // Update password state on change
            style={styles.input}
            secureTextEntry={!passwordVisible} // Toggle password visibility
            placeholder="Password"
            placeholderTextColor="gray"
          />
          <Pressable onPress={togglePasswordVisibility} style={{ position: 'absolute', right: 10, top: 3 }}>
            <Text style={styles.toggleText}>{passwordVisible ? 'Hide' : 'Show'}</Text>
          </Pressable>
        </View>
      </View>
      <Text
        style={styles.forgotPass}
        onPress={() => console.log("Forgot Password?")}
      >
        Forgot Password?
      </Text>
      <Pressable style={styles.logInButton} onPress={handleLogin}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Log In</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("SignUp")} style={{ alignSelf: "center", marginTop: 10 }}>
        <Text
          style={{
            textDecorationLine: "underline",
            color: "gray",
            fontSize: 15,
          }}
        >
          Sign Up
        </Text>
      </Pressable>
    </View>
  );
}

// Styles for the component
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
    alignItems: "center",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  input: {
    width: 350,
    height: 50,
    backgroundColor: "#fafafa",
    borderColor: "#41A425",
    borderRadius: 10,
    borderWidth: 3,

    padding: 10,
  },
  inputLabel: {
    fontSize: 15,
    fontStyle: "italic",
    color: "gray",
    marginLeft: 5,
  },
  logInButton: {
    marginTop: 20,
    backgroundColor: "#41a425",
    width: 375,
    height: 50,
    borderRadius: 100,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  forgotPass: {
    alignSelf: "center",
    color: "blue",
    fontSize: 15,
    fontStyle: "italic",
    textDecorationLine: "underline",
    padding: 10,
  },
  toggleText: {
    color: "#41a425",
    fontSize: 15,
  },
});
