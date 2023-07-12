import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";



const Loginpage = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");




  const handleLogin = () => {
    // Create a JSON object with username and password
    const data = {
      username: username,
      password: password
    };

    // Send the data to the login endpoint
    fetch('https://aimcabbooking.com/userlogin/login-api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(async result => {
        // console.log(result);
        if (result.success == true) {
          // Login successful

          // Alert.alert('Success', result.message);

          // Save the user data to AsyncStorage
          try {
            await AsyncStorage.setItem('userData', JSON.stringify(result.user));
            // console.log("hii");
          } catch (error) {
            console.error('Error saving user data:', error);
          }

          navigation.navigate("Home");
          // You can handle the successful login here, e.g., navigate to a new screen
        } else {
          // Login error
          Alert.alert('Error', result.message);


          // You can handle the login error here, e.g., display an error message
        }
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle any error that occurs during the API call
      });
  };

  const handleSkipTest = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/background.jpg")}
        style={styles.backgroundImage}
      />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("./assets/logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={[styles.input, { width: "100%" }]}
            placeholder="username"
            placeholderTextColor="white"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />

<TextInput
  style={[styles.input, { width: "100%" }]}
  placeholder="password"
  placeholderTextColor="white"
  value={password}
  onChangeText={setPassword}
  secureTextEntry={!showPassword}
/>
<TouchableOpacity
  style={styles.passwordToggle}
  onPress={() => setShowPassword(!showPassword)}
>
  <Ionicons
    name={showPassword ? "eye-off" : "eye"}
    size={24}
    color="white"
  />
</TouchableOpacity>


          <TouchableOpacity
            style={[styles.loginButton, { width: "100%" }]}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => navigation.navigate("RegisterUser")}
          >
            <Text style={styles.createAccountButtonText}>Create Account</Text>
          </TouchableOpacity>


          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}
        </View>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkipTest}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003580",
    padding: 20,
    width: "100%",
  },
  logoContainer: {},
  logoImage: {
    width: 300,
    height: 300,
  },
  formContainer: {
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "#6a83a6",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 16,
    color: "white",
    backgroundColor: "#6a83a6",
  },
  passwordToggle: {
    position: "absolute",
    right: 10,
    top: 69,
    transform: [{ translateY: -12 }],
  },
  loginButton: {
    backgroundColor: "#FFBF00",
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 10,
  },
  loginButtonText: {
    color: "#5A5A5A",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  createAccountButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  skipButton: {
    marginTop: 10,
    bottom: "90%",
    left: "45%",
  },
  skipButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Loginpage;
