import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Offers = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Offers Screen</Text>
      {/* Add your offers content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Offers;
