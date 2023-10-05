import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import * as Location from 'expo-location';
import MapViewDirections from "react-native-maps-directions";
import { useNavigation } from "@react-navigation/native";
import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';




const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const GOOGLE_API_KEY = "AIzaSyCelDo4I5cPQ72TfCTQW-arhPZ7ALNcp8w"; // Replace with your API key
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function InputAutocomplete({
  label,
  placeholder,
  onPlaceSelected,
}) {
  return (
    <>
      <Text>{label}</Text>
      <GooglePlacesAutocomplete
        styles={{ textInput: styles.input }}
        placeholder={placeholder || ""}
        fetchDetails
        onPress={(data, details = null) => {
          onPlaceSelected(details);
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: "pt-BR",
        }}
      />
    </>
  );
}

const MapPage = ({ route }) => {
  const { trip, odostart } = route.params;
  const navigation = useNavigation();


  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState({
    latitude: -25.2744, // Default latitude for Australia
    longitude: 133.7751, // Default longitude for Australia
  });
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const mapRef = useRef(null);

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const traceRouteOnReady = (args) => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, trip.user_drop], { edgePadding });
    }
  };

    const openGoogleMaps = () => {
  if (trip.user_drop && trip.user_pickup) {
  //  const start = `${origin.latitude},${origin.longitude}`;
   // const end = `${trip.userdrop.latitude},${trip.userdrop.longitude}`;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${trip.user_pickup}&destination=${trip.user_drop}`;
    
    console.log('Google Maps URL:', googleMapsUrl); // Add this line to log the URL

    Linking.openURL(googleMapsUrl)
      .catch((error) => {
        console.error('Failed to open Google Maps. Error:', error);
      });
  }
};


  const onPlaceSelected = (details, flag) => {
    const set = flag === "origin" ? setOrigin : setDestination;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    set(position);
    moveTo(position);
  };

 const handleStartTrip = async () => {
  const data = {
    driverid: trip.driverid,
  };

 


  const data1 = {
    phone: trip.phone,
    email: trip.email,
    bookid: trip.bookid,
  };

  // Send the data to the login endpoint
  fetch('https://aimcabbooking.com/admin/user-otp-api.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data1),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Continue with the next fetch request
       fetch(`https://aimcabbooking.com/admin/trip_completed_api.php?bookid=${trip.bookid}&id=${trip.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Use data instead of data1 here
      });
    })
    .then(async (response) => {
      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      console.log(trip.bookid, "bookid in end trip");
      navigation.navigate('EndTrip', { trip, odostart }); // Navigate to the 'EndTrip' screen
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error here, e.g., show an error message to the user
    });
};


  // Fetch the current location using expo-location
  useEffect(() => {
    const updateLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
     // console.log(currentLocation);
      setOrigin({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      // Check if both origin and destination are set
      if (origin && destination) {
        // After setting the origin and destination, automatically trace the route.
        traceRoute();
      }
    };

    // Initial location update
    updateLocation();

    // Update location every one minute
    const locationInterval = setInterval(() => {
      updateLocation();
    }, 500); // 60 seconds

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(locationInterval);
    };
  }, [trip, origin, destination]);

  return (
    <View style={styles.container}>
      {origin && destination && (
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            ...origin,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <Marker coordinate={origin} />
          <Marker coordinate={destination} />
          {showDirections && origin && destination && (
            <MapViewDirections
              origin={origin}
              destination={trip.user_drop}
              apikey={GOOGLE_API_KEY}
              strokeColor="#6644ff"
              strokeWidth={4}
              onReady={traceRouteOnReady}
            />
          )}
        </MapView>
      )}
      <View style={styles.searchContainer}>
        {/* <InputAutocomplete
          label="Origin"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "origin");
          }}
        />
        <InputAutocomplete
          label="Destination"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "destination");
          }}
        /> */}
        {/* Removed the Trace route button */}
        {distance && duration ? (
          <View>
            <Text>Distance: {distance.toFixed(2)}</Text>
            <Text>Duration: {Math.ceil(duration)} min</Text>
          </View>
        ) : null}
      </View>
        <TouchableOpacity style={styles.navigateButton} onPress={openGoogleMaps}>
        <Text style={styles.navigate}>Navigate</Text>
        <View style={styles.icon}>
        <Icon name="location-arrow" size={30} color="#ffffff" />
        
        </View>
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        {/* <InputAutocomplete
          label="Origin"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "origin");
          }}
        />
        <InputAutocomplete
          label="Destination"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "destination");
          }}
        /> */}
        {/* Removed the Trace route button */}
        {distance && duration ? (
          <View>
            <Text>Distance: {distance.toFixed(2)}</Text>
            <Text>Duration: {Math.ceil(duration)} min</Text>
            <Text>PickupLocation:{trip.user_pickup} </Text>
            <Text>DropLocation:{trip.user_drop} </Text>
          </View>
        ) : null}
      </View>
      {/* <TouchableOpacity style={styles.openMapsButton} onPress={openGoogleMaps}>
    <Text style={styles.openMapsButtonText}>Navigate</Text>
  </TouchableOpacity> */}
       <TouchableOpacity style={styles.startTripButton}  onPress={handleStartTrip}>
        <Text style={styles.startTripButtonText}>End Trip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
   top:'78%',
  },
   navigateButton: {
    backgroundColor: "blue",
      top:'-25%',
      borderRadius: 50,
      width:250,
      height:60,
      alignItems:"stretch",
      marginRight:'-20%',
  },
  navigate: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    marginTop:20,
  


  },
  icon:{
    top:-30,
    marginLeft:50,
  },
   openMapsButton: {
  backgroundColor: 'blue',
  paddingVertical: 16,
  width: '100%',
  alignItems: 'center',
  position: 'absolute',
  bottom: 20,
  marginBottom:'10%'
},
openMapsButtonText: {
  color: 'white',
  fontSize: 18,
  fontWeight: 'bold',
},

  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#bbb",
    paddingVertical: 12,
    marginTop: 16,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: "center",
  },
  startTripButton: {
    position: "absolute",
    bottom: 0, // Place it at the bottom
    backgroundColor: "black",
    width: "100%",
    paddingVertical: 16,
    alignItems: "center",
  },
  startTripButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default MapPage;
