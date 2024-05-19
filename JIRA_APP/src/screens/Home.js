import { ScrollView, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import CustomAlert from "../components/CustomAlert";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const navigation = useNavigation();

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [isVerified, setVerified] = useState(false);
  const [ip, setIp] = useState("192.168.4.1");
  const [isColorModeEnabled, setColorModeEnabled] = useState(false);

  useEffect(() => {
    const getVericationKey = async () => {
      const value = await AsyncStorage.getItem("@verification_boolean");
      const verification = value === "true";
      setVerified(verification);
      setAlertTitle("IP não verificado");
      setAlertMessage("Você não está conectado em uma rede ESP32, as funções do aplicativo estarão limitadas. Vá em configurações para alterar o IP e testar.");
      setAlertVisible(!verification);
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
  }, []);

  const resetPositions = async () => {
    if (isVerified) {
      try {
        const response = await fetch(`http://${ip}/move_to_position`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            positionNumber: 4,
          }).toString(),
        });

        if (response.ok) {
          console.log("Enviado com sucesso!");
          setAlertTitle("Posição Redefinida");
          setAlertMessage("Posições das garras redefinidas com sucesso");
        }
      } catch (error) {
        console.error("Erro:", error);
        setAlertTitle("Erro");
        setAlertMessage(`erro: ${error.message}`);
      } finally {
        setAlertVisible(true);
      }
    } else {
      console.log("Ip não verificado");
    }
  }

  const forceStop = async () => {
    if (isVerified) {
      fetch(`http://${ip}/force-stop`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Resposta não recebida");
          }
          return response;
        })
        .then(response => response.text()) 
        .then(text => {
          console.log(text);
          setAlertTitle("Bem Sucedido");
          setAlertMessage(text); 
        })
        .catch(error => {
          console.error('Erro:', error);
          setAlertTitle("Erro");
          setAlertMessage(`erro: ${error.message}`);
        })
        .finally(() => {
          setAlertVisible(true);
        });
    } else {
      console.log("Ip não verificado");
    }
  }

  const colorModeEnable = async (modeEnabled = false) => {
    if (isVerified) {
      try {
        const response = await fetch(`http://${ip}/color_mode`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            enable: modeEnabled,
          }).toString(),
        });

        if (response.ok) {
          console.log("Enviado com sucesso!");
          if (response.message === "ativado") {
            setAlertMessage("Modo de cor ativado com sucesso");
            setAlertTitle("Modo de cor");
          } else if (response.message === "desativado") {
            setAlertMessage("Modo de cor desativado com sucesso");
            setAlertTitle("Modo de cor");
          }
        }
      } catch (error) {
        console.error("Erro:", error);
        setAlertTitle("Erro");
        setAlertMessage(`erro: ${error.message}`);
      } finally {
        setAlertVisible(true);
      }
    } else {
      console.log("Ip não verificado");
    }
  }

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={isAlertVisible}
        onDismiss={() => setAlertVisible(false)}
        title={alertTitle}
        message={alertMessage}
      />
      <Text style={styles.title}>Funções Principais</Text>
      <ScrollView style={{ marginBottom: "30%" }}>
        <CustomButton
          onPress={() => {
            const modeEnabled = !isColorModeEnabled
            setColorModeEnabled(modeEnabled);
            //colorModeEnable(modeEnabled);
          }}
          text={isColorModeEnabled ? "Desativar Modo de Cores" : "Ativar Modo de Cores"}
        />
        <CustomButton
          onPress={() => {
            navigation.navigate("Slider");
          }}
          text={"Programação Slider"}
        />
        <CustomButton
          onPress={() => {
            navigation.navigate("Block");
          }}
          text={"Programação em Bloco"}
        />
        <CustomButton
          onPress={() => {
            resetPositions();
          }}
          text={"Resetar Posições"}
        />
        <CustomButton
          enableLongPress={true}
          onLongPress={() => {
            forceStop();
          }}
          text={"Segurar p/ Forçar Parada"}
        />
      </ScrollView>
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
  title: {
    fontSize: 30,
    color: "#00bbff",
    fontWeight: "bold",
    marginTop: "25%",
    marginBottom: "10%"
  }
});
