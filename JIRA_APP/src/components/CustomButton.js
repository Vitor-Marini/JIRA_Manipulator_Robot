import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Dimensions } from 'react-native';

const width = Platform.OS == "web" ? 300 : Dimensions.get('window').width  * 0.80;
const height = Platform.OS == "web" ? 75 : Dimensions.get('window').height * 0.1;

export default function CustomButton({ onPress, text }) {
    // Estado para controlar a visibilidade da sombra
    const [isShadowVisible, setIsShadowVisible] = useState(true);

    const handlePressIn = () => {
        setIsShadowVisible(false);
    };
    const handlePressOut = () => {
        setTimeout(() => {
            setIsShadowVisible(true);
        }, 100);
    };
    const handlePress = () => {
        onPress();
    };

    return (
        <View style={isShadowVisible ? styles.activeShadow : styles.inactiveShadow}>
            <TouchableOpacity
                style={styles.button}
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <Text style={styles.textStyle}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: "#3466DB",
        width: width,
        height: height,
    },
    textStyle: {
        fontSize: 20,
        color: "#FFFF",
    },
    activeShadow: {
        backgroundColor: Platform.OS == "web" ? 'rgba(0, 0, 0, 0.3)' :'rgba(0, 0, 0, 0.2)',
        margin: Platform.OS == "web" ? 10 :"3%",
        borderRadius: 15,
        width: width + 4,
        height: height  + 4,
    },
    inactiveShadow: {
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        margin: Platform.OS == "web" ? 10 :"3%",
        borderRadius: 13,
        width: width + 4,
        height: height + 4,
        left: 1,
        top: 1,
    }
});