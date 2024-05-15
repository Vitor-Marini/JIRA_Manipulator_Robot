import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ConnectionTest() {
  const navigation = useNavigation();

  const [isVerified, setVerified] = useState(false);
  const [ip, setIp] = useState("192.168.4.1");

  const [servoData1, setServoData1] = useState("");
  const [servoData2, setServoData2] = useState("");
  const [servoData3, setServoData3] = useState("");
  const [servoData4, setServoData4] = useState("");
  const [servoData5, setServoData5] = useState("");
  const [servoData6, setServoData6] = useState("");
  

  useEffect(() => {
    const getVericationKey = async () => {
      const value = await AsyncStorage.getItem("@verification_boolean");
      const verification = value === "true";
      console.log(verification);
      if (verification) {
        setVerified(true);
      } else {
        setVerified(false);
      }
    }

    const getIpFromStorage = async () => {
      const value = await AsyncStorage.getItem("@ip_esp32");
      if (value !== null) {
        console.log("ip: ", value);
        setIp(value);
      } else {
        setIp("192.168.4.1")
      }
    }

    getIpFromStorage();
    getVericationKey();

    if (isVerified) {
      fetchData();
    }
  }, []);

  function fetchData() {
    fetch(`http://${ip}/servos-endpoint`) // Substitua pelo endereço IP correto se não estiver rodando localmente
      .then(response => {
        if (!response.ok) {
          throw new Error("Resposta não recebida");
        }
        return response.json(); // Parse a resposta como JSON
      })
      .then(data => {
        console.log(data);
        // Processamento dos dados
        setServoData1(data.servo1);
        setServoData2(data.servo2);
        setServoData3(data.servo3);
        setServoData4(data.servo4);
        setServoData5(data.servo5);
        setServoData6(data.servo6);
      })
      .catch(error => {
        console.error('Erro:', error);
      });
  }

  const buttonHandler = () => {
    if (isVerified) {
      fetchData();
    } else {
      console.log("Não verificado");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Servo 1: {servoData1}</Text>
      <Text style={styles.text}>Servo 2: {servoData2}</Text>
      <Text style={styles.text}>Servo 3: {servoData3}</Text>
      <Text style={styles.text}>Servo 4: {servoData4}</Text>
      <Text style={styles.text}>Servo 5: {servoData5}</Text>
      <Text style={styles.text}>Servo 6: {servoData6}</Text>
      <CustomButton
        text="Obter Dados"
        onPress={buttonHandler}
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
  text: {
    fontSize: 18,
    color: "white"
  }
});
