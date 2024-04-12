import React from 'react';
import { StyleSheet, View, ActivityIndicator, Platform, Dimensions } from 'react-native';

const width = Platform.OS == "web" ? 300 : Dimensions.get('window').width  * 0.80;
const height = Platform.OS == "web" ? 75 : Dimensions.get('window').height * 0.1;

export default function LoadingButton() {

    return (
        <View style={styles.activeShadow}>
            <View style={styles.buttonDisabled}
            >
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonDisabled: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: "#8290b0",
        width: width,
        height: height,
    },
    activeShadow: {
        backgroundColor: Platform.OS == "web" ? 'rgba(0, 0, 0, 0.3)' :'rgba(0, 0, 0, 0.2)',
        margin: Platform.OS == "web" ? 10 :"3%",
        borderRadius: 15,
        width: width + 4,
        height: height  + 4,
    }
});