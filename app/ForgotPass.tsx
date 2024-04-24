import React, { useState } from "react"; // Imports React library and useState hook for managing component state.
import { Text, View } from "@/components/Themed"; // Imports custom Text and View components from "@/components/Themed" for themed UI elements.
import {
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from "react-native"; // Imports various React Native components and APIs for UI and device features.
import { useNavigation, router, Link } from "expo-router"; // Imports useNavigation hook for navigation and router object for programmatic navigation from 'expo-router'.
import { Dropdown } from "react-native-element-dropdown";

const dimensions = Dimensions.get("window"); // Gets device window dimensions for responsive design.

const ForgotPasswordPage = () => {
  // useState hooks to manage the email input and error message states.
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [page, setPage] = useState(0);
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answer, setAnswer] = useState("");
  const [correctPhone, setCorrectPhone] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [userid, setUserid] = useState(0);
  const [choice, setChoice] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [showNewPass, setShowNewPass] = useState(true);
  const [showConfirm, setShowConfirm] = useState(true);

  // Hook to access the navigation object for navigating between screens.
  const navigation = useNavigation();

  const handlePasswordReset = async () => {
    // Placeholder for your password reset logic
    setErrMsg("");

    // Validates the email address to ensure it ends with '@upr.edu'.
    if (!email.endsWith("@upr.edu")) {
      setErrMsg("Please enter a valid UPRM email address.");
      return;
    }

    // Displays an alert indicating the password reset link has been sent.
    alert("Password reset link has been sent to your email.");

    // Navigates to the 'ResetPass' screen.
    router.navigate("ResetPass");
  };

  async function checkEmail() {
    setErrMsg("");
    await fetch(`http://127.0.0.1:5000/findByEmail`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((d) => {
        if (!d.error) {
          const { userid, securityQuestion, securityAnswer, phoneNumber } =
            d.user;
          setUserid(userid);
          setCorrectPhone(phoneNumber);
          setSecurityQuestion(securityQuestion);
          setCorrectAnswer(securityAnswer);
          setPage(1);
          setErrMsg("");
        } else {
          setErrMsg(d.error);
        }
      })
      .catch((e) => console.log("error finding by email"));
  }

  function checkResponse() {
    setErrMsg("");
    const blank = "Please enter a response";
    const wrong = "Incorrect answer.";
    let passCheck = false;
    if (choice == "Phone Number") {
      if (phoneNum == "") setErrMsg(blank);
      if (phoneNum == correctPhone) passCheck = true;
      else setErrMsg(wrong);
    }
    if (choice == "Security Question") {
      if (answer == "") setErrMsg(blank);
      if (correctAnswer.toLowerCase() == answer.toLowerCase()) passCheck = true;
      else setErrMsg(wrong);
    }
    if (passCheck) {
      setPage(2);
      setErrMsg("");
    }
  }

  async function handlePassword() {
    if (newPass != confirmNewPass) {
      setErrMsg("Passwords do not match");
    } else {
      await fetch(`http://127.0.0.1:5000/changePassword`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userid: userid,
          password: newPass,
        }),
      }).then(() => {
        alert("Successfully changed password");
        router.navigate("/LogIn");
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.greenBar}>
        <Text style={styles.greenBarText}>UPRM Marketplace</Text>
      </View>
      <View style={styles.topRow}>
        <Image
          source={require("../assets/images/uprmLogo.png")}
          style={styles.logo}
        />
        <Text style={styles.headerText}>Forgot Password</Text>
        <Image
          source={require("../assets/images/pawLogo.jpg")}
          style={styles.logo}
        />
      </View>
      {page == 0 && (
        <View style={{ alignItems: "center" }}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="UPR Email"
            placeholderTextColor="gray"
            style={styles.input}
          />
          {errMsg && <Text style={styles.errorMsg}>{errMsg}</Text>}
          <Pressable
            style={styles.resetButton}
            onPress={async () => await checkEmail()}
          >
            <Text style={styles.resetButtonText}>Continue</Text>
          </Pressable>
          <Link
            href="/LogIn"
            style={{ alignSelf: "center", marginTop: 15, marginBottom: 30 }}
            onPress={() => setEmail("")}
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
        </View>
      )}
      {page == 1 && (
        <View style={{ alignItems: "center" }}>
          <Dropdown
            value={choice}
            data={[{ choice: "Phone Number" }, { choice: "Security Question" }]}
            labelField="choice"
            valueField="choice"
            onChange={(e: any) => setChoice(e.choice)}
            style={[styles.input, { alignSelf: "center" }]}
            placeholder="Select which security measure you'd like to use"
            placeholderStyle={{ color: "gray", fontSize: 14 }}
            selectedTextStyle={{ fontSize: 14 }}
          />
          {choice == "Phone Number" && (
            <View>
              <TextInput
                value={phoneNum}
                onChangeText={(e) => {
                  let input = e[e.length - 1];
                  const check = e.length == 0 ? true : input.match(/[0-9]/);
                  if (check && e.length <= 10) setPhoneNum(e);
                }}
                style={styles.input}
                placeholder="Enter your phone number"
                placeholderTextColor="gray"
              />
            </View>
          )}
          {choice == "Security Question" && (
            <View>
              <Text style={styles.question}>{securityQuestion}</Text>
              <View>
                <Text style={styles.inputLabel}>
                  Answer to security question
                </Text>
                <TextInput
                  value={answer}
                  onChangeText={setAnswer}
                  style={styles.input}
                  placeholder="Enter the answer to your security question"
                  placeholderTextColor="gray"
                />
              </View>
            </View>
          )}
          {errMsg && <Text style={styles.errorMsg}>{errMsg}</Text>}
          <Pressable style={styles.resetButton} onPress={() => checkResponse()}>
            <Text style={styles.resetButtonText}>Continue</Text>
          </Pressable>
          <Text
            style={{
              fontSize: 15,
              textDecorationLine: "underline",
              fontWeight: "600",
            }}
            onPress={() => {
              setPage(page - 1);
              setAnswer("");
              setPhoneNum("");
            }}
          >
            Go back
          </Text>
        </View>
      )}
      {page == 2 && (
        <View style={{ gap: 15, alignItems: "center" }}>
          <View>
            <View style={styles.passwordRow}>
              <Text style={styles.inputLabel}>New Password</Text>
              <Text
                style={styles.toggleText}
                onPress={() => setShowNewPass(!showNewPass)}
              >
                {showNewPass ? "Show" : "Hide"}
              </Text>
            </View>
            <TextInput
              value={newPass}
              onChangeText={setNewPass}
              placeholder="Enter new password"
              placeholderTextColor="gray"
              style={styles.input}
              secureTextEntry={showNewPass}
            />
          </View>
          <View>
            <View style={styles.passwordRow}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <Text
                style={styles.toggleText}
                onPress={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? "Show" : "Hide"}
              </Text>
            </View>
            <TextInput
              value={confirmNewPass}
              onChangeText={setConfirmNewPass}
              placeholder="Confirm new password"
              placeholderTextColor="gray"
              style={styles.input}
              secureTextEntry={showConfirm}
            />
          </View>
          {errMsg && <Text style={styles.errorMsg}>{errMsg}</Text>}
          <Pressable
            style={styles.resetButton}
            onPress={async () => handlePassword()}
          >
            <Text style={styles.resetButtonText}>Change Password</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
  greenBarText: {
    fontSize: 55,
    color: "white",
    alignSelf: "center",
    fontWeight: "500",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  logo: {
    width: 175,
    height: 175,
  },
  input: {
    width: 350,
    height: 50,
    backgroundColor: "#fafafa",
    borderColor: "#41A425",
    borderRadius: 10,
    borderWidth: 3,
    padding: 10,
    marginTop: 20,
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: "#41a425",
    width: 375,
    height: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  resetButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  errorMsg: {
    color: "red",
    fontSize: 12,
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 15,
    fontStyle: "italic",
    color: "gray",
    marginLeft: 5,
    marginTop: 10,
    marginBottom: -15,
  },
  question: {
    fontSize: 20,
    fontWeight: "600",
    alignSelf: "center",
    marginTop: 25,
  },
  toggleText: {
    color: "#41a425",
    fontSize: 15,
    marginBottom: -30,
  },
  passwordRow: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: 350,
  },
});

// Exports the ForgotPasswordPage component to be used elsewhere in the app.
export default ForgotPasswordPage;
