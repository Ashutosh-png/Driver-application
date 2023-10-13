import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';



  
function Offers({ route }) {
  const { trip ,odostart,kilometers} = route.params;
  console.log("trip",trip);
  const drop = trip.user_drop;
  console.log("drop", drop);
    const navigation = useNavigation();
    const km=kilometers-odostart;
    const extrakm=km-trip.distance;
    const fare=trip.baseAmount/trip.distance;
    const extraprice=fare*extrakm;
    const tripAmount = parseInt(trip.amount, 10); // Parse the string as an integer with base 10

    const totalamount=extraprice+tripAmount;
console.log(extrakm);
console.log(extraprice);
console.log(fare);
console.log(trip.amount);


    const handleAnotherButton = () => {
      // Handle the click event for the second button here
      // You can perform the necessary action for this button
      // ...
    };
  
    


    const handleGarageOut = () => {
      // Handle the "Garage Out" button click event here
      // You can perform the necessary action when the user clicks this button
  
      // Check if online payment is available
      const isOnlinePaymentAvailable = false; // Replace this with your logic to determine online payment availability
  
      if (isOnlinePaymentAvailable) {
        // If online payment is available, navigate to the appropriate screen or perform other actions
        // For now, show an alert message
        Alert.alert('Online Payment', 'Online payment is available.');
      } else {
        // If online payment is not available, show an alert message
        Alert.alert('Online Payment', 'Online payment is not available.');
      }
  
      // You can also uncomment your fetch logic here if needed
  
      // const data = {
      //   phone: trip.phone,
      //   email: trip.email,
      //   bookid: trip.bookid
      // };
  
      // Send the data to the login endpoint
      // fetch('https://aimcabbooking.com/admin/user-otp-api.php', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // })
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error('Network response was not ok');
      //     }
      //     // No need to parse JSON response since none is expected
      //     console.log('Garage Out request successful');
      //     navigation.navigate('StartTrip', { trip });
      //     // You can navigate to the Home screen or perform other actions here
      //   })
      //   .catch((error) => {
      //     console.error('Error:', error);
      //   });
    };
  
   return (
    <ScrollView style={styles.container}>
    <View>
      {/* User Pickup Card */}
      
      {/* <View style={styles.card}>
        <Text style={styles.cardTitle}>User Pickup:</Text>
        <Text style={styles.value}>{trip.user_pickup}</Text>
      </View> */}

      {/* User Drop Card */}
      {/* <View style={styles.card}>
        <Text style={styles.cardTitle}>User Drop:</Text>
        <Text style={styles.value}>{trip.user_drop}</Text>
      </View> */}

      {/* Main Trip Details Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Trip Details:</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>User Pickup:</Text>

          <Text style={styles.value}>{trip.user_pickup}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>User Drop:</Text>
          <Text style={styles.value}>{trip.user_drop}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>User Name:</Text>
          <Text style={styles.value}>{trip.name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Booking ID:</Text>
          <Text style={styles.value}>{trip.bookid}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Booking Type:</Text>
          <Text style={styles.value}>{trip.user_trip_type}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Distance:</Text>
          <Text style={styles.value}>{trip.distance}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Fare:</Text>
          <Text style={styles.value}>{fare}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Cab ID:</Text>
          <Text style={styles.value}>{trip.cabid}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Car Type:</Text>
          <Text style={styles.value}>{trip.car}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>{trip.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{trip.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{trip.email}</Text>
        </View>
       
        <View style={styles.detailRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{trip.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Odometer Start:</Text>
          <Text style={styles.value}>{odostart}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Odometer End:</Text>
          <Text style={styles.value}>{kilometers}</Text>
        </View>
        
        {/* Add more detail rows for other trip details */}
      </View>

      <View style={styles.card}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Original Amount:</Text>
          <Text style={styles.value}>{trip.amount}</Text>
        </View>
      <View style={styles.detailRow}>
          <Text style={styles.label}>Base Amount:</Text>
          <Text style={styles.value}>{trip.baseAmount}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Distance:</Text>
          <Text style={styles.value}>{trip.distance}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Extra Kilometers:</Text>
          <Text style={styles.value}>{extrakm}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Extra Amount:</Text>
          <Text style={styles.value}>{extrakm*fare}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Total Amount:</Text>
          <Text style={styles.value}>{totalamount}</Text>
        </View>

      </View>

      <View style={styles.card}>
        
      <Text style={styles.title   } >Payment </Text>
      <TouchableOpacity style={styles.button} onPress={handleGarageOut}>
          <Text style={styles.buttonText}>Online</Text>
        </TouchableOpacity>
        
          {/* <Text style={styles.value}>{trip.username}</Text> */}
      
      
          <TouchableOpacity
    onPress={() => {
      // Handle the "Start Trip" button click event here
      // You can add the logic to start the trip
          navigation.navigate('EndPage');

    }}
    style={{
      backgroundColor: '#ffb703',
      borderRadius: 15,
      padding: 10,
      margin: 10,
      fontSize:28,
    }}
  >
    <Text style={{ color: 'white', textAlign:'center',fontSize:28, }}>Cash </Text>
  </TouchableOpacity>
         
         

      </View>
      
    </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 7,
    margin: 2,
    elevation: 3,
    marginTop: 16,

    
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
    marginTop: 0,
    borderWidth:0.5,
  },
  label: {
    fontWeight: 'bold',
    fontSize:18
  },
  value: {
    fontSize: 18,
    
    color: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '45%',
    right:10
  },
  button: {
    backgroundColor: '#ffb703',
    borderRadius: 15,
    padding: 10,
    margin: 10,
  },
  title:{
    fontSize:24,
    fontWeight: 'bold',
    
    

  },
  buttonText: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default  Offers;