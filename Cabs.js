import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList } from 'react-native';

const Cabs = () => {
  const cabsData = [
    {
      id: '1',
      logo: 'https://example.com/cab1_logo.png',
      name: 'Cab 1',
      picture: 'https://purepng.com/public/uploads/large/purepng.com-taxitaxicabvehicletaxicabyellow-cab-1701527677285wv5t1.png',
      price: '$20',
    },
    {
      id: '2',
      logo: 'https://example.com/cab2_logo.png',
      name: 'Cab 2',
      picture: 'https://purepng.com/public/uploads/large/taxi-with-shield-mzq.png',
      price: '$25',
    },
    {
      id: '3',
      logo: 'https://example.com/cab3_logo.png',
      name: 'Cab 3',
      picture: 'https://w7.pngwing.com/pngs/542/392/png-transparent-suzuki-swift-maruti-suzuki-car-maruti-car-compact-car-car-india.png',
      price: '$30',
    },
  ];

  const renderCabItem = ({ item }) => {
    return (
      <View style={styles.cabContainer}>
        <Image source={{ uri: item.logo }} style={styles.cabLogo} />
        <Text style={styles.cabName}>{item.name}</Text>
        <Image source={{ uri: item.picture }} style={styles.cabPicture} />
        <Text style={styles.cabPrice}>{item.price}</Text>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cabsData}
        renderItem={renderCabItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cabContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cabLogo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  cabName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cabPicture: {
    width: 200,
    height: 100,
    marginBottom: 10,
  },
  cabPrice: {
    fontSize: 16,
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cabs;
