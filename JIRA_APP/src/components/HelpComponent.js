import { Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import JiraSVG from '../svgs/JiraSVG';
import { useRef, useState } from 'react';
import SVGArmRotationArrow from '../svgs/SVGArmRotationArrow';
import SVGWristRotationArrow from '../svgs/SVGWristRotationArrow';
import SVGFlexArrow1 from '../svgs/SVGFlexArrow1';
import SVGFlexArrow2 from '../svgs/SVGFlexArrow2';
import SVGFlexArrow3 from '../svgs/SVGFlexArrow3';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const HelpComponent = ({ visible, setModalVisible }) => {
    const scrollViewRef = useRef(null);
    const [activeSlide, setActiveSlide] = useState(0);

    const tutorialData = [
        {
            svg: JiraSVG,
            svgRotation: SVGArmRotationArrow,
            svgRotation2: SVGWristRotationArrow,
            svgFlex1: null,
            svgFlex2: null,
            svgFlex3: null,
            label: "Rotação",
            color: "#f1650c",
            customColor: false,
            servo1: null,
            servo2: null,
            servo3: null,
            servo4: null,
            servo5: null,
            servo6: null
        },
        {
            svg: JiraSVG,
            svgRotation: null,
            svgRotation2: null,
            svgFlex1: SVGFlexArrow1,
            svgFlex2: SVGFlexArrow2,
            svgFlex3: SVGFlexArrow3,
            label: "Flexão/Extensão",
            color: "#1a56e3",
            customColor: false,
            servo1: null,
            servo2: null,
            servo3: null,
            servo4: null,
            servo5: null,
            servo6: null
        },
        {
            svg: JiraSVG,
            svgRotation: null,
            svgRotation2: null,
            svgFlex1: null,
            svgFlex2: null,
            svgFlex3: null,
            label: "Servos",
            color: null,
            customColor: true,
            servo1: "#c5c59a",
            servo2: "#b397b3" ,
            servo3: "#bd75a4",
            servo4: "#a58ed2",
            servo5: "#8A2BE2",
            servo6: "#70129f"
        }
    ];

    const handleScroll = event => {
        const slideSize = screenWidth * 0.85;
        const { x } = event.nativeEvent.contentOffset;
        const currentIndex = Math.round(x / slideSize);
        setActiveSlide(currentIndex);
    };

    const handleSnapToItem = index => {
        const slideSize = screenWidth * 0.85 - 7;
        setActiveSlide(index);
        scrollViewRef.current.scrollTo({
            x: index * slideSize,
            y: 0,
            animated: true,
        });
    };

    const onPressHandler = () => {
        setModalVisible(!visible);
        setActiveSlide(0)
    };

    const renderSvgSafely = (SvgComponent) => {
        if (SvgComponent !== null) {
            return <SvgComponent height='420' width='420' style={{ position: "absolute" }} />;
        }
        return null;
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <View style={styles.modalBackground}>
                <View
                    style={styles.modalContent}>
                    <TouchableOpacity
                        onPress={() => onPressHandler()}
                        style={styles.icon}>
                        <Ionicons
                            name="close-circle-outline"
                            color={"#018abb"}
                            size={30}
                        />
                    </TouchableOpacity>
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={handleScroll}
                        contentContainerStyle={styles.carouselContainer}>
                        {tutorialData.map((item, index) => (
                            <View key={index} style={styles.slide}>
                                <item.svg 
                                    height='420' 
                                    width='420' 
                                    servo1Color={item.customColor && item.servo1}
                                    servo2Color={item.customColor && item.servo2}
                                    servo3Color={item.customColor && item.servo3}
                                    servo4Color={item.customColor && item.servo4}
                                    servo5Color={item.customColor && item.servo5}
                                    servo6Color={item.customColor && item.servo6}
                                    />
                                {renderSvgSafely(item.svgRotation)}
                                {renderSvgSafely(item.svgRotation2)}
                                {renderSvgSafely(item.svgFlex1)}
                                {renderSvgSafely(item.svgFlex2)}
                                {renderSvgSafely(item.svgFlex3)}
                                <Text style={styles.title}>LEGENDA</Text>
                                <View style={styles.label}>
                                    {item.color && <View style={{ height: 20, width: 20, backgroundColor: item.color }} />}
                                    <Text style={styles.text}>{item.label}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                    <View style={styles.pagination}>
                        {tutorialData.map((item, index) => (
                            <Text
                                key={index}
                                style={[
                                    styles.paginationDot,
                                    activeSlide === index && styles.paginationDotActive,
                                ]}
                                onPress={() => handleSnapToItem(index)}>
                                ⬤
                            </Text>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth * 0.85,
        height: screenHeight * 0.85,
        backgroundColor: 'white',
        borderColor: "#018abb",
        borderWidth: 2,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: "#001139"
    },
    icon: {
        position: 'absolute',
        width: 30,
        top: 4,
        right: 4,
        zIndex: 1,
        pointerEvents: 'box-none',
    },
    carouselContainer: {
        flexGrow: 1,
    },
    slide: {
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth * 0.85,
        height: screenHeight * 0.75,
        marginRight: -7,
    },
    title: {
        fontSize: 25,
        marginHorizontal: 20,
        textAlign: 'center',
        color: "#018abb",
        position: "absolute",
        fontWeight: "bold",
        bottom: screenHeight * 0.68
    },
    text: {
        fontSize: 20,
        marginHorizontal: 20,
        textAlign: 'center',
        color: "#e1e1e1",
    },
    label: {
        position: "absolute",
        top: screenHeight * 0.7,
        flexDirection: "row",
        alignItems: "center"
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    paginationDot: {
        fontSize: 30,
        marginHorizontal: 5,
    },
    paginationDotActive: {
        color: "#018abb",
    },
});

export default HelpComponent;