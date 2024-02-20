import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";

const dimensions = Dimensions.get("window");

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function clearVariables(){
    setEmail('')
    setPassword('')
  }

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
          Welcome to the UPRM Marketplace. {"\n"}Please log in to continue
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
            onChangeText={(e) => setEmail(e)}
            style={styles.input}
            placeholder="UPR Email"
            placeholderTextColor="gray"
          />
        </View>
        <View>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            value={password}
            onChangeText={(e) => setPassword(e)}
            style={styles.input}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="gray"
          />
        </View>
      </View>
      <Text
        style={styles.forgotPass}
        selectable
        onPress={() => console.log("forgot pass")}
      >
        Forgot Password?
      </Text>
      <Link
        href="/"
        style={{ alignSelf: "center" }}
        onPress={() => clearVariables()}
      >
        <Pressable
          style={({ pressed }) => [
            styles.logInButton,
            {
              backgroundColor: pressed ? "#000000" : "#41a425",
            },
          ]}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Log In
          </Text>
        </Pressable>
      </Link>
      <Link
        href="/SignUp"
        style={{ alignSelf: "center", marginTop: 10 }}
        onPress={() => clearVariables()}
      >
        <Text
          style={{
            textDecorationLine: "underline",
            alignSelf: "center",
            color: "gray",
            fontSize: 15,
          }}
        >
          Sign up
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
    justifyContent:'center',
    alignItems: 'center'
  },
  topRow: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  input: {
    width: 350,
    height: 50,
    backgroundColor: "#fafafa",
    borderColor: "#41A425",
    borderRadius: 10,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  inputLabel: {
    fontSize: 15,
    fontStyle: "italic",
    color: "gray",
    marginLeft: 5,
  },
  logInButton: {
    width: 375,
    height: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    // alignSelf: "center",
  },
  forgotPass: {
    alignSelf: "center",
    marginBottom: 10,
    fontStyle: "italic",
    textDecorationLine: "underline",
    color: "blue",
  },
});
