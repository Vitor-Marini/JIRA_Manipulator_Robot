import React, { useEffect, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Config from "../screens/Config";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

function MyTabs() {

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: styles.barStyle,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: false,
      }}
    >
      <Tab.Screen
        name="Wifi"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
            name={focused ? "wifi" : "wifi-outline"}
              color={focused ? styles.iconsFocused.color : styles.icons.color}
              size={focused ? styles.iconsFocused.size : styles.icons.size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
            name={focused ? "home" : "home-outline"}
              color={focused ? styles.iconsFocused.color : styles.icons.color}
              size={focused ? styles.iconsFocused.size : styles.icons.size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Config"
        component={Config}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              color={focused ? styles.iconsFocused.color : styles.icons.color}
              size={focused ? styles.iconsFocused.size : styles.icons.size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: "#0f2352", //"#0d1e46"
    height: "10%",
    width: "90%",
    borderRadius: 20,
    position: "absolute",
    borderBlockColor: "#000000ff",
    bottom: "2.5%",
    left: "4.5%",
  },
  icons: {
    size: 30,
    color: "#0078a3",
  },
  iconsFocused: {
    size: 38,
    color: "#00bbff",
  },
});

export default MyTabs;
