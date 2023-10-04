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
  const { trip } = route.params;
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
      mapRef.current?.fitToCoordinates([origin, trip.user_pickup], { edgePadding });
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

  const handleStartTrip = () => {
    navigation.navigate('startTrip', { trip }); // Navigate to the 'MapNavigate' screen
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
    }, 10000); // 60 seconds

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
              destination={trip.user_pickup}
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
       <TouchableOpacity style={styles.startTripButton}  onPress={handleStartTrip}>
        <Text style={styles.startTripButtonText}>Reach Pickup</Text>
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
    top: Constants.statusBarHeight,
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
