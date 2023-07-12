import React, { useState,useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Animated,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";

const App = () => {
  const [tripType, setTripType] = useState("oneWay");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [showTimepicker, setShowTimepicker] = useState(false);
  const [distance, setDistance] = useState("");

  const handleTripTypeChange = (newTripType) => {
    setTripType(newTripType);
  };

  const handleDateChange = (event, selectedDate) => {
    setSelectedDate(selectedDate);
    setShowDatepicker(false);
  };

  const handleTimeChange = (event, selectedTime) => {
    setSelectedTime(selectedTime);
    setShowTimepicker(false);
  };

  const handleSubmit = () => {
    // Submit the form data to the server
  };

  const rentalPosition = useRef(new Animated.Value(0)).current;

  const toggleRental = () => {
    Animated.timing(rentalPosition, {
      toValue: tripType === "rental" ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trip Type</Text>
        <View style={styles.tripTypeContainer}>
          <Pressable
            style={[
              styles.tripTypeButton,
              tripType === "oneWay"
                ? styles.tripTypeButtonActive
                : styles.tripTypeButtonInactive,
            ]}
            onPress={() => handleTripTypeChange("oneWay")}
          >
            <Text style={styles.tripTypeButtonText}>One Way</Text>
          </Pressable>
          <Pressable
            style={[
              styles.tripTypeButton,
              tripType === "roundTrip"
                ? styles.tripTypeButtonActive
                : styles.tripTypeButtonInactive,
            ]}
            onPress={() => handleTripTypeChange("roundTrip")}
          >
            <Text style={styles.tripTypeButtonText}>Round Trip</Text>
          </Pressable>
          <Pressable
            style={[
              styles.tripTypeButton,
              tripType === "rental"
                ? styles.tripTypeButtonActive
                : styles.tripTypeButtonInactive,
            ]}
            onPress={() => {
              handleTripTypeChange("rental");
              toggleRental();
            }}
          >
            <Text style={styles.tripTypeButtonText}>Rental</Text>
          </Pressable>
        </View>
      </View>
      {showDatepicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {showTimepicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Date</Text>
        <Pressable
          style={[
            styles.timePicker,
            { borderBottomWidth: 2, borderBottomColor: "#E5E5E5" },
          ]}
          onPress={() => setShowDatepicker(true)}
        >
          <Icon name="calendar-outline" size={24} color="#003580" />
          <Text style={styles.timePickerText}>
            {selectedDate.toLocaleDateString()}
          </Text>
        </Pressable>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Time</Text>
        <Pressable
          style={[
            styles.timePicker,
            { borderBottomWidth: 2, borderBottomColor: "#E5E5E5" },
          ]}
          onPress={() => setShowTimepicker(true)}
        >
          <Icon name="time-outline" size={24} color="#003580" />
          <Text style={styles.timePickerText}>
            {selectedTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </Pressable>
      </View>
      {tripType !== "rental" && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Distance (km)</Text>
          <TextInput
            style={styles.distanceInput}
            value={distance}
            onChangeText={setDistance}
          />
        </View>
      )}
      {tripType === "rental" && (
        <Animated.View
          style={[
            styles.section,
            { height: rentalPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 140],
            }) },
          ]}
        >
          <Text style={styles.sectionTitle}>Rental Details</Text>
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 16, color: "#5d5d5d" }}>
              Select pickup and return time:
            </Text>
            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <Pressable
                style={[
                  styles.timePicker,
                  { marginRight: 8, flex: 1 },
                  Platform.OS === "ios" && { borderBottomWidth: 0 },
                ]}
                onPress={() => setShowTimepicker(true)}
              >
                <Icon name="time-outline" size={24} color="#003580" />
                <Text style={styles.timePickerText}>
                  {selectedTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.timePicker,
                  { marginLeft: 8, flex: 1 },
                  Platform.OS === "ios" && { borderBottomWidth: 0 },
                ]}
                onPress={() => setShowTimepicker(true)}
              >
                <Icon name="time-outline" size={24} color="#003580" />
                <Text style={styles.timePickerText}>
                  {selectedTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      )}
      <View style={styles.submitButtonContainer}>
        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Book Trip</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tripTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  tripTypeButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 2,
  },
  tripTypeButtonActive: {
    backgroundColor: "#003580",
    borderColor: "#003580",
  },
  tripTypeButtonInactive: {
    backgroundColor: "white",
    borderColor: "#E5E5E5",
  },
  tripTypeButtonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  datePicker: {
    width: "100%",
    height: 48,
  },
  timePicker: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
  },
  timePickerText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#5d5d5d",
  },
  distanceInput: {
    height: 48,
    borderRadius: 8,
    padding: 12,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#E5E5E5",
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButtonContainer: {
    alignItems: "center",
    marginTop: 24,
  },
  submitButton: {
    backgroundColor: "#003580",
    borderRadius: 8,
    height: 48,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default App;