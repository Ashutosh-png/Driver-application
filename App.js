import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './Splash';
import Home from './home';
import BookPage from './BookPage';
import AppNavigator from './AppNavigator';
import Cabs from './Cabs';
import CabSelect from './Select-cab';
import invoice from './invoice'
import Payment from './Payment'
import Loginpage from './Loginpage'
import RegisterUser from './RegisterUser';
import 'react-native-gesture-handler';
import TripDetails from './TripDetails';
import startTrip from './startTrip';
import MapNavigate from './MapNavigate';
import CurrentLocation from './CurrentLocation';
import DrivertoUser from './DrivertoUser';
import PickupToDrop from './PickupToDrop';
import EndTrip  from './EndTrip';
import CancelTrip from './CancelTrip';
import UpcomingTrip from './UpcomingTrip';
import OngoingTrip from './OngoingTrip';
import CompletTrip from './CompletTrip';
import TripDetails1 from './TripsDetails1';
import EndThankyou from './EndThankyou';
import EndPage from './EndPage';




const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Loginpage" component={Loginpage} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BookPage" component={BookPage} />
        <Stack.Screen name="Cabs" component={Cabs} />
        <Stack.Screen name="SelectCab" component={CabSelect} />
        <Stack.Screen name="invoice" component={invoice} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="RegisterUser" component={RegisterUser} />
        <Stack.Screen name="TripDetails" component={TripDetails} />
                <Stack.Screen name="startTrip" component={startTrip} />
                                <Stack.Screen name="MapNavigate" component={MapNavigate} />
                         <Stack.Screen name="CurrentLocation" component={CurrentLocation} />
                   <Stack.Screen name="DrivertoUser" component={DrivertoUser} />
                  <Stack.Screen name="PickupToDrop" component={PickupToDrop} />
                  <Stack.Screen name="EndTrip" component={EndTrip} />
               <Stack.Screen name="CancelTrip" component={CancelTrip} />
                            <Stack.Screen name="CompletTrip" component={CompletTrip} /> 
         <Stack.Screen name="OngoingTrip" component={OngoingTrip} />
         <Stack.Screen name="UpcomingTrip" component={UpcomingTrip} />
                  <Stack.Screen name="TripDetails1" component={TripDetails1} />
                                    <Stack.Screen name="EndThankyou" component={EndThankyou} />
                                   <Stack.Screen name="EndPage" component={EndPage} />















      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
