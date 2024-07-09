import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import FavsScreen from "./Screens/FavsScreen";
import Contact from "./Screens/Contact";
import { COLORS } from "./utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Products from "./Screens/Products";
import { ProductDetails } from "./Screens/ProductDetails";

type Tabs = {
  Home: undefined;
  Favs: undefined;
  Contact: undefined;
};
type stacks = {
  bottom: undefined;
  products: undefined;
  details: undefined;
};

const Tab = createBottomTabNavigator<Tabs>();
const Stack = createStackNavigator<stacks>();

function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.bar,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favs"
        component={FavsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={Contact}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "contacts" : "contacts-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bar: {
    borderColor: "transparent",
    elevation: 0,
  },
});

export default function Root() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="bottom" component={BottomNav} />
        <Stack.Screen name="products" component={Products} />
        <Stack.Screen name="details" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
