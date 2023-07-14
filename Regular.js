import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Card from "./Components/Card";
import { Ionicons } from "@expo/vector-icons";

const Regular = ({ formData }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fare, setFare] = useState(null); // Add fare state
    const [roundfare, setroundFare] = useState(null); // Add fare state


  
 const parsedFormData = JSON.parse(JSON.stringify(formData));
  const tripType = parsedFormData.tripType;

  console.log("Regular ", tripType);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      title: "",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="white"
          style={{ marginRight: 12 }}
        />
      ),
    });
  }, []);

  useEffect(() => {
    fetch("https://aimcabbooking.com/admin/fetch_data.php?table=cabinfo")
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    const pickupCity = formData.pickupLocation.split(",")[0].trim();
    const dropCity = formData.dropLocation.split(",")[0].trim();
    fetch(
      `https://aimcabbooking.com/admin/fetch_oneway_price.php?table=oneway_trip&source_city=${pickupCity}&destination_city=${dropCity}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Process the fetched data and set the fare state
        console.log("single trip ",data);
        setFare(data);
      })
      .catch((error) => {
        console.error("Error fetching fare:", error);
      });
       fetch(
      `https://aimcabbooking.com/admin/fetch_twoway_price.php?table=round_trip&source_city=${pickupCity}&destination_city=${dropCity}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Process the fetched data and set the fare state
        console.log("round data ",data);
        setroundFare(data);
      })
      .catch((error) => {
        console.error("Error fetching fare:", error);
      });
  }, []);

  let farePrice = null; // Declare a variable to store the fare price

  if (fare) {
    // Check if the fare state is available
    const fareObject = fare[0]; // Assuming the fare data is an array with a single object
    farePrice = fareObject.hatchback; // Store the fare price in the variable
  }



 let roundfarePrice = null; // Declare a variable to store the fare price

  if (roundfare) {
    // Check if the fare state is available
    const roundfareObject = roundfare[0]; // Assuming the fare data is an array with a single object
    roundfarePrice = roundfareObject.hatchback; // Store the fare price in the variable
  }





  const scrollY = new Animated.Value(0);
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [110, 60],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Text style={styles.headerTitle}></Text>
        <Ionicons name="notifications-outline" size={24} color="white" style={styles.notificationIcon} />
      </Animated.View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.cardsContainer}>
          {data
            .filter((item) => item.model_type === "HATCHBACK")
            .map((item) => (
              <Card
                key={item.id}
                data={item}
                distance1={formData.distance}
                time={formData.selectedTime}
                pickup={formData.pickupLocation}
                drop={formData.dropLocation}
                date={formData.selectedDates}
                fare1={farePrice}
                roundfare1={roundfarePrice}
                triptype={tripType}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#003580",
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    elevation: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  notificationIcon: {
    position: "absolute",
    top: "50%",
    right: 12,
    transform: [{ translateY: -12 }],
  },
  scrollView: {
    flex: 1,
    paddingTop: 110,
    paddingBottom: 60,
  },
  scrollContent: {
    flexGrow: 1,
  },
  cardsContainer: {
    padding: 10,
    marginBottom: 100, // Adjust the marginBottom to leave space for the bottom navigation
  },
});

export default Regular;