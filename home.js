import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from @expo/vector-icons
import Header from './Components/Header';
import { TouchableOpacity } from 'react-native';


// Import other components/screens if needed
import BookPage from './BookPage';
import Trip from './Trip';
import Offers from './Offers';
import Profile from './Profile';

const HomePage = ({ navigation }) => {
  const handleTaxiPress = () => {
    navigation.navigate('BookPage');
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      },
      headerStyle: {
        backgroundColor: '#003580',
        height: 110,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
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

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.searchBar}>
        {/* Your search bar component goes here */}
        <TextInput
      placeholder="Search"
      style={styles.searchInput}
      // Add any necessary event handlers or functionality
    />  
  
  
      </View>
      <View style={styles.iconContainer}>
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
      <View style={styles.content}>
        <Text></Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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

      <Pressable
        style={{
          marginTop: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        
      </Pressable>
      
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
  searchBar: {
    height: 40,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    justifyContent: 'center',
    padding:2,
    borderColor:'#9ea3a0',
    borderWidth:2,
    borderRadius:22,
    margin:10,

    
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
  icon: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
     borderColor: '#003580', // Add a black border color if needed
    borderWidth: 0,
    
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
