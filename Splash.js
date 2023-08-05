import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await AsyncStorage.getItem("userData");
        if (fetchedData !== null) {
          // If user data exists, navigate to 'Home' after a 3-second delay
          setTimeout(() => {
            navigation.navigate('Home'); // Replace 'Home' with the desired screen name (case-sensitive)
          }, 3000); // 3000 milliseconds (3 seconds) delay
        } else {
          // If user data does not exist, navigate to 'Loginpage' after a 3-second delay
          setTimeout(() => {
            navigation.navigate('Loginpage'); // Replace 'Loginpage' with the desired screen name (case-sensitive)
          }, 3000); // 3000 milliseconds (3 seconds) delay
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
        // In case of an error, navigate to 'Loginpage' after a 3-second delay as a fallback
        setTimeout(() => {
          navigation.navigate('Loginpage'); // Replace 'Loginpage' with the desired screen name (case-sensitive)
        }, 3000); // 3000 milliseconds (3 seconds) delay
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs only once after the component mounts

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('./assets/aimcab-splash.png')}
        style={{ width: 10000, height: 1000, resizeMode: 'contain' }}
      />
    </View>
  );
};

export default Splash;
