import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";
import CustomSlider from "../components/CustomSlider";
import CustomButton from "../components/CustomButton";
import JiraSVG from "../components/JiraSVG";

const SliderTest = () => {
    const [value, setValue] = useState(15);

    return (
        <View style={styles.container}>
            <JiraSVG style={{ left: 20 }} height="850" width="850" />
            <SliderComponent style={styles.sliderJoint1} value={value} setValue={setValue} />
            <SliderComponent style={styles.sliderMainRotation} value={value} setValue={setValue} />
            <SliderComponent style={styles.sliderJoint2} value={value} setValue={setValue} />
            <SliderComponent style={styles.sliderArmRotation} value={value} setValue={setValue} />
            <SliderComponent style={styles.sliderJoint3} value={value} setValue={setValue} />
            <View style={{ position: "absolute", top: "85%" }}>
                <CustomButton onPress={() => console.log("posições")} text={"ENVIAR POSIÇÕES"}/>
            </View>
        </View>
    );
};

function SliderComponent({ style, value, setValue }) {
    return (
        <View style={style}>
            <Text style={{ textAlign: "center", color: "white" }} >{value}</Text>
            <CustomSlider
                minimumTrackTintColor={"#0078a3"}
                maximumTrackTintColor={"#575757"}
                value={value}
                minimumValue={0}
                maximumValue={180}
                onValueChange={(value) => { setValue(value), console.log(value) }}
                thumbStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                    //width: 25,
                    backgroundColor: "#eeecec",
                    borderWidth: 2,
                    borderColor: "#8a8a8a",
                    width: 25,
                    height: 25,
                    borderRadius: 25
                }}
                step={1}
                debugTouchArea={false}
                /*         customThumb={
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
                        } */
                trackStyle={{ height: 25, borderRadius: 10 }}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#001139",
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        marginVertical: 50,
    },
    sliderMainRotation: {
        top: "65%",
        width: "47%",
        right: "3%",
        position: "absolute"
    },
    sliderJoint1: {
        top: "55%",
        width: "47%",
        right: "8%",
        position: "absolute"
    },
    sliderJoint2: {
        top: "40%",
        width: "47%",
        right: "8%",
        position: "absolute"
    },
    sliderJoint3: {
        top: "12%",
        width: "47%",
        right: "35%",
        position: "absolute"
    },
    sliderArmRotation: {
        top: "21%",
        width: "45%",
        right: "52%",
        position: "absolute"
    },
});

export default SliderTest;
