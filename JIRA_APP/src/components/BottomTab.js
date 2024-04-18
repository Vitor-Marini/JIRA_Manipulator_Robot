import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Config from "../screens/Config";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions, Platform, StyleSheet, View } from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Tab = createBottomTabNavigator();

function MyTabs() {

  return (
    <View style={{ flex: 1 }}>
      {Platform.OS === "ios" ? null : <View style={styles.barShadow}/>}
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="initialRoute"
        screenOptions={{
          tabBarStyle: styles.barStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarHideOnKeyboard: false,
          tabBarIconStyle: {top: Platform.OS === "ios"? "20%" : 0}
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
    </View>
  );
}

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: "#0f2352", //"#0d1e46"
    height: screenHeight * 0.1,
    width: screenWidth * 0.9,
    borderRadius: 20,
    position: "absolute",
    borderBlockColor: "#000000ff",
    bottom: screenHeight * 0.025,
    left: screenWidth * 0.045,
    zIndex: Platform.OS === "web" ? 1 : 99,
  },
  barShadow: {
    backgroundColor: "#0000329f", //"#0f2352"
    height: screenHeight * 0.1,
    width: screenWidth * 0.895,
    borderRadius: 20,
    position: "absolute",
    zIndex: Platform.OS === "web" ? 0 : 1,
    borderBlockColor: "#000000ff",
    bottom: screenHeight * 0.016,
    left: screenWidth * 0.048,
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
