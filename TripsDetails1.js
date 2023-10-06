import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function TripDetails1({ route }) {
  const { trip } = route.params;
    const navigation = useNavigation();
    //console.log("odostart",odostart);


  const handleGarageOut = () => {
    // Handle the "Garage Out" button click event here
    // You can perform the necessary action when the user clicks this button

     const data = {
      phone: trip.phone,
      email: trip.email,
      bookid: trip.bookid
    };

    // Send the data to the login endpoint
   fetch('https://aimcabbooking.com/admin/user-otp-api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // No need to parse JSON response since none is expected
        console.log('Garage Out request successful');
                navigation.navigate('StartTrip', { trip });

        // You can navigate to the Home screen or perform other actions here
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

   return (
    <View>
      {/* User Pickup Card */}
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>User Pickup:</Text>
        <Text style={styles.value}>{trip.user_pickup}</Text>
      </View>

      {/* User Drop Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>User Drop:</Text>
        <Text style={styles.value}>{trip.user_drop}</Text>
      </View>

      {/* Main Trip Details Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Trip Details:</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>User Name:</Text>
          <Text style={styles.value}>{trip.username}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Booking ID:</Text>
          <Text style={styles.value}>{trip.bookid}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Booking Type:</Text>
          <Text style={styles.value}>{trip.user_trip_type}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Distance:</Text>
          <Text style={styles.value}>{trip.distance}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Fare:</Text>
          <Text style={styles.value}>{trip.fare}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Cab ID:</Text>
          <Text style={styles.value}>{trip.cabid}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Car Type:</Text>
          <Text style={styles.value}>{trip.car}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>{trip.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{trip.date}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{trip.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Garage Out:</Text>
          <Text style={styles.value}>{trip.garage_out}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{trip.phone}</Text>
        </View>
        
        
        {/* Add more detail rows for other trip details */}
      </View>

     
      
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    margin: 2,
    elevation: 3,
    marginTop: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 9,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginTop: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {},
  button: {
    backgroundColor: '#ffb703',
    borderRadius: 15,
    padding: 20,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
  },
});

export default TripDetails1;