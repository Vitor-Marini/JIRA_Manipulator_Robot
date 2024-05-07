import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import CustomSlider from "../components/CustomSlider";
import CustomButton from "../components/CustomButton";
import JiraSVG from "../components/JiraSVG";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SliderTest = () => {

    const navigation = useNavigation();

    const [valueMainRotation, setValueMainRotation] = useState(20);
    const [valueJoint1, setValueJoint1] = useState(15);
    const [valueJoint2, setValueJoint2] = useState(50);
    const [valueJoint3, setValueJoint3] = useState(80);
    const [valueArmRotation, setValueArmRotation] = useState(10);
    const [isHandOpen, setHandOpen] = useState(false);

    const [buttonText, setButtonText] = useState("ABRIR GARRA");
    const [isFirstRender, setIsFirstRender] = useState(true);

    
    const formatCommandSequence = () => {
        const newCommandSequence = `${valueMainRotation},${valueJoint1},${valueJoint2},${valueJoint3},${valueArmRotation},${isHandOpen? 1 : 0}`;        
        console.log(newCommandSequence);
    }

    useEffect(() => {
        isFirstRender? setIsFirstRender(false) : formatCommandSequence();
    }, [isHandOpen]);

    const buttonHandler = () => {
        const isOpen = !isHandOpen;
        setHandOpen(isOpen);
        isOpen? setButtonText("FECHAR GARRA") : setButtonText("ABRIR GARRA");
    }
    
    return (
        <View style={styles.container}>
            <JiraSVG style={{ left: 22 }} height="850" width="850" />
            <TouchableOpacity style={{ position: "absolute", bottom: "91%", right: "89%"}} onPress={() => {navigation.navigate("Home")}}>
                <Ionicons name={"home-outline"} size={30} color={"#0078a3"}/>
            </TouchableOpacity>
            <SliderComponent style={styles.sliderMainRotation} value={valueMainRotation} setValue={setValueMainRotation} rotation={true} slidingCompleteFunction={formatCommandSequence} />
            <SliderComponent style={styles.sliderJoint1} value={valueJoint1} setValue={setValueJoint1} slidingCompleteFunction={formatCommandSequence} />
            <SliderComponent style={styles.sliderJoint2} value={valueJoint2} setValue={setValueJoint2} slidingCompleteFunction={formatCommandSequence} />
            <SliderComponent style={styles.sliderJoint3} value={valueJoint3} setValue={setValueJoint3} slidingCompleteFunction={formatCommandSequence} />
            <SliderComponent style={styles.sliderArmRotation} value={valueArmRotation} setValue={setValueArmRotation} rotation={true} slidingCompleteFunction={formatCommandSequence} />
            <View style={{ position: "absolute", top: "85%" }}>
                <CustomButton onPress={buttonHandler} text={buttonText} />
            </View>
        </View>
    );
};

function SliderComponent({ style, value, setValue, rotation = false, slidingCompleteFunction }) {
    return (
        <View style={style}>
            <Text style={{ textAlign: "center", color: "white", fontSize: 16 }} >{value}</Text>
            <CustomSlider
                minimumTrackTintColor={rotation ? "#e68a00" : "#018abb"}
                maximumTrackTintColor={"#31416b"}
                value={value}
                minimumValue={0}
                maximumValue={180}
                onValueChange={(value) => { setValue(value) /*, console.log(value)*/ }}
                onSlidingComplete={slidingCompleteFunction}
                thumbStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#eeecec",
                    borderWidth: 3,
                    borderColor: "#383636",
                    width: 30,
                    height: 30,
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
        top: "11%",
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
