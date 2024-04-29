import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
} from "react-native";
import Slider from "../components/Slider";

const SliderTest = () => {
  const [value, setValue] = useState(15);

  return (
    <View
      style={{
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={50}
        onValueChange={(value) => setValue(value)}
        thumbStyle={{
          justifyContent: "center",
          alignItems: "center",
          width: 25,
        }}
        customThumb={
          <View
            style={{
              width: 20,
              height: 20,
              overflow: "hidden",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              backgroundColor: "blue",
            }}
          />
        }
        trackStyle={{ height: 10, borderRadius: 10, margin: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    marginVertical: 50,
  },
  slider: {
    width: "80%",
    height: 50,
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
    marginBottom: 50,
  },
  rail: {
    width: "100%",
    height: 20,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#DBDBDB",
  },
  stepper: {
    width: 30,
    height: "100%",
    borderRadius: 10,
    backgroundColor: "black",
  },
  railFill: {
    height: "100%",
    backgroundColor: "#CBAA71",
    position: "absolute",
    left: 0,
  },
});

export default SliderTest;
