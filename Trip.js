import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const TripBox = () => {
  const navigation = useNavigation(); // Initialize navigation

  const handleOngoingTripPress = () => {
    navigation.navigate('OngoingTrip'); // Navigate to the "OngoingTrip" page
  };

  const handleUpcomingTripPress = () => {
    navigation.navigate('UpcomingTrip'); // Navigate to the "Button2Page"
  };

  const handleCancelTripPress = () => {
    navigation.navigate('CancelTrip'); // Navigate to the "Button3Page"
  };
  const handleCompletTripPress = () => {
    navigation.navigate('CompletTrip'); // Navigate to the "Button3Page"
  };

  
  return (
    <View style={styles.container}>
      
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={{...styles.button,backgroundColor: '#73d18c',}} onPress={handleUpcomingTripPress}>
      <Text style={{ ...styles.buttonText, color: 'white' }}>UpcomingTrip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.button,backgroundColor: '#ffb703',}} onPress={handleOngoingTripPress}>
        <Text style={{ ...styles.buttonText, color: 'white' }}>OngoingTrip</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={{...styles.button, backgroundColor: '#e3445f',}} onPress={handleCancelTripPress}>
        <Text style={{ ...styles.buttonText, color: 'white' }}>CancelTrip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.button,backgroundColor: '#4d4dff',}} onPress={handleCompletTripPress}>
        <Text style={{ ...styles.buttonText, color: 'white' }}>CompleteTrip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 0,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    width: 280,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    fontSize: 28, // Set the text size to 28
    
  },
});

export default TripBox;