import { Alert, StyleSheet, View } from "react-native";
import CustomButton from "./src/components/CustomButton";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import StartComponent from "./src/screens/StartScreen";
import MyTabs from "./src/components/BottomTab";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: () => null }}>
        <Stack.Screen name="StartScreen" component={StartComponent} />
        <Stack.Screen name="MainGroup" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001139", //01184D
    alignItems: "center",
    justifyContent: "center",
  },
});
