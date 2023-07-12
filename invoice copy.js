import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Invoice = ({ route }) => {
  const navigation = useNavigation();
  const { modelName, distance, fare } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "AimCabBooking",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        textShadowColor: "rgba(0, 0, 0, 0.1)",
        textShadowOffset: {
          width: 1,
          height: 1,
        },
        textShadowRadius: 2,
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
      },
      headerRight: () => (
        <MaterialIcons
          name="notifications"
          size={24}
          color="white"
          style={{ marginRight: 12 }}
        />
      ),
    });
  }, []);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleFormSubmit = () => {
    // Handle form submission logic here
     // Send the data to the Invoice component using navigation
     navigation.navigate("Payment");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Invoice</Text>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pickup Point</Text>
          <Text>Pune</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Drop Point</Text>
          <Text>Mumbai</Text>
        </View>
      </View>

      <View style={styles.cabCard}>
        <Text style={styles.cardTitle}>Cab Details:</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text>Sedan</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Seats:</Text>
          <Text>4</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Fuel:</Text>
          <Text>CNG</Text>
        </View>
        
        {/* <View style={styles.row}>
          <Text style={styles.label}>Distance:</Text>
          <Text>320</Text>
        </View> */}
        <View style={styles.row}>
          <Text style={styles.label}>Price:</Text>
          <Text>1952</Text>
        </View>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formCard}>
          <Text style={styles.formLabel}>Passenger form</Text>
          <View style={styles.formField}>
            <FontAwesome name="user" size={18} color="#ccc" style={{ marginRight: 5 }} />
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.formField}>
            <FontAwesome name="calendar" size={18} color="#ccc" style={{ marginRight: 5 }} />
            <TextInput
              style={styles.input}
              placeholder="Enter age"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />
          </View>
          <View style={styles.formField}>
            <FontAwesome name="venus-mars" size={18} color="#ccc" style={{ marginRight: 5 }} />
            <View style={styles.genderButtonsContainer}>
              <Button
                title=" Male "
                onPress={() => setGender("Male")}
                color={gender === "Male" ? "#003580" : "#ccc"}
              />
              <Button
                title="Female"
                onPress={() => setGender("Female")}
                color={gender === "Female" ? "#003580" : "#ccc"}
              />
            </View>
          </View>
         <View style={styles.formField}>
            <FontAwesome name="phone" size={18} color="#ccc" style={{ marginRight: 5 }} />
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
          
        </View>
      </View>

      <View style={styles.paymentContainer}>
        <Text style={styles.paymentTitle}>Payment Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Base Fare:</Text>
          <Text>{fare}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Distance:</Text>
          <Text>{distance}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Service charges:</Text>
          <Text>{parseInt((fare*distance)%10)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total:</Text>
          <Text>{parseInt(fare + distance)}</Text>
        </View>
        <View style={styles.submitButtonContainer}>
            <Button title="Book now" onPress={handleFormSubmit} color="#003580" />
          </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  cabCard: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
  },
  formContainer: {
    marginBottom: 20,
  },
  formCard: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  formLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  formField: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  genderButtonsContainer: {
    flexDirection: "row",
   
    flex: 1,
    marginLeft: 6,
  },
  submitButtonContainer: {
    marginTop: 10,
  },
  paymentContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  paymentTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default Invoice;