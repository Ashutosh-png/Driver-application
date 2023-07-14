import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';

const Invoice = ({ route }) => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState("");

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
    const [userid, setUserid] = useState("");
        const [email, setemail] = useState("");


  

  const { modelName, distance, fare, pickup, drop, price, date, time, st, fl, triptype,startDate,endDate , modelType} = route.params;
  
console.log("model  ",JSON.stringify(modelType));
  

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "",
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchedData = await AsyncStorage.getItem("userData");
      if (fetchedData !== null) {
        const user = JSON.parse(fetchedData);
        console.log("Invoice: " + JSON.stringify(user));
        setUserData(user);
        setName(user.name);
        setAge(user.age + "");
        setGender(user.gender);
        setPhoneNumber(user.phone);
        setUserid(user.userid);
        setemail(user.email);
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  console.log("userid  ",userid);
    console.log("user email  ",email);


  const getButtonColor = (buttonGender) => {
    if (gender === buttonGender) {
      return "#003580"; // Active button color
    }
    return "#ccc"; // Inactive button color
  };

  const handleFormSubmit = () => {
        let date1 = date.currentDate;
    if(triptype==="round"){
       date1 = startDate;
    }

    console.log("date  ",date1);


       //age , gender , fare

    const InvoiceData = {
      name,
      phone:phoneNumber,
      email,
      car:modelName,
      distance,
      user_pickup:pickup,
      user_drop: drop,
      date1 ,
      dateend:endDate,
      time,
      st,
      fl,
      user_trip_type:triptype,
      userid,
      driver_bhata: driverRate,
      gst,
      service_charge:serviceCharges,
      baseAmount: price,
      amount: totalAmount,
      days:daysDiff
    };

    navigation.navigate("Payment", { InvoiceData });
  };

  const [serviceCharges, setServiceCharges] = useState(0);
  const [gst, setGst] = useState(0);
  const [totalAmount, setTotalAmount] = useState(price);

  useEffect(() => {
    const calculatedServiceCharges = Math.floor((price )/ 100) * 10;
    setServiceCharges(calculatedServiceCharges);

    const calculatedGst = Math.floor((price) / 100) * 5;
    setGst(calculatedGst);
    console.log("gst ",calculatedGst);



    const calculatedTotalAmount = price + calculatedServiceCharges + calculatedGst;
    setTotalAmount(calculatedTotalAmount);
  }, []);


  if(triptype==="round"){
     useEffect(() => {
    const calculatedServiceCharges = Math.floor((price+driverRate )/ 100) * 10;
    setServiceCharges(calculatedServiceCharges);

    const calculatedGst = Math.floor((price+driverRate) / 100) * 5;
    setGst(calculatedGst);
    console.log("gst ",calculatedGst);



    const calculatedTotalAmount = price + calculatedServiceCharges + calculatedGst+driverRate;
    setTotalAmount(calculatedTotalAmount);
  }, []);

  }

 const start = moment(startDate, 'YYYY/MM/DD');
const end = moment(endDate, 'YYYY/MM/DD');
const daysDiff = end.diff(start, 'days') + 1; // Adding 1 to include both start and end dates

console.log("daydifference...........: ", daysDiff);
console.log("startDate: ", startDate);
console.log("endDate: ", endDate);
  console.log(startDate);
    console.log(endDate);



  // Calculate the driver rate based on the number of days
  let driverRate = 0; // Base driver rate per day
  driverRate += daysDiff * 300; // Increase rate by 100 per day

  console.log("driver rate ",driverRate);
  console.log(parseInt(("rate ",fare * distance) ))
  console.log(fare);
  console.log(distance);

 // const serviceCharges = fare * distance * 0.1; // 10% of the fare * distance
 // console.log("service charge",serviceCharges);



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pickup Point</Text>
          <Text>{pickup}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Drop Point</Text>
          <Text>{drop}</Text>
        </View>
      </View>

      <View style={styles.cabCard}>
        <Text style={styles.cardTitle}>Cab Details:</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Name: </Text>
          <Text>{modelName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Seats:</Text>
          <Text>{st}+1</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Fuel:</Text>
          <Text>{fl}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Trip Type:</Text>
          <Text>{triptype}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Distance:</Text>
          <Text>{parseInt(distance)} km</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Price:</Text>
          <Text>{"₹ " + price}</Text>
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
                color={getButtonColor("Male")}
              />
              <Button
                title="Female"
                onPress={() => setGender("Female")}
                color={getButtonColor("Female")}
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
          <Text>{fare} /km</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Service charges:</Text>
          <Text>{"₹ " + serviceCharges}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>GST(5%)</Text>
          <Text>{"₹ " + gst}</Text>
        </View>
         {triptype === "round" && (
          <View style={styles.row}>
            <Text style={styles.label}>Driver rate:</Text>
            <Text>{"₹ " + driverRate}</Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.label}>Total Amount:</Text>
          <Text style={styles.highlightedAmount}>{"₹ " + totalAmount}</Text>
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
  highlightedAmount: {
    fontSize:18,
    fontWeight: "bold",
    color: "green",
  },
});

export default Invoice;