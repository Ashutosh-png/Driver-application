import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';

function StartTrip({ route }) {
  const { trip } = route.params;
  const [kilometers, setKilometers] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Initialize OTP with six empty strings

  // Function to handle OTP input for each digit
  const handleOtpInput = (text, index) => {
    // Check if the entered text is a digit
    if (/^\d+$/.test(text) || text === '') {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
    }
  };

  return (
    <View style={styles.container}>
      {/* Odometer Logo */}
      <View style={styles.odometerContainer}>
        <Image
          source={require('./assets/odometer.png')} // Replace with the actual path to your odometer image
          style={styles.odometerImage}
        />
      </View>

      {/* Enter Kilometers Text */}
  <Text style={styles.inputLabel}>Enter Kilometers:</Text>

  {/* Kilometers Input Field */}
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.inputField}
      placeholder="0.0"
      keyboardType="numeric"
      value={kilometers}
      onChangeText={(text) => setKilometers(text)}
    />
  </View>
    

      {/* OTP Input */}
      <View style={styles.otpContainer}>
        <Text style={styles.otpLabel}>Enter OTP:</Text>
        <View style={styles.otpInputContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleOtpInput(text, index)}
            />
          ))}
        </View>
      </View>

      {/* Trip Details */}
      <Text>Booking ID: {trip.bookid}</Text>
      <Text>User Pickup: {trip.user_pickup}</Text>
      <Text>User Drop: {trip.user_drop}</Text>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the view takes up the whole screen
    padding: 10, // Add some padding to the content
  },
  odometerContainer: {
    alignItems: 'center',
    height: 200,
    width: 390,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  odometerImage: {
    width: 150,
    height: 150,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  inputLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputField: {
    flex: 2,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 10,
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 200,
    width: 390,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 40,
  },
  otpLabel: {
    flex: 1,
    fontSize: 22,
    marginRight: 13,
  },
  otpInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  otpInput: {
    width: 40,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    marginRight: 5,
    borderRadius: 0,
  },
  button: {
    backgroundColor: 'blue', // Customize the button's appearance
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white', // Customize the text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StartTrip;