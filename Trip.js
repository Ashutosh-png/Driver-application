import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet , ScrollView , RefreshControl} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";


const TripCard = ({ trip }) => {
  const { user_pickup, user_drop, time, date, status, car } = trip;
  const timeOnly = time.split('T')[1].split('.')[0]; // Extracting the time portion from the 'time' string

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
    </View>
  );
};

const YourTrips = () => {
  const [trips, setTrips] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState("");
  const [userid, setUserid] = useState("");

  // Function to fetch trips data using 'userid'
  const fetchTripsData = (userId) => {
    fetch(`https://aimcabbooking.com/admin/fetch_trip.php?userid=${userId}`)
      .then((response) => response.json())
      .then((data) => {
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
    fetchTripsData(userid); // Fetch trips data again with the 'userid'
  };

  useEffect(() => {
    // Fetch data from AsyncStorage when the component mounts
    const fetchData = async () => {
      try {
        const fetchedData = await AsyncStorage.getItem("userData");
        if (fetchedData !== null) {
          const user = JSON.parse(fetchedData);
          console.log("Invoice: " + JSON.stringify(user));
          setUserData(user);
          setUserid(user.userid);
          fetchTripsData(user.userid); // Fetch trips data using the 'userid'
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
      {trips.map((trip, index) => (
        <TripCard trip={trip} key={index} />
      ))}
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
  },
  subTitle: {
    fontSize: 16,
    color: '#666',
  },
  details: {
    fontSize: 14,
    color: '#999',
    flexDirection: 'row',
    alignItems: 'center',
  },
   title: {
    flex: 1, // Add flex: 1 to make sure the title takes the remaining width in the row
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '45%', // Set a maximum width for the title text
  },
});

export default YourTrips;
