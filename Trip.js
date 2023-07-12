import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const YourTrips = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Trips</Text>
      {/* Your trips data and components go here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default YourTrips;
