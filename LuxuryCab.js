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
     const [pickuppin, setpickuppin] = useState(null); // Add fare state
    const [droppin, setdroppin] = useState(null); // Add fare state


   const parsedFormData = JSON.parse(JSON.stringify(formData));
  const tripType = parsedFormData.tripType;


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

// Assuming pickupCity and dropCity are variables containing the city names

const requestDatapickup = {
 city: pickupCity,
};

fetch('https://aimcabbooking.com/get_pincode_api.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(requestDatapickup),
})
  .then((response) => response.json())
  .then((data) => {
    // Process the fetched data and set the fare state
    console.log("single trip.........//////////////////// ", data.pincode);
    setpickuppin(data.pincode);
      console.log(pickuppin);

  })
  .catch((error) => {
    console.error("Error fetching fare:", error);
  });

  console.log(pickuppin);

  const requestDatadrop = {
 city: dropCity,
};

fetch('https://aimcabbooking.com/get_pincode_api.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(requestDatadrop),
})
  .then((response) => response.json())
  .then((data) => {
    // Process the fetched data and set the fare state
    console.log("drop trip.........//////////////////// ", data.pincode);
    setdroppin(data.pincode);
      console.log(droppin);

  })
  .catch((error) => {
    console.error("Error fetching fare:", error);
  });

    
     //  const pickupCity = formData.pickupLocation;
  //  const dropCity = formData.dropLocation;
    // fetch(
    //   `https://aimcabbooking.com/fetch_oneway_price.php?table=oneway_trip&source_city=${pickupCity}&destination_city=${dropCity}&source_pincode=${pickuppin}&destination_pincode=${droppin}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Process the fetched data and set the fare state
    //     console.log("single trip ",data);
    //     setFare(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching fare:", error);
    //   });
    //    fetch(
    //   `https://aimcabbooking.com/admin/fetch_twoway_price.php?table=round_trip&source_city=${pickupCity}&destination_city=${dropCity}&source_pincode=${pickuppin}&destination_pincode=${droppin}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Process the fetched data and set the fare state
    //     console.log("round data ",data);
    //     setroundFare(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching fare:", error);
    //   });
  }, []);


  useEffect(() => {
    // You need to put the fetch calls that depend on pickuppin and droppin inside this useEffect
    // because the states pickuppin and droppin are not immediately available when the component mounts

    // Check if both pickuppin and droppin are available before making the fetch calls
    if (pickuppin && droppin) {
      const pickupCity = formData.pickupLocation.split(",")[0].trim();
      const dropCity = formData.dropLocation.split(",")[0].trim();

      fetch(
        `https://aimcabbooking.com/fetch_oneway_price.php?table=oneway_trip&source_city=${pickupCity}&destination_city=${dropCity}&source_pincode=${pickuppin}&destination_pincode=${droppin}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Process the fetched data and set the fare state
          console.log("single trip ", data);
          setFare(data);
        })
        .catch((error) => {
          console.error("Error fetching fare:", error);
        });

      fetch(
        `https://aimcabbooking.com/fetch_twoway_price.php?table=round_trip&source_city=${pickupCity}&destination_city=${dropCity}&source_pincode=${pickuppin}&destination_pincode=${droppin}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Process the fetched data and set the fare state
          console.log("round data ", data);
          setroundFare(data);
        })
        .catch((error) => {
          console.error("Error fetching fare:", error);
        });
    }
  }, [pickuppin, droppin]);

  let farePrice = null; // Declare a variable to store the fare price

  if (fare) {
    // Check if the fare state is available
    const fareObject = fare[0]; // Assuming the fare data is an array with a single object
    farePrice = fareObject.suv; // Store the fare price in the variable
  }
   let roundfarePrice = null; // Declare a variable to store the fare price

  if (roundfare) {
    // Check if the fare state is available
    const roundfareObject = roundfare[0]; // Assuming the fare data is an array with a single object
    roundfarePrice = roundfareObject.suv; // Store the fare price in the variable
  }


  let farePrice2 = null; // Declare a variable to store the fare price

  if (fare) {
    // Check if the fare state is available
    const fareObject = fare[0]; // Assuming the fare data is an array with a single object
    farePrice2 = fareObject.suvplus; // Store the fare price in the variable
  }
   let roundfarePrice2 = null; // Declare a variable to store the fare price

  if (roundfare) {
    // Check if the fare state is available
    const roundfareObject = roundfare[0]; // Assuming the fare data is an array with a single object
    roundfarePrice2 = roundfareObject.suvplus; // Store the fare price in the variable
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
        <Text style={styles.headerTitle}>AimCabBooking</Text>
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
             .filter((item) => item.model_type === "SUV" )
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

         <View style={styles.cardsContainer1}>
          {data
             .filter((item) =>  item.model_type === "MUV")
            .map((item) => (
              <Card
                key={item.id}
                data={item}
                distance1={formData.distance}
                time={formData.selectedTime}
                pickup={formData.pickupLocation}
                drop={formData.dropLocation}
                date={formData.selectedDates}
                fare1={farePrice2}
                roundfare1={roundfarePrice2}
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
    marginBottom: -10, // Adjust the marginBottom to leave space for the bottom navigation
  },
   cardsContainer1: {
    padding: 10,
    marginBottom: 100, // Adjust the marginBottom to leave space for the bottom navigation
  },
});

export default Regular;