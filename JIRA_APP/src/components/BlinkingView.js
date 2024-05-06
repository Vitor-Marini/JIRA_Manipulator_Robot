import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const BlinkingView = ({ isFocused }) => {
 const [opacity] = useState(new Animated.Value(1));

 useEffect(() => {
    if (isFocused) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      opacity.setValue(1);
    }
 }, [isFocused, opacity]);

 return (
    <Animated.View style={[styles.blinkingView, { opacity }]}>
      {/* Conteúdo do componente que piscará */}
    </Animated.View>
 );
};

const styles = StyleSheet.create({
 blinkingView: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
 },
});

export default BlinkingView;