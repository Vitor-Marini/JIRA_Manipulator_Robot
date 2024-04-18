import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

const SliderExample = () => {
 const [value, setValue] = useState(0);

 return (
    <View style={styles.container}>
      <Text style={styles.text}>Value: {value}</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={180}
        minimumTrackTintColor="#54f000"
        maximumTrackTintColor="#000000"
        thumbTintColor="#000000"
        value={value}
        onValueChange={(val) => {setValue(val); console.log(val)}}
        step={1}
      />
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
 },
 text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
 },
 slider: {
    width: 200,
    height: 40,
 },
});

export default SliderExample;