import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartComponent from "./src/screens/StartScreen";
import MyTabs from "./src/components/BottomTab";
import SliderPrograming from "./src/screens/SliderPrograming";
import BlockTest from "./src/screens/BlockTest";
import BlinkingTest from "./src/screens/BlinkingTest";

const Stack = createStackNavigator();

export default function App() {

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
        <Stack.Screen name="Block" component={BlockTest} />
        <Stack.Screen name="Blink" component={BlinkingTest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
