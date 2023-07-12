import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Payment = ({ route }) => {
  const navigation = useNavigation();
  const { InvoiceData } = route.params;
  const [paymentMode, setPaymentMode] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [congratulationAnimation] = useState(new Animated.Value(0));
  const [processingAnimation] = useState(new Animated.Value(0));

  console.log("Payment: "+JSON.stringify(InvoiceData));
  console.log("data      ",InvoiceData);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: ' ',
      },
      headerStyle: {
        backgroundColor: '#003580',
        height: 110,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
      headerRight: () => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity>
            <Ionicons
              name="notifications-outline"
              size={24}
              color="white"
              style={{ marginRight: 12 }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="user" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []); 

  useEffect(() => {
    if (showConfirmation) {
      const confirmationTimer = setTimeout(() => {
        setShowConfirmation(false);
        navigation.navigate('Home');
      }, 6000);

      return () => clearTimeout(confirmationTimer);
    }
  }, [showConfirmation]);

  useEffect(() => {
    if (paymentMode === 'Cash') {
      Animated.timing(congratulationAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();

      Animated.loop(
        Animated.timing(processingAnimation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [paymentMode, congratulationAnimation, processingAnimation]);

  const handlePaymentMode = (mode) => {
    if (mode === 'Cash') {
      setPaymentMode(mode);
      setShowConfirmation(true);
    } else if (mode === 'Online') {
      // Show error message with animation
      Alert.alert(
        'Alert',
        'Online payment is currently unavailable. Please choose the cash option.',
        [
          { text: 'OK', style: 'cancel' },
        ]
      );
    } else {
      setPaymentMode(mode);
    }
  };
  
  

  const congratsOpacity = congratulationAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
  });

  const processingOpacity = processingAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 1, 0.3],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Payment Mode</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={paymentMode === 'Online' ? styles.activeButton : styles.inactiveButton}
          onPress={() => handlePaymentMode('Online')}>
          <MaterialCommunityIcons name="credit-card-outline" size={60} color="white" />
          <Text style={styles.buttonText}>Online</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={paymentMode === 'Cash' ? styles.activeButton : styles.inactiveButton}
          onPress={() => handlePaymentMode('Cash')}>
          <MaterialCommunityIcons name="cash-multiple" size={60} color="white" />
          <Text style={styles.buttonText}>Cash</Text>
        </TouchableOpacity>
      </View>
      {showConfirmation && (
        <Animated.View style={[styles.confirmationMessage, { opacity: congratsOpacity }]}>
          <Text style={styles.congratulationText}>
            Congratulation! Your booking has been successful.
          </Text>
          <Text style={styles.confirmationText}>
            Our team will reach out to confirm your booking shortly.
          </Text>
          <Animated.View
            style={[styles.processingAnimation, { opacity: processingOpacity }]}>
            <Text style={styles.processingText}>Processing...</Text>
          </Animated.View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: ' ',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '100%',
  },
  activeButton: {
    backgroundColor: '#003580',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveButton: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    fontFamily: '',
  },
  confirmationMessage: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  congratulationText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: ' ',
  },
  confirmationText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: ' ',
  },
  processingAnimation: {
    marginTop: 20,
  },
  processingText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: ' ',
  },
});

export default Payment;
