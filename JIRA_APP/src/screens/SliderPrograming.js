import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomSlider from "../components/CustomSlider";
import CustomButton from "../components/CustomButton";
import JiraSVG from "../svgs/JiraSVG";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BlinkingView from "../components/BlinkingView";
import SVGArmRotationArrow from "../svgs/SVGArmRotationArrow";
import SVGWristRotationArrow from "../svgs/SVGWristRotationArrow";
import SVGFlexArrow1 from "../svgs/SVGFlexArrow1";
import SVGFlexArrow2 from "../svgs/SVGFlexArrow2";
import SVGFlexArrow3 from "../svgs/SVGFlexArrow3";
import HelpComponent from "../components/HelpComponent";

const SliderPrograming = () => {
    const navigation = useNavigation();

    const [valueMainRotation, setValueMainRotation] = useState(20);
    const [valueJoint1, setValueJoint1] = useState(15);
    const [valueJoint2, setValueJoint2] = useState(50);
    const [valueJoint3, setValueJoint3] = useState(80);
    const [valueArmRotation, setValueArmRotation] = useState(10);
    const [isHandOpen, setHandOpen] = useState(false);

    const [buttonText, setButtonText] = useState("ABRIR GARRA");

    const [isFocusedArmRotation, setIsFocusedArmRotation] = useState(false);
    const [isFocusedWristRotation, setIsFocusedWristRotation] = useState(false);
    const [isFocusedFlex1, setIsFocusedFlex1] = useState(false);
    const [isFocusedFlex2, setIsFocusedFlex2] = useState(false);
    const [isFocusedFlex3, setIsFocusedFlex3] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);

    const sendCommand = async (id, degree) => {
        console.log(`${id}:${degree}`);
        try {
            const response = await fetch(`http://192.168.4.1/move_servo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    servo: id,
                    position: degree,
                }).toString(),
            });

            if (response.ok) {
                console.log("Enviado com sucesso!");
            }
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    const buttonHandler = () => {
        const isOpen = !isHandOpen;
        setHandOpen(isOpen);
        isOpen ? setButtonText("FECHAR GARRA") : setButtonText("ABRIR GARRA");
        const degree = isOpen ? "1" : "0";
        sendCommand("6", degree);
    };

    return (
        <View style={styles.container}>
            <JiraSVG style={{ right: 3 }} height="525" width="525" />

            <BlinkingView
                style={{
                    position: "absolute",
                    width: 100,
                    height: 100,
                    bottom: "73%",
                    right: "93%",
                }}
                isFocused={isFocusedArmRotation}
                inverted={true}
            >
                <SVGArmRotationArrow height="540" width="540" />
            </BlinkingView>

            <BlinkingView
                style={{
                    position: "absolute",
                    width: 100,
                    height: 100,
                    bottom: "71.5%",
                    right: "92%",
                }}
                isFocused={isFocusedWristRotation}
                inverted={true}
            >
                <SVGWristRotationArrow height="530" width="530" />
            </BlinkingView>

            <BlinkingView
                style={{
                    position: "absolute",
                    width: 100,
                    height: 100,
                    bottom: "71.5%",
                    right: "92%",
                }}
                isFocused={isFocusedFlex1}
                inverted={true}
            >
                <SVGFlexArrow1 height="540" width="540" />
            </BlinkingView>

            <BlinkingView
                style={{
                    position: "absolute",
                    width: 100,
                    height: 100,
                    bottom: "71.5%",
                    right: "92%",
                }}
                isFocused={isFocusedFlex2}
                inverted={true}
            >
                <SVGFlexArrow2 height="540" width="540" />
            </BlinkingView>

            <BlinkingView
                style={{
                    position: "absolute",
                    width: 100,
                    height: 100,
                    bottom: "71.5%",
                    right: "92%",
                }}
                isFocused={isFocusedFlex3}
                inverted={true}
            >
                <SVGFlexArrow3 height="540" width="540" />
            </BlinkingView>

            <TouchableOpacity
                style={{ position: "absolute", bottom: "91%", right: "89%" }}
                onPress={() => {
                    navigation.navigate("Home");
                }}
            >
                <Ionicons name={"home-outline"} size={30} color={"#0078a3"} />
            </TouchableOpacity>

            <Text
                style={{
                    position: "absolute",
                    bottom: "91%",
                    textAlign: "center",
                    fontSize: 25,
                    color: "#0078a3",
                    fontWeight: "bold",
                }}
            >
                AJUSTAR POSIÇÕES
            </Text>

            <TouchableOpacity
                style={{ position: "absolute", bottom: "91%", right: "2%" }}
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <Ionicons name={"help-circle-outline"} size={35} color={"#0078a3"} />
            </TouchableOpacity>

            <HelpComponent
                visible={isModalVisible}
                setModalVisible={setModalVisible}
            />

            <SliderComponent
                style={styles.sliderMainRotation}
                value={valueMainRotation}
                setValue={setValueMainRotation}
                rotation={true}
                slidingCompleteFunction={() => {
                    sendCommand("1", `${valueMainRotation}`),
                        setIsFocusedArmRotation(false);
                }}
                slidingStartFunction={() => {
                    setIsFocusedArmRotation(true);
                }}
            />
            <SliderComponent
                style={styles.sliderJoint1}
                value={valueJoint1}
                setValue={setValueJoint1}
                slidingCompleteFunction={() => {
                    sendCommand("2", `${valueJoint1}`), setIsFocusedFlex1(false);
                }}
                slidingStartFunction={() => {
                    setIsFocusedFlex1(true);
                }}
            />
            <SliderComponent
                style={styles.sliderJoint2}
                value={valueJoint2}
                setValue={setValueJoint2}
                slidingCompleteFunction={() => {
                    sendCommand("3", `${valueJoint2}`), setIsFocusedFlex2(false);
                }}
                slidingStartFunction={() => {
                    setIsFocusedFlex2(true);
                }}
            />
            <SliderComponent
                style={styles.sliderJoint3}
                value={valueJoint3}
                setValue={setValueJoint3}
                slidingCompleteFunction={() => {
                    sendCommand("4", `${valueJoint3}`), setIsFocusedFlex3(false);
                }}
                slidingStartFunction={() => {
                    setIsFocusedFlex3(true);
                }}
            />
            <SliderComponent
                style={styles.sliderArmRotation}
                value={valueArmRotation}
                setValue={setValueArmRotation}
                rotation={true}
                slidingCompleteFunction={() => {
                    sendCommand("5", `${valueArmRotation}`),
                        setIsFocusedWristRotation(false);
                }}
                slidingStartFunction={() => {
                    setIsFocusedWristRotation(true);
                }}
            />

            <View style={{ position: "absolute", top: "85%" }}>
                <CustomButton onPress={buttonHandler} text={buttonText} />
            </View>
        </View>
    );
};

function SliderComponent({
    style,
    value,
    setValue,
    rotation = false,
    slidingCompleteFunction,
    slidingStartFunction,
}) {
    return (
        <View style={style}>
            <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>
                {value}°
            </Text>
            <CustomSlider
                minimumTrackTintColor={rotation ? "#e68a00" : "#018abb"}
                maximumTrackTintColor={"#31416b"}
                value={value}
                minimumValue={0}
                maximumValue={180}
                onValueChange={(value) => {
                    setValue(value);
                }}
                onSlidingStart={slidingStartFunction}
                onSlidingComplete={slidingCompleteFunction}
                thumbStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#eeecec",
                    borderWidth: 3,
                    borderColor: "#383636",
                    width: 30,
                    height: 30,
                    borderRadius: 25,
                }}
                step={1}
                debugTouchArea={false}
                trackStyle={{ height: 25, borderRadius: 10 }}
            />
        </View>
    );
}

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
        position: "absolute",
    },
    sliderJoint1: {
        top: "55%",
        width: "47%",
        right: "8%",
        position: "absolute",
    },
    sliderJoint2: {
        top: "40%",
        width: "47%",
        right: "8%",
        position: "absolute",
    },
    sliderJoint3: {
        top: "11%",
        width: "47%",
        right: "35%",
        position: "absolute",
    },
    sliderArmRotation: {
        top: "21%",
        width: "45%",
        right: "52.5%",
        position: "absolute",
    },
});

export default SliderPrograming;
