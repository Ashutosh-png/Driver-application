import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Header from "./Components/Header";
import { TouchableOpacity } from "react-native";
import Card from "./Components/Card";
import PremiumCab from "./PremiumCab";
import LuxuryCab from "./LuxuryCab";
import SedanPremium from "./SedanPremium";
import MUV from "./MUV";

// Import other components/screens if needed
import BookPage from "./BookPage";
import Trip from "./Trip";
import Offers from "./Offers";
import Profile from "./Profile";
import Regular from "./Regular";

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

const SelectCab = ({ route }) => {
  const { formData } = route.params;
  console.log("select page " + formData.tripType);

  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: "red",
        tabBarStyle: {
          backgroundColor: "white",
          headerShown: false, // Set the background color of the tab bar to grey
        },
        tabBarLabelStyle: {
          fontSize: 14, // Adjust the font size of the tab labels
        },
        tabBarIconStyle: {
          marginBottom: -10, // Adjust the icon position
        },
      }}
    >
      <Tab.Screen
        name="Regular"
        options={{
          tabBarLabel: "HatchBack",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car" size={size} color={color} />
          ),
        }}
      >
        {() => <Regular formData={formData} />}
      </Tab.Screen>
      <Tab.Screen
        name="Premium"
        options={{
          tabBarLabel: "Sedan",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car" size={size} color={color} />
          ),
        }}
      >
        {() => <PremiumCab formData={formData} />}
      </Tab.Screen>
      <Tab.Screen
        name="Luxurys"
        options={{
          tabBarLabel: "Premium",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car" size={size} color={color} />
          ),
        }}
      >
        {() => <SedanPremium formData={formData} />}
      </Tab.Screen>
      <Tab.Screen
        name="Luxury"
        options={{
          tabBarLabel: "SUV",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car" size={size} color={color} />
          ),
        }}
      >
        {() => <LuxuryCab formData={formData} />}
      </Tab.Screen>
       
       <Tab.Screen
        name="Luxuryss"
        options={{
          tabBarLabel: "MUV",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car" size={size} color={color} />
          ),
        }}
      >
        {() => <MUV formData={formData} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    height: 50,
    backgroundColor: "lightgray",
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 5,
    backgroundColor: "#d7d7d9",
  },
  iconWrapper: {
    alignItems: "center",
  },
  icon: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    borderColor: "#003580", // Add a black border color if needed
    borderWidth: 0,
  },
  iconText: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  iconImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: "80%",
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default SelectCab;
