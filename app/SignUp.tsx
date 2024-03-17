import { Text, View } from "@/components/Themed";
import { Link, router } from "expo-router";
import React, { useState } from "react";
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
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [missingInfo, setMissingInfo] = useState(false)

  function clearVariables(){
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setConfirmPass('')
  }

  async function signUp() {
    setMissingInfo(false)
    if (
      password == "" ||
      email == "" ||
      confirmPass == "" ||
      firstName == "" ||
      lastName == ""
    ) {
      setMissingInfo(true)
      return
    }
    await fetch(`http://127.0.0.1:5000/register`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error == undefined) {
          clearVariables();
          router.navigate('/')
        }
        else {
          setErrMsg(data.error)
        }
      })
      .catch((e) => console.log("error signing up", e))
  }

  const Input = ({ label, value, onChangeText, placeholder }: any) => {
    return (
      <View>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="gray"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.greenBar}>
        <Text
          style={{
            fontSize: 55,
            color: "white",
            alignSelf: "center",
            justifyContent: "center",
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
          Join the UPRM Marketplace Community!
        </Text>
        <Image
          source={require("../assets/images/pawLogo.jpg")}
          style={{ width: 175, height: 175 }}
        />
      </View>
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            gap: 15,
            justifyContent: "center",
          }}
        >
          <View>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              value={firstName}
              onChangeText={(e: any) => setFirstName(e)}
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor="gray"
            />
          </View>
          <View>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              value={lastName}
              onChangeText={(e: any) => setLastName(e)}
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor="gray"
            />
          </View>
          <View>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              value={email}
              onChangeText={(e: any) => {
                if (errMsg != "") setErrMsg("");
                setEmail(e);
              }}
              style={styles.input}
              placeholder="Enter UPRM email"
              placeholderTextColor="gray"
            />
          </View>
          <Text
            style={{
              color: "red",
              fontSize: 12,
              alignSelf: "center",
              marginTop: -10,
            }}
          >
            {errMsg != "" && errMsg}
          </Text>
          <View>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              value={password}
              onChangeText={(e: any) => setPassword(e)}
              style={styles.input}
              placeholder="Create a password"
              placeholderTextColor="gray"
              secureTextEntry
            />
          </View>
          <View>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              value={confirmPass}
              onChangeText={(e: any) => setConfirmPass(e)}
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="gray"
              secureTextEntry
            />
          </View>
          <Text
            style={{
              color: "red",
              fontSize: 12,
              alignSelf: "center",
              marginTop: -10,
            }}
          >
            {password != confirmPass && "Passwords do not match"}
          </Text>
        </View>
        {/* <Link
          href="/"
          style={{ width: 375, alignSelf: "center", marginTop: 30 }}
          onPress={() => clearVariables()}
        > */}
        <Text
          style={{
            color: "red",
            fontSize: 18,
            alignSelf: "center",
            marginTop: 10,
            marginBottom: -20
          }}
        >
          {missingInfo && "Missing Information"}
        </Text>
        <View style={{ width: 375, alignSelf: "center", marginTop: 30 }}>
          <Pressable
            style={({ pressed }) => [
              styles.singUpButton,
              {
                backgroundColor: pressed ? "#000000" : "#41a425",
              },
            ]}
            onPress={async () => await signUp()}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Sign Up
            </Text>
          </Pressable>
        </View>
        {/* </Link> */}
        <Link
          href="/LogIn"
          style={{ alignSelf: "center", marginTop: 15, marginBottom: 30 }}
          onPress={() => clearVariables()}
        >
          <Text
            style={{
              fontSize: 15,
              textDecorationLine: "underline",
              fontWeight: "600",
            }}
          >
            Go back
          </Text>
        </Link>
      </ScrollView>
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
    marginBottom: -10
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
  singUpButton: {
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
