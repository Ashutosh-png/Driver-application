import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const RegisterUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      },
      headerStyle: {
        backgroundColor: '#003580',
        height: 110,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="white"
          style={{ marginRight: 12 }}
        />
      ),
    });
  }, []);

  const handleSignup = () => {
    // Form validation
    let isValid = true;
    if (!username) {
      setUsernameError('Username is required.');
      isValid = false;
    } else {
      setUsernameError('');
    }
    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else {
      setPasswordError('');
    }
    if (!confirmPassword) {
      setConfirmPasswordError('Confirm Password is required.');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }
    if (!name) {
      setNameError('Name is required.');
      isValid = false;
    } else {
      setNameError('');
    }
    if (!email) {
      setEmailError('Email is required.');
      isValid = false;
    } else {
      setEmailError('');
    }
    if (!age) {
      setAgeError('Age is required.');
      isValid = false;
    } else {
      setAgeError('');
    }
    if (!gender) {
      setGenderError('Gender is required.');
      isValid = false;
    } else {
      setGenderError('');
    }
    if (!phone) {
      setPhoneError('Phone Number is required.');
      isValid = false;
    } else {
      setPhoneError('');
    }

    if (!isValid) {
      return;
    }

    // Create the payload object
    const payload = {
      username,
      password,
      name,
      email,
      age,
      gender,
      phone,
      confirm_password: confirmPassword,
    };

    // Send the data to the server
    fetch('https://aimcabbooking.com/userlogin/signup-api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        // Handle the response from the server
        if (result === 'Registration successful.') {
          Alert.alert(
            'Success',
            'Registration successful.',
            [
              {
                text: 'OK',
                onPress: () => navigation.navigate('Loginpage'), // Redirect to login page
              },
            ],
            { cancelable: false }
          );
        } else {
          Alert.alert(
            'Error',
            'Oops! Something went wrong. Please try again later.'
          );
        }
      })
      .catch((error) => {
        Alert.alert(
          'Error',
          'Oops! Something went wrong. Please try again later.'
        );
        console.error(error);
      });
  };

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.title}>Registration form</Text>
      <TextInput
        style={[styles.input, !!usernameError && styles.inputError]}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      {!!usernameError && <Text style={styles.errorText}>{usernameError}</Text>}
      <TextInput
        style={[styles.input, !!nameError && styles.inputError]}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      {!!nameError && <Text style={styles.errorText}>{nameError}</Text>}
      <TextInput
        style={[styles.input, !!emailError && styles.inputError]}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.passwordInput, !!passwordError && styles.inputError]}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Pressable
          style={styles.passwordVisibilityButton}
          onPress={togglePasswordVisibility}
        >
          <Ionicons
            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="gray"
          />
        </Pressable>
      </View>
      {!!passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.passwordInput, !!confirmPasswordError && styles.inputError]}
          placeholder="Confirm Password"
          secureTextEntry={!isConfirmPasswordVisible}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <Pressable
          style={styles.passwordVisibilityButton}
          onPress={toggleConfirmPasswordVisibility}
        >
          <Ionicons
            name={isConfirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="gray"
         />
        </Pressable>
      </View>
      {!!confirmPasswordError && <Text style={styles.errorText}>{confirmPasswordError}</Text>}
      <TextInput
        style={[styles.input, !!ageError && styles.inputError]}
        placeholder="Age"
        value={age}
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
      />
      {!!ageError && <Text style={styles.errorText}>{ageError}</Text>}
      <TextInput
        style={[styles.input, !!phoneError && styles.inputError]}
        placeholder="Phone Number"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        keyboardType="phone-pad"
      />
      {!!phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
      <View style={styles.genderContainer}>
        <Text style={styles.label}>Role:</Text>
        <View style={styles.genderButtonContainer}>
          <Pressable
            style={[
              styles.genderButton,
              gender === 'driver' && styles.genderButtonSelected,
              !!genderError && styles.genderButtonError,
            ]}
            onPress={() => handleGenderSelect('driver')}
          >
            <Text style={styles.genderButtonText}>Driver</Text>
          </Pressable>
          <Pressable
            style={[
              styles.genderButton,
              gender === 'vendor' && styles.genderButtonSelected,
              !!genderError && styles.genderButtonError,
            ]}
            onPress={() => handleGenderSelect('vendor')}
          >
            <Text style={styles.genderButtonText}>Vendor</Text>
          </Pressable>
        </View>
      </View>
      {!!genderError && <Text style={styles.errorText}>{genderError}</Text>}
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2a52be',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  inputError: {
    borderColor: 'red',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  passwordVisibilityButton: {
    padding: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  genderButtonContainer: {
    flexDirection: 'row',
  },
  genderButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ccc',
    marginRight: 10,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 10,
  },
  genderButtonSelected: {
    backgroundColor: '#2a52be',
  },
  genderButtonError: {
    backgroundColor: 'red',
  },
  genderButtonText: {
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegisterUser;
