import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
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
import { useRef, useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import { useNavigation } from '@react-navigation/native'; 


const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const GOOGLE_API_KEY ="AIzaSyCelDo4I5cPQ72TfCTQW-arhPZ7ALNcp8w";
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 40.76711,
  longitude: -73.979704,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

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

const MapPage=()=> {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
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
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
    }
  };

  const navigation = useNavigation(); // Initialize navigation

  const handleOngoingTripPress = () => {
    navigation.navigate('OngoingTrip'); // Navigate to the "OngoingTrip" page
  };

  const handleUpcomingTripPress = () => {
    navigation.navigate('UpcomingTrip'); // Navigate to the "Button2Page"
  };

  const handleCancelTripPress = () => {
    navigation.navigate('CancelTrip'); // Navigate to the "Button3Page"
  };
  const handleCompletTripPress = () => {
    navigation.navigate('CompletTrip'); // Navigate to the "Button3Page"
  };

  const onPlaceSelected = (
    details,
    flag
  ) => {
    const set = flag === "origin" ? setOrigin : setDestination;
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    set(position);
    moveTo(position);
  };

  return (
    <View style={styles.container}>
      

      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      >
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />}
        {showDirections && origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeColor="#6644ff"
            strokeWidth={4}
            onReady={traceRouteOnReady}
          />
        )}
      </MapView>
      <View style={styles.searchContainer}>
      <View style={{ ...styles.buttonContainer, flexDirection: 'row' }}>
    <TouchableOpacity
      style={{ ...styles.button, backgroundColor: 'white' }}
      onPress={handleUpcomingTripPress}
    >
      <Text style={{ ...styles.buttonText, color: 'black' }}>Upcoming</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ ...styles.button, backgroundColor: 'white' }}
      onPress={handleOngoingTripPress}
    >
      <Text style={{ ...styles.buttonText, color: 'black' }}>Ongoing</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ ...styles.button, backgroundColor: 'white' }}
      onPress={handleCancelTripPress}
    >
      <Text style={{ ...styles.buttonText, color: 'black' }}>Canceled</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ ...styles.button, backgroundColor: 'white'  }}
      onPress={ handleCompletTripPress}
    >
      <Text style={{ ...styles.buttonText, color: 'black' }}>Completed</Text>
    </TouchableOpacity>
  </View>
       
       
      </View>
    </View>
  );
}

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
    width: "100%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    margin:-28,
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
  odometerContainer: {
    alignItems: 'center',
    height: 400,
    width: 490,
    borderColor: 'black',
    
    borderRadius: 10,
    marginTop:20,
  },
  odometerImage: {
    width: 150,
    height: 150,
    marginTop:20,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 0,
    width: '27%',
    right:8,
    borderColor:'black',
    margin:10,
   
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 5,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    height:'65%',
    borderWidth:0.3,
    width:'92%',

    
    
  },
  buttonText: {
    fontSize: 15, // Set the text size to 28
    
  },

  buttonText: {
    textAlign: "center",
  },
});

export default MapPage;