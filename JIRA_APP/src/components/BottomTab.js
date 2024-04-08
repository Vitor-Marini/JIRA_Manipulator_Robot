import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Config from "../screens/Config";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => null,a
        tabBarStyle: styles.barStyle,
        tabBarLabelStyle: styles.label,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              color={focused ? "yellow" : styles.icons.color}
              size={styles.icons.size}
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
              name="settings"
              color={focused ? "yellow" : styles.icons.color}
              size={styles.icons.size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: "#0d1e46",
    height: "10%",
  },
  icons: {
    size: 30,
    color: "white",
  },
  label: {
    fontSize: 15,
    color: "white",
  },
});

export default MyTabs;
