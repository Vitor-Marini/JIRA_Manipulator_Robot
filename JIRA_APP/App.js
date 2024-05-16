import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartComponent from "./src/screens/StartScreen";
import MyTabs from "./src/components/BottomTab";
import SliderPrograming from "./src/screens/SliderPrograming";
import BlockPrograming from "./src/screens/BlockPrograming";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";

const Stack = createStackNavigator();

export default function App() {

  useEffect(() => {storeDefaultIP()}, []);

  const storeDefaultIP = async () => {
    try {
      const ip = await AsyncStorage.getItem("@ip_esp32");

      if (ip === null) {
        await AsyncStorage.setItem("@ip_esp32", "192.168.4.1");
      }
      
    } catch (error) {
      console.error("Erro ao acessar armazenamento: ", error);
    }
  }


  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: forFade,
        }}>
        <Stack.Screen name="StartScreen" component={StartComponent} />
        <Stack.Screen name="MainGroup" component={MyTabs} />
        <Stack.Screen name="Slider" component={SliderPrograming} />
        <Stack.Screen name="Block" component={BlockPrograming} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
