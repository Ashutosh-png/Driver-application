import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Loginpage'); // Replace 'Home' with the desired screen name
    }, 3000); // 3000 milliseconds (3 seconds) delay
  }, []);

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
