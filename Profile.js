import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        // User data found, parse and set it
        const user = JSON.parse(userData);
        setUserData(user);
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      // Remove user data from AsyncStorage
      await AsyncStorage.removeItem('userData');
      // Navigate to the login screen
      navigation.navigate('Loginpage');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?cs=srgb&dl=pexels-craig-adderley-1563356.jpg&fm=jpg' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {userData ? (
          <View style={styles.profileContainer}>
            <View style={styles.header}>
              <View style={styles.profileIcon}>
                 <Image
        source={{uri: 'https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg'}}
        style={styles.backgroundImage}
      />
              
              </View>
              <Text style={styles.name}>{userData.name}</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <View style={styles.detail}>
                  <MaterialIcons name="email" size={16} color="black" style={styles.icon} />
                  <Text style={styles.label}></Text>
                  <Text style={styles.value}>{userData.email}</Text>
                </View>
                <View style={styles.detail}>
                  <MaterialIcons name="date-range" size={16} color="black" style={styles.icon} />
                  <Text style={styles.label}></Text>
                  <Text style={styles.value}>{userData.age}</Text>
                </View>
                <View style={styles.detail}>
                  <MaterialIcons name="phone" size={16} color="black" style={styles.icon} />
                  <Text style={styles.label}></Text>
                  <Text style={styles.value}>{userData.phone}</Text>
                </View>
                <View style={styles.detail}>
                  <MaterialIcons name="person" size={16} color="black" style={styles.icon} />
                  <Text style={styles.label}></Text>
                  <Text style={styles.value}>{userData.gender}</Text>
                </View>
                {/* Render other user data */}
              </View>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity style={styles.option} onPress={() => console.log('Settings pressed')}>
                <MaterialIcons name="settings" size={20} color="black" style={styles.optionIcon} />
                <Text style={styles.optionText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={handleLogout}>
                <MaterialIcons name="logout" size={20} color="black" style={styles.optionIcon} />
                <Text style={styles.optionText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.profileContainer}>
            <View style={styles.header}>
              <View style={styles.profileIcon}>
                {/* Add your logo here */}
                <Text style={styles.logo}>Logo</Text>
              </View>
              <Text style={styles.name}>No User Found</Text>
            </View>
            <View style={styles.line} />
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <View style={styles.detail}>
                  <MaterialIcons name="email" size={16} color="black" style={styles.icon} />
                  <Text style={styles.label}></Text>
                  <Text style={styles.value}></Text>
                </View>
                <View style={styles.detail}>
                  <MaterialIcons name="date-range" size={16} color="black" style={styles.icon} />
                  <Text style={styles.label}></Text>
                  <Text style={styles.value}></Text>
                </View>
                <View style={styles.detail}>
                  <MaterialIcons name="phone" size={16} color="black" style={styles.icon} />
                  <Text style={styles.label}></Text>
                  <Text style={styles.value}></Text>
                </View>
                <View style={styles.detail}>
                  <MaterialIcons name="person" size={16} color="black" style={styles.icon} />
                  <Text style={styles.label}></Text>
                  <Text style={styles.value}></Text>
                </View>
                {/* Render other user data */}
              </View>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity style={styles.option} onPress={() => console.log('Settings pressed')}>
                <MaterialIcons name="settings" size={20} color="black" style={styles.optionIcon} />
                <Text style={styles.optionText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={handleLogout}>
                <MaterialIcons name="logout" size={20} color="black" style={styles.optionIcon} />
                <Text style={styles.optionText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    width: windowWidth * 1.0,
    height: windowHeight * 0.89,
    backgroundColor: 'white',
    padding: 21,
    borderRadius: 10,
    marginTop: 250,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'blue', // Change the color of the profile pic icon
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  logo: {
    color: 'white', // Change the color of the logo text
    fontSize: 16,
    fontWeight: 'bold',
        borderColor:'black',
      

  },
  name: {
    fontSize: 16,
    fontSize: 30,
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: 'gray',
    marginBottom: 20,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    marginBottom: 20,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    marginBottom: 10,
  },
  footer: {
    marginBottom: 150,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionIcon: {
    marginRight: 5,
  },
  optionText: {
    fontSize: 16,
  },
});

export default ProfilePage;