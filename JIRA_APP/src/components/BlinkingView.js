import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const BlinkingView = ({ isFocused, children, style, inverted = false }) => {
  const [opacity] = useState(new Animated.Value(inverted? 0 : 1));

  useEffect(() => {
    if (isFocused) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: inverted? 1 : 0,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: inverted? 0 : 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      opacity.setValue(inverted? 0 : 1);
    }
  }, [isFocused, opacity]);

  return (
    <Animated.View style={[styles.blinkingView, { opacity }, style]}>
      {/* Conteúdo do componente que piscará */}
      {children}
    </Animated.View >
  );
};

const styles = StyleSheet.create({
  blinkingView: {
 /*    width: 100,
    height: 100,
    backgroundColor: 'blue', */
    flex: 1,
  },
});

export default BlinkingView;