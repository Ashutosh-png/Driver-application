import React, { useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Offers = ({ navigation }) => {
 
  return (
    <View style={styles.container}>

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
          shadowColor: '#000',
          height: '40%',
         
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.65,
          shadowRadius: 3.84,
          elevation: 5,
          marginBottom: 100, // Move the container down by adding margin
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              width: '30%', // Adjust the size of the circle
              height: 100, // Adjust the size of the circle
              borderRadius: 50, // Makes it a circle
              backgroundColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10, // Add spacing between the circle and text
            }}
          >
            <Icon name="check" size={48} color="white" />
          </View>
          <Text style={{ fontSize: 24, color: 'black', textAlign: 'center', marginTop: 30 }}>
            Your trip has been completed!
          </Text>
        </View>
      </View>
      <View style={{ width: '100%', marginBottom: -150 }}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: '#0866FF',
              width: 340,
              height: 60,
              justifyContent: 'center', // Center horizontally
              alignItems: 'center',     // Center vertically
              borderRadius:20,
            },
          ]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={[styles.buttonText, { color: 'white', fontSize: 20 }]}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
  
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#028A04',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Offers;