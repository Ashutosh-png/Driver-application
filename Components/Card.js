import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Card = ({ data, distance1, fare1, triptype, time, pickup, drop, date, roundfare1 }) => {
  const modelType = data.model_type
  const navigation = useNavigation();
  console.log("card date", date);
  const startDate = date.startDate;
  const endDate = date.endDate;

  const [rounddata, setRoundData] = useState(null);
  const [error, setError] = useState(null);
  const [roundpackage, setRoundPackage] = useState(null); // Add fare state

  let distance = null;
  let fare = null;
  let price = null;

  const calculatePrice = () => {
    if (triptype === "one way") {
      fare = fare1;
      distance = distance1;
      price = fare * parseInt(distance);
    } else if (triptype === "round") {
      if (rounddata) {
        distance = rounddata.int;
        fare = roundfare1;
        price = fare * parseInt(distance);
      }
    }
  };

  useEffect(() => {
    fetch("https://aimcabbooking.com/roundtrip_api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trip: "",
        bookid: "",
        phone: "",
        pickup,
        drop,
        date: startDate,
        time,
        distance: distance1,
        dateend: endDate,
        timeend: "12:00 PM",
      }),
    })
      .then((response) => response.json())
      .then((rounddata) => {
        // Process the fetched data and set the fare state
        console.log("round package data", rounddata);
        setRoundPackage(rounddata);
        setRoundData(rounddata);
      })
      .catch((error) => {
        console.error("Error fetching fare:", error);
        setError(error);
      });
  }, []);

  calculatePrice();

  console.log(price);

  console.log("data  ",data);

  const handleBooking = () => {
    // Handle booking logic here
        // Handle booking logic here
    console.log("Booking button clicked");
    console.log("distance" + distance);
    console.log("seats"+ data.seats);
    console.log("tirptype ", triptype);
    const st = data.seats;
    const fl  = data.fuel_type
    console.log('trip ',triptype);
 // navigation.navigate("invoice", {seat: data.seats, fuel: data.fuel_type ,modelName: data.model_name, distance, fare, time,pickup,drop ,date,price: fare * parseInt(distance)});
navigation.navigate("invoice", { startDate,endDate,st, fl,modelType, modelName: data.model_name, distance, fare, time,triptype, pickup, drop, date, price: fare * parseInt(distance),triptype });
  };

  const imageUrl =
    "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1568134115/assets/6d/354919-18b0-45d0-a151-501ab4c4b114/original/XL.png";

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.place}>{data.model_name}</Text>
          <Text style={styles.shortDescription}>
            Model:
            <Text style={styles.value}> {data.model_type}</Text>
          </Text>
          <Text style={styles.shortDescription}>
            Seats:
            <Text style={styles.value}> {data.seats}</Text>
          </Text>
          <Text style={styles.shortDescription}>
            Fuel:
            <Text style={styles.value}> {data.fuel_type}</Text>
          </Text>
          <Text style={styles.shortDescription}>
            Price:
            <Text style={styles.value}>{price}</Text>
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleBooking}>
              <Text style={styles.buttonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Image source={{ uri: imageUrl }} style={styles.cardImage} />
      </View>
    </View>
  );
};

const styles = {
  card: {
    backgroundColor: "#fff",
    borderRadius: 25,
    marginHorizontal: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 8,
  },
  cardContent: {
    flexDirection: "row",
    padding: 15,
  },
  cardImage: {
    width: 140,
    height: 70,
    borderTopRightRadius: 25,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  place: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  shortDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default Card;
