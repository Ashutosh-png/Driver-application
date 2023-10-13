import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';


function StartTrip({ route }) {
  const navigation = useNavigation();
  const { trip, odostart } = route.params;
  console.log(trip);
  const [kilometers, setKilometers] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Initialize OTP with six empty strings
  const otpInputRefs = useRef([]);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [driverSelfieUri, setDriverSelfieUri] = useState(null);
  const distance = trip.user_pickup-trip.user_drop;
  console.log(distance);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  // Function to handle OTP input for each digit
   // Function to handle OTP input for each digit
  const handleOtpInput = (text, index) => {
    // Check if the entered text is a digit or empty
    if (/^\d+$/.test(text) || text === '') {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
  
      // Move focus to the next input if not the last input
      if (index < otp.length - 1 && (text !== '' || newOtp[index + 1] !== '')) {
        otpInputRefs.current[index + 1].focus();
      }
    }
  };
  
  const handleBackspace = (text, index) => {
    if (text === '' && index > 0) {
      // Move focus to the previous input when removing data
      otpInputRefs.current[index - 1].focus();
    }
  };

  const handleOtpVerification = async () => {
  const combinedOtp = otp.join('');
  const data = {
    otp: combinedOtp,
    bookid: trip.bookid,
  };

  try {
    const response = await fetch('https://aimcabbooking.com/admin/otp-verification.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Log the response before parsing it
    console.log('API Response:', response);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Log the response body as well
    const responseBody = await response.text();
    console.log('Response Body:', responseBody);

    const responseJson = JSON.parse(responseBody);
    console.log(responseJson);

    if (responseJson.hasOwnProperty('email')) {
      try {

         const kilometerData = {
          odometerValue: kilometers, // Assuming 'kilometers' is the state variable for the entered kilometers
          bookid: trip.bookid,
          id:trip.id
        };

        const kilometerResponse = await fetch('https://aimcabbooking.com/admin/odometer-end-api.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(kilometerData),
        });

        if (kilometerResponse.ok) {
          console.log('Kilometers sent successfully to the other API');

           const kilometerData = {
           km:kilometers-odostart,
          email: trip.email, // Assuming 'kilometers' is the state variable for the entered kilometers
          bookid: trip.bookid,
          id:trip.id,
          amount:trip.amount,
          distance:trip.distance,
          baseAmount:trip.baseAmount,
        };
        console.log("first",kilometers-trip.odometer_start);
                console.log("second",trip.odometer_start-kilometers);
 console.log("odo start",odostart);
        console.log(trip.odometer_start);
        console.log(kilometers);

        const kilometerResponse = await fetch('https://aimcabbooking.com/admin/end-trip-confirm.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(kilometerData),
        });


        } else {
          console.error('Failed to send kilometers to the other API');
        }

       // await AsyncStorage.setItem('userData', JSON.stringify(responseJson.email));
        setVerificationMessage('OTP verification successful'); // Update the verification message

        // Send data to the login endpoint
        const data = {
          bookid: trip.bookid,
        };

        console.log(trip.bookid);

       

       

        console.log('Garage Out request successful');
       if (parseFloat(kilometers) > parseFloat(odostart)) {
          navigation.navigate('EndThankyou', { trip, odostart, kilometers });
        } else {
          Alert.alert("Please put a value greater than odometer start", odostart);
        }
      //  navigation.navigate('EndThankyou', { trip, odostart,kilometers });
      } catch (error) {
        console.error('Error saving user data or starting trip:', error);
      }
    } else {
      setVerificationMessage('Error: OTP verification failed'); // Update the verification message for failure
    }
  } catch (error) {
    console.error('Error:', error);
    setVerificationMessage('Error: OTP verification failed');
  }
};
  
      // Navigate to the 'Home' screen if OTP verification is successful
     
       
      // Adjust the delay time as needed
   

  useEffect(() => {
    // You can clear the verification message when the OTP inputs change
    setVerificationMessage('');
  }, [otp]);

  // const handleDriverSelfieCapture = async () => {
  //   if (cameraRef) {
  //     try {
  //       const photo = await cameraRef.takePictureAsync();
  
  //       // Generate a unique file name based on the current timestamp
  //       const timestamp = Date.now();
  //       const fileName = `driver_selfie_${timestamp}.jpg`;

        
  
        // Create a FormData object to send the image to the API
        // const formData = new FormData();
        // formData.append('selfie', {
        //   uri: photo.uri,
        //   type: 'image/jpeg',
        //   name: fileName, // Use the generated file name
        // });
  
        // // Make a POST request to your PHP API to save the image
        // const response = await fetch('https://aimcabbooking.com/api/camera.php', {
        //   method: 'POST',
        //   body: formData,
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //     // Add any other headers you may need (e.g., authentication headers)
        //   },
        // });
  
  //       if (response.ok) {
  //         const responseData = await response.json();
  //         const savedImageUri = responseData.imageUri; // Assuming your API returns the saved image URL
  //         setDriverSelfieUri(savedImageUri);
  //       } else {
  //         Alert.alert('Error', 'Failed to save the selfie.');
  //       }
  //     } catch (error) {
  //       console.error('Error capturing selfie:', error);
  //       Alert.alert('Error', 'An error occurred while capturing the selfie.');
  //     }
  //   }
  // };
  

  return (
    <View style={styles.container}>
      {/* Odometer Logo */}
      <View style={styles.odometerContainer}>
        <Image
          source={require('./assets/Odometer4-removebg-preview.png')} 
          style={styles.odometerImage}
        />
      </View>

      {/* Enter Kilometers Text */}
      {/* <Text style={styles.inputLabel}>Enter Kilometers:</Text> */}

      {/* Kilometers Input Field */}
      <View style={styles.inputContainer1}>
        <TextInput
          style={styles.inputField}
          placeholder="Enter Kilometers:"
          keyboardType="numeric"
          value={kilometers}
          onChangeText={(text) => setKilometers(text)}
        />
      </View>

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
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === 'Backspace') {
            handleBackspace(digit, index);
          }
        }}
        ref={(ref) => (otpInputRefs.current[index] = ref)} // Assign refs
      />
    ))}
  </View>
</View>
      {/* Verification Message */}
      <Text style={styles.verificationMessage}>{verificationMessage}</Text>
     




     

      {/* Button */}
     <TouchableOpacity style={styles.button} onPress={handleOtpVerification}>
        <Text style={styles.buttonText}>Complete Trip</Text>
      </TouchableOpacity>
    </View>
  );
}
 

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the view takes up the whole screen
    padding: 15, // Add some padding to the content
  },
  odometerContainer: {
    alignItems: 'center',
    height: 200,
    width: 390,
    borderColor: 'black',
    
    borderRadius: 10,
    marginTop:20,
  },
  odometerImage: {
    width: 150,
    height: 150,
    marginTop:20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  inputContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:'15%',
    marginBottom:160,
    width:'70%',
  },
  inputLabel: {
    
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft:120,
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
    height: 180,
    width: 390,
    borderColor: 'black',
    
    borderRadius: 10,
    marginTop: -150,
  },
  otpLabel: {
   
    fontSize: 20,
    flexDirection: 'row',
    alignItems:'center',
    marginBottom:140,
    marginLeft:130,
  },
  otpInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:"-45%",
    
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
    marginTop:-60,
    
  },
  button: {
    backgroundColor: 'black', // Customize the button's appearance
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white', // Customize the text color
    fontSize: 20,
    fontWeight: 'bold',
  },
  verificationMessage: {
    color: 'green', // Customize the color of the verification message
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  driverSelfieContainer: {
    marginTop: -120,
    alignItems: 'center',
  },
  driverSelfieLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  driverSelfieImage: {
    width: 200,
    height: 200,
    borderRadius: 100, // Make it round (adjust as needed)
  },
  camera: {
    width: 250,
    height: 200,
  },
  captureButton: {
    backgroundColor: 'blue',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  captureButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },


});


export default StartTrip;