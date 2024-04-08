import { Alert, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";

export default function Home() {
  const message = "Hello ESP32!";

  const sendData = async () => {
    try {
      const response = await fetch("http://192.168.4.1/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          message: message,
        }).toString(),
      });

      if (response.ok) {
        const data = await response.text();
        Alert.alert("Mensagem Recebida", data);
        console.log("Mensagem da ESP32: " + data);
      } else {
        Alert.alert("Erro", "Ocorreu um erro ao enviar a mensagem.");
      }
    } catch (error) {
      console.error("Erro:", error);
      Alert.alert("Erro", "Ocorreu um erro ao enviar a mensagem.");
    }
  };

  return (
    <View style={styles.container}>
      <CustomButton onPress={sendData} text={"Enviar Dados"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001139", //01184D
    alignItems: "center",
    justifyContent: "center",
  },
});
