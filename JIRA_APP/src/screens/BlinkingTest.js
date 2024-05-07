import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import BlinkingView from '../components/BlinkingView';
import CustomSlider from '../components/CustomSlider'
import { Circle, Svg } from 'react-native-svg';

const BlinkingTest = () => {
   const [isFocused, setIsFocused] = useState(false);
   const [value, setValue] = useState(15);

   return (
      <View style={styles.container}>
         <CustomSlider
            minimumTrackTintColor={"#0078a3"}
            maximumTrackTintColor={"#575757"}
            value={value}
            minimumValue={0}
            maximumValue={180}
            onValueChange={(value) => { setValue(value), console.log(value), setIsFocused(true) }}
            onSlidingComplete={() => setIsFocused(false)}
            thumbStyle={{
               justifyContent: "center",
               alignItems: "center",
               backgroundColor: "#eeecec",
               borderWidth: 2,
               borderColor: "#8a8a8a",
               width: 25,
               height: 25,
               borderRadius: 25
            }}
            step={1}
            debugTouchArea={false}
            trackStyle={{ height: 25, borderRadius: 10 }}
         />
         <BlinkingView isFocused={isFocused} >
            <Svg height="100" width="100">
               <Circle cx="50" cy="50" r="45" stroke="#ccff00" strokeWidth="2.5" fill="red" />
            </Svg>
         </BlinkingView>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      //alignItems: 'center',
   },
   input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      width: 200,
      marginBottom: 20,
   },
});

export default BlinkingTest;