import { Alert, StyleSheet, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import CustomAlert from "../components/CustomAlert";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const navigation = useNavigation();

  const [isAlertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const getVericationKey = async () => {
      const value = await AsyncStorage.getItem("@verification_boolean");
      const verification = value === "true";
      setAlertVisible(!verification);
    }

    getVericationKey();
  }, []);

/*   const message = "Hello ESP32!";

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
  }; */

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={isAlertVisible}
        onDismiss={() => setAlertVisible(false)}
        title={"IP não verificado"}
        message={"Você não está conectado em uma rede ESP32, as funções do aplicativo estarão limitadas. Vá em configurações para alterar o IP e testar."}
      />
      <CustomButton
        onPress={() => {
          navigation.navigate("Slider");
        }}
        text={"Slider"}
      />
      <CustomButton
        onPress={() => {
          navigation.navigate("Block");
        }}
        text={"Block"}
      />
      <CustomButton
        onPress={() => {
          navigation.navigate("Blink");
        }}
        text={"Blink"}
      />
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
