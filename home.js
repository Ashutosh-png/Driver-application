import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Header from './Components/Header';
import MapView, { Marker } from 'react-native-maps';
import { Location,Permissions} from 'expo';
// Import other components/screens if needed
//import BookPage from './BookPage';
import Trip from './Trip';
import Offers from './Offers';
import Profile from './Profile';



  const HomePage = ({ navigation }) => {
    
      const [userLocation, setUserLocation] = useState({
        latitude: 18.5204,
        longitude: 73.8567,
    });
    const [isOnline, setIsOnline] = useState(true);

    const handlePress = () => {
      setIsOnline(!isOnline);
    };

     const handleMapNavigate = () => {
    navigation.navigate('MapNavigate'); // Navigate to the 'MapNavigate' screen
  };

   const handleCurrent = () => {
    navigation.navigate('CurrentLocation'); // Navigate to the 'MapNavigate' screen
  };
  
    const buttonColor = isOnline ? 'green' : 'grey';
    const onlineTextOpacity = isOnline ? 1 : 0.6;
    const offlineTextOpacity = isOnline ? 0.6 : 1;
    useEffect(() => {
      (async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
  
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({});
          console.log("Location Data:", location);
          setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        } else {
          // Handle the case where location permission is not granted
          console.log('Location permission denied');
        }
      })();
    }, []);
 
  return (
    <View>
      <Header />
      <View style={styles.buttoncontainer}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonColor }]}
        onPress={handlePress}
      >
        <Text style={[styles.buttonText, { opacity: onlineTextOpacity }]}>Online</Text>
        <Text style={[styles.buttonText, { opacity: offlineTextOpacity }]}>Offline</Text>
      </TouchableOpacity>
       {/* <TouchableOpacity
          style={styles.mapNavigateButton}
          onPress={handleMapNavigate}
        >
          <Text style={styles.mapNavigateButtonText}>Go to Map</Text>
        </TouchableOpacity>

         <TouchableOpacity
          style={styles.mapNavigateButton}
          onPress={handleCurrent}
        >
          <Text style={styles.mapNavigateButtonText}>Go to current</Text>
        </TouchableOpacity> */}
    </View>
    <View style={styles.mapcontainer}>
  {userLocation.latitude && userLocation.longitude ? (
          <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 18.5204,
            longitudeDelta: 73.8567,
          }}
        >
          <Marker coordinate={userLocation} title="Your Location" />
        </MapView>
  ) : (
    <Text>Loading map...</Text>
  )}
</View>
      {/* <View style={styles.iconContainer}>
        <View style={styles.iconWrapper}>
          <TouchableOpacity onPress={handleTaxiPress} >
          <View style={styles.icon}>
               <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/619/619127.png'}} style={styles.iconImage   } onPress={handleTaxiPress} />
              <Text style={styles.iconText}>Cabs</Text>
          </View>
          </TouchableOpacity>
        
        </View>
        <View style={styles.iconWrapper}>
          <TouchableOpacity>
          <View style={styles.icon}>
               <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/5030/5030991.png'}} style={styles.iconImage} />
            <Text style={styles.iconText}>Buses</Text>
          </View>
          </TouchableOpacity>
          
        </View>
        <View style={styles.iconWrapper}>
          <View style={styles.icon}>
                        <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9DdhQk1MOwiL6bu2NnMwHVcqE0eiGv0dX-A&usqp=CAU'}} style={styles.iconImage} />

              <Text style={styles.iconText}>Flights</Text>
          </View>
        
        </View>
      </View> 
      {/* <View style={styles.content}>
        <Text></Text>
      </View> 
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Pressable
          style={{
            width: 200,
            height: 150,
            marginTop: 10,
            backgroundColor: '#003580',
            borderRadius: 10,
            padding: 20,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              fontWeight: 'bold',
              marginVertical: 7,
            }}
          >
            Genius
          </Text>
          <Text style={{ color: 'white', fontSize: 15, fontWeight: '500' }}>
            You are at genius level one in our loyalty program
          </Text>
        </Pressable>

        <Pressable
          style={{
            width: 200,
            height: 150,
            marginTop: 10,
            borderColor: '#E0E0E0',
            borderWidth: 2,
            borderRadius: 10,
            padding: 20,
            marginHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              marginVertical: 7,
            }}
          >
            15% Discounts
          </Text>
          <Text style={{ fontSize: 15, fontWeight: '500' }}>
            Complete 5 stays to unlock level 2
          </Text>
        </Pressable>

        <Pressable
          style={{
            width: 200,
            height: 150,
            marginTop: 10,
            borderColor: '#E0E0E0',
            borderWidth: 2,
            borderRadius: 10,
            padding: 20,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              marginVertical: 7,
            }}
          >
            10% Discounts
          </Text>
          <Text style={{ fontSize: 15, fontWeight: '500' }}>
            Enjoy Discounts at participating properties worldwide
          </Text>
        </Pressable>
      </ScrollView> 

      {/* <Pressable
        style={{
          marginTop: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        
      </Pressable> */}
      
    </View>
  );
};

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator  screenOptions={{
          activeTintColor: 'red',
      }}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      
     
      <Tab.Screen
        name="Trips"
        component={Trip}
        options={{
          tabBarLabel: 'Trips',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      /> 
      <Tab.Screen
        name="Offers"
        component={Offers} // Replace "Offers" with your Offers component
        options={{
          tabBarLabel: 'Offers',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="megaphone" size={size} color={color} /> // Replace "megaphone" with the appropriate icon for your Offers tab
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile} // Replace "Profile" with your Profile component
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} /> // Replace "person" with the appropriate icon for your Profile tab
          ),
        }}
      />
    </Tab.Navigator>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 0,
  },
 
  mapcontainer:{
    height:650,

  },
  button:{
  width: '100%', // Make the button span the full width
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    
    flexDirection: 'row', // Make the text elements side by side
},
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginHorizontal: 10,
  },
  containerbutton:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: '#d7d7d9',
    paddingBottom:12,
    
  },
  iconWrapper: {
    alignItems: 'center',
  },
 
  iconText: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
   iconImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;