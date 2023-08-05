import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
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
        <View style={styles.topContainer}>
          <View style={styles.leftColumn}>
            <Text style={styles.modelType}>{data.model_type}</Text>
            <Text style={styles.modelName}>{data.model_name}</Text>
            <Text style={styles.price}>Price: {price}</Text>
          </View>
          <Image source={{ uri: imageUrl }} style={styles.cardImage} />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.column}>
            <Text style={styles.title}>Features:</Text>

            <View style={styles.featureContainer}>
              <FontAwesome5
                name="gas-pump"
                style={[styles.featureIcon, { color: "#FF4500" }]}
                solid
              />
              <Text style={styles.featureText}>{data.fuel_type}</Text>
            </View>
            <View style={styles.featureContainer}>
              <FontAwesome5
                name="usb"
                style={[styles.featureIcon, { color: "#4169E1" }]}
                solid
              />
              <Text style={styles.featureText}>USB Charging </Text>
            </View>
            <View style={styles.featureContainer}>
              <FontAwesome5
                name="snowflake"
                style={[styles.featureIcon, { color: "#00BFFF" }]}
                solid
              />
              <Text style={styles.featureText}>Air Conditioning</Text>
            </View>
          </View>
          <View style={styles.column}>
            <View style={styles.featureContainer}>
              <Text></Text>
            </View>
            <View style={styles.featureContainer}>
              <FontAwesome5
                name="music"
                style={[styles.featureIcon, { color: "#8A2BE2" }]}
                solid
              />
              <Text style={styles.featureText}>Music System</Text>
            </View>
            <View style={styles.featureContainer}>
              <FontAwesome5
                name="suitcase"
                style={[styles.featureIcon, { color: "#32CD32" }]}
                solid
              />
              <Text style={styles.featureText}>Capacity: 3 bags</Text>
            </View>
            <View style={styles.featureContainer}>
              <FontAwesome5
                name="hotel"
                style={[styles.featureIcon, { color: "#FF8C00" }]}
                solid
              />
              <Text style={styles.featureText}>FastStay & 1 More</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.buttonContainer} onPress={handleBooking}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Book Now</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    padding: 15,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  leftColumn: {
    flex: 1,
  },
  modelType: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  modelName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  fuelType: {
    fontSize: 16,
    marginBottom: 10,
    color: "#666",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
  },
  cardImage: {
    width: 140,
    height: 70,
    borderRadius: 10,
    marginLeft: 20,
  },
  bottomContainer: {
    flexDirection: "row",
  },
  column: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  featureContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  featureIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  featureText: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  button: {
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    borderWidth: 2,
    borderColor: "#0056b3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default Card;
