import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';


const TripCard = ({ trip }) => {
  const { user_pickup, user_drop, time, date, status, car,username,driverid,triptype,distance,fare,cabid,contactno,bookingid } = trip;
  const timeOnly = time ; // Check if 'time' is defined
  const navigation = useNavigation();


  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text numberOfLines={1} style={[styles.text, styles.title]}>
          <Ionicons name="location" size={18} color="#333" />
          {user_pickup}
        </Text>
        <Text numberOfLines={1} style={[styles.text, styles.title]}>
          <Ionicons name="location" size={18} color="#333" />
          {user_drop}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.text, styles.subTitle]}>{car}</Text>
        <Text
          style={[
            styles.text,
            styles.subTitle,
            { color: status === '2' ? 'green' : 'red' },
          ]}
        >
          {status === '2' ? 'Confirmed' : 'Pending'}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.text, styles.details]}>
          <Ionicons name="time" size={14} color="#999" />
          {timeOnly} {/* Displaying only the time */}
        </Text>
        <Text style={[styles.text, styles.details]}>
          <Ionicons name="calendar" size={14} color="#999" />
          {date}
        </Text>
             

      </View>
      <View style={styles.row}>
  <Text style={[styles.text, styles.details]}>
    Username: {username}
  </Text>
  <Text style={[styles.text, styles.details]}>
    Driver Id: {driverid}
  </Text>
</View>
<View style={styles.row}>
  <Text style={[styles.text, styles.details]}>
    Distance: {distance}
  </Text>
  <Text style={[styles.text, styles.details]}>
    Trip Type: {triptype}
  </Text>
</View>   

<View style={styles.row}>
  <Text style={[styles.text, styles.details]}>
    Fare: {fare}
  </Text>
  <Text style={[styles.text, styles.details]}>
    Cab Id: {cabid}
  </Text>
</View>

<View style={styles.row}>
  <Text style={[styles.text, styles.details]}>
    Contact No: {contactno}
  </Text>
  <Text style={[styles.text, styles.details]}>
    Booking Id: {bookingid}
  </Text>
</View>


      <TouchableOpacity
    onPress={() => {
      // Handle the "Start Trip" button click event here
      // You can add the logic to start the trip
          navigation.navigate('TripDetails1', { trip });

    }}
    style={{
      backgroundColor: 'red',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 10, // Adjust the margin as needed
    }}
  >
    <Text style={{ color: 'white',  fontWeight: 'bold', textAlign:'center' }}>View Cancel Trip </Text>
  </TouchableOpacity>
    </View>
  );
};

const CancelTrip = () => {
  const [trips, setTrips] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [driverId, setDriverId] = useState(""); // Use driverId instead of userid

  // Function to fetch trips data using 'driverId'
  const fetchTripsData = (driverId) => {
    fetch(`http://www.aimcabbooking.com/admin/Cancel_Trip.php?driverid=${driverId}`) // Use the correct API endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTrips(data); // Update the 'trips' state with the fetched data
        setRefreshing(false); // Stop the refreshing indicator
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setRefreshing(false); // Stop the refreshing indicator even in case of an error
      });
  };

  // Function to handle pull-to-refresh action
  const onRefresh = () => {
    setRefreshing(true);
    fetchTripsData(driverId); // Fetch trips data again with the 'driverId'
  };

  useEffect(() => {
    // Fetch data from AsyncStorage when the component mounts
    const fetchData = async () => {
      try {
        const fetchedData = await AsyncStorage.getItem("userData");
        if (fetchedData !== null) {
          const user = JSON.parse(fetchedData);
          console.log("User Data: " + JSON.stringify(user));
          setDriverId(user.driverid); // Use the driver ID from the user data
          fetchTripsData(user.driverid); // Fetch trips data using the 'driverId'
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {trips.length === 0 ? (
        <Text>No trips available.</Text>
      ) : (
        trips.map((trip, index) => (
          <TripCard trip={trip} key={index} />
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontFamily: 'Arial',
    marginLeft: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '45%',
  },
});

export default CancelTrip;