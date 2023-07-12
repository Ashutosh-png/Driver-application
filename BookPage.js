import React, { useState, useRef } from "react";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DatePicker from "react-native-date-ranges";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
  TextInput,
  Animated,
  Easing,
  Alert
} from "react-native";
import { Feather } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const GOOGLE_PLACES_API_KEY = "AIzaSyCelDo4I5cPQ72TfCTQW-arhPZ7ALNcp8w";
const BACKEND_API_URL = "YOUR_BACKEND_API_URL";

const App = () => {
  const navigation = useNavigation();

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [distance, setDistance] = useState(null);

  const [selectedDates, setSelectedDates] = useState();
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [tripType, setTripType] = useState("one way"); // State to track the selected trip type

  const [showRentalField, setShowRentalField] = useState(false); // New state variable

  const rentalFieldHeight = useRef(new Animated.Value(0)).current; // Animation property

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setShowTimePicker(false);
  };

  const handleTripTypePress = (type) => {
    setTripType(type);
    setSelectedDates(null);

    // Toggle the rental field visibility
    if (type === "rental") {
      setShowRentalField(true);
      Animated.timing(rentalFieldHeight, {
        toValue: 50, // Adjust the height as needed
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    } else {
      setShowRentalField(false);
      Animated.timing(rentalFieldHeight, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
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

  const handleSubmit = async () => {
    try {
      if (
      pickupLocation === "" ||
      dropLocation === "" ||
      selectedDates === null ||
      selectedTime === null
    ) {
      // Display an error message or prevent form submission
      console.log("Please fill in all the required fields");
                Alert.alert('Error', "please fill all information");

      return;
    }
      // Fetch distance between pickup and drop locations using Google Maps Distance Matrix API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
          pickupLocation
        )}&destinations=${encodeURIComponent(
          dropLocation
        )}&key=${GOOGLE_PLACES_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch distance data");
      }

      const data = await response.json();

      // Extract distance value (in meters) from the API response
      const distanceInMeters = data?.rows[0]?.elements[0]?.distance?.value;

      // Convert distance from meters to kilometers
      const distanceInKilometers = distanceInMeters / 1000;

      // Set the distance in the state
      setDistance(distanceInKilometers);

      // Prepare the data object with form information and distance
      const formData = {
        pickupLocation,
        dropLocation,
        distance: distanceInKilometers,
        tripType,
        selectedDates,
        selectedTime,
      };
      console.log("BookPage ", formData);

      // Send the data to the SelectCabPage component using navigation
      navigation.navigate("SelectCab", { formData: formData });

      // Send the data to the backend API using a POST request
      const apiResponse = await fetch(BACKEND_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!apiResponse.ok) {
        throw new Error("Form submission failed");
      }

      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const customButton = (onConfirm) => {
    return (
      <Pressable onPress={onConfirm} style={styles.customButton}>
        <Text style={styles.customButtonText}>Submit</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.checkboxContainer}>
          <Pressable
            style={[
              styles.checkbox,
              tripType === "one way" && styles.checkboxSelected,
            ]}
            onPress={() => handleTripTypePress("one way")}
          >
            <Text style={styles.checkboxText}>One Way</Text>
          </Pressable>

          <Pressable
            style={[
              styles.checkbox,
              tripType === "round" && styles.checkboxSelected,
            ]}
            onPress={() => handleTripTypePress("round")}
          >
            <Text style={styles.checkboxText}>Round Trip</Text>
          </Pressable>

          <Pressable
            style={[
              styles.checkbox,
              tripType === "rental" && styles.checkboxSelected,
            ]}
            onPress={() => handleTripTypePress("rental")}
          >
            <Text style={styles.checkboxText}>Rental</Text>
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <GooglePlacesAutocomplete
            placeholder="Pickup Point"
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: "en",
            }}
            onPress={(data, details = null) => {
              setPickupLocation(data.description);
            }}
            onFail={(error) => console.error(error)}
            styles={{
              container: styles.googlePlacesContainer,
              textInput: styles.googlePlacesTextInput,
              listView: styles.googlePlacesListView,
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <GooglePlacesAutocomplete
            placeholder="Drop Point"
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: "en",
            }}
            onPress={(data, details = null) => {
              setDropLocation(data.description);
            }}
            onFail={(error) => console.error(error)}
            styles={{
              container: styles.googlePlacesContainer,
              textInput: styles.googlePlacesTextInput,
              listView: styles.googlePlacesListView,
            }}
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="calendar" size={24} color="black" />
          <DatePicker
            style={styles.datePicker}
            customStyles={{
              placeholderText: styles.datePickerPlaceholder,
              headerStyle: styles.datePickerHeader,
              contentText: styles.datePickerContent,
            }}
            selectedBgColor="#0047AB"
            customButton={(onConfirm) => customButton(onConfirm)}
            onConfirm={(startDate, endDate) =>
              setSelectedDates(startDate, endDate)
            }
            allowFontScaling={false}
            placeholder="Select Your Dates"
            mode={tripType === "round" ? "range" : "single"}
          />
        </View>

        <Pressable
          onPress={() => setShowTimePicker(true)}
          style={styles.inputContainer}
        >
          <Feather name="clock" size={24} color="black" />
          <TextInput
            placeholder="Select Time"
            value={selectedTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            editable={false}
            style={styles.timeInput}
          />
        </Pressable>

        {showTimePicker && (
          <DateTimePickerModal
            mode="time"
            value={selectedTime}
            isVisible={showTimePicker}
            onConfirm={handleTimeChange}
            onCancel={() => setShowTimePicker(false)}
          />
        )}

        {showRentalField && (
          <Animated.View style={[styles.inputContainer, { height: rentalFieldHeight }]}>
            <TextInput
              placeholder="Enter hours"
              style={styles.rentalTextInput}
            />
          </Animated.View>
        )}

        <Pressable
          onPress={handleSubmit}
          style={[styles.button, styles.searchButton]}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: Constants.statusBarHeight,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  checkbox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 4,
    marginRight: 8,
  },
  checkboxSelected: {
    backgroundColor: "#FFC72C",
    borderColor: "#FFC72C",
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 4,
    marginBottom: 10,
  },
  googlePlacesContainer: {
    flex: 1,
  },
  googlePlacesTextInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  googlePlacesListView: {
    borderWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "#FFF",
    marginHorizontal: 12,
    marginTop: 2,
  },
  datePicker: {
    flex: 1,
    marginLeft: 8,
  },
  datePickerPlaceholder: {
    fontSize: 14,
    color: "#999",
  },
  datePickerHeader: {
    backgroundColor: "#003580",
  },
  datePickerContent: {
    fontSize: 14,
    color: "black",
  },
  timeInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  rentalTextInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 4,
  },
  searchButton: {
    backgroundColor: "#2a52be",
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  customButton: {
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 4,
    backgroundColor: "#2a52be",
    marginTop: 10,
  },
  customButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default App;
