import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';

const CustomAlert = ({ visible, onDismiss, title ="PLACEHOLDER", message = "PLACEHOLDER", buttonText = "OK"}) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onDismiss}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={onDismiss}
                    >
                        <Text style={styles.buttonText}>{buttonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.717)",
    },
    modalView: {
        margin: 20,
        backgroundColor: "#001139",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "85%",
        height: "45%"
    },
    title: {
        fontSize: Platform.OS === "web"? 35 : 24,
        color: "#00bbff",
        marginBottom: 20,
        textAlign: "center"
    },
    message: {
        fontSize: Platform.OS === "web"? 30 : 19,
        color: '#fff',
        marginTop: 15,
        textAlign: "center"
    },
    button: {
        backgroundColor: "#3466DB",
        borderRadius: 20,
        padding: 10,
        paddingLeft: 45,
        paddingRight: 45,
        elevation: 2,
        top: Platform.OS === "web"? "80%" : "100%",
        position: "absolute"
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
    }
});

export default CustomAlert;