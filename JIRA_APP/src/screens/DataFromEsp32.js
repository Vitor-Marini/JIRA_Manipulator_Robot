import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../components/CustomButton";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../components/CustomAlert";
import LoadingButton from "../components/LoadingButton";

export default function ConnectionTest() {

  const intervalRef = useRef();

  const [isFetching, setIsFetching] = useState(false);
  const [buttonText, setButtonText] = useState("Iniciar Coleta de Dados")

  const [isVerified, setVerified] = useState(false);
  const [ip, setIp] = useState("192.168.4.1");

  const [servoData1, setServoData1] = useState("Indefinido");
  const [servoData2, setServoData2] = useState("Indefinido");
  const [servoData3, setServoData3] = useState("Indefinido");
  const [servoData4, setServoData4] = useState("Indefinido");
  const [servoData5, setServoData5] = useState("Indefinido");
  const [servoData6, setServoData6] = useState("Indefinido");

  //Manipulador do carregamento
  const [isLoading, setIsLoading] = useState(false);

  //Manipuladores do alert
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  //Obter dados ao montar e desmontar componente
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

  //Parar ao sair da tela
  useFocusEffect(
    React.useCallback(() =>{
      if (isFetching) {
        stopFetching();
      }
    }, [])
  );

  const fetchData = () => {
    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => controller.abort(), 5000);

    fetch(`http://${ip}/servos-endpoint`, { signal })
      .then(response => {
        if (!response.ok) {
          throw new Error("Resposta não recebida");
        }
        return response.json(); // Parse a resposta como JSON
      })
      .then(data => {
        console.log(data);
        // Processamento dos dados
        setServoData1(data.servo1 + "°");
        setServoData2(data.servo2 + "°");
        setServoData3(data.servo3 + "°");
        setServoData4(data.servo4 + "°");
        setServoData5(data.servo5 + "°");
        setServoData6(data.servo6 + "°");
      })
      .catch(error => {
        if (error.name === 'AbortError') {
          console.log('Fetch foi abortado devido ao tempo limite');
          setAlertTitle("Erro");
          setAlertMessage(
            "Limite de tempo excedido. Verifique se está conectado à rede da ESP32."
          );
        } else {
          console.error('Erro:', error);
          setAlertTitle("Erro");
          setAlertMessage(
            `Erro na conexão: ${error.message}`
          );
        }
        setAlertVisible(true);
        setButtonText("Iniciar Coleta de Dados");
        storeVerification(false);
        setVerified(false);
        setIsFetching(false);
        stopFetching();
      })
      .finally(() => {
        clearTimeout(timeoutId);
      });
  }

  const startFetching = () => {
    setIsFetching(true);
    intervalRef.current = setInterval(() => fetchData(), 3000); // Salva a referência do intervalo
  };

  const stopFetching = () => {
    setIsFetching(false);
    clearInterval(intervalRef.current); // Usa a referência para limpar o intervalo
  };

  const storeVerification = async (verificado = false) => {
    try {
      await AsyncStorage.setItem("@verification_boolean", String(verificado));
      console.log(verificado);
    } catch (error) {
      console.error("Erro ao acessar armazenamento: ", error);
    }
  }

  /**Enviar mensagem de teste*/
  const enviarMensagemTeste = async (ip = "192.168.4.1") => {
    setIsLoading(true); // Inicia o carregamento
    const controller = new AbortController(); // Cria um novo AbortController
    const signal = controller.signal; // Obtém o sinal do AbortController

    try {
      // Define um tempo limite para a solicitação
      const timeoutId = setTimeout(() => controller.abort(), 5000); // Aborta a solicitação após 5 segundos

      // Faz um fetch no IP com o endpoint send-test
      const response = await fetch(`http://${ip}/send-test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          message: "connection test",
        }).toString(),
        signal, // Passa o sinal para a solicitação fetch
      });

      clearTimeout(timeoutId); // Limpa o tempo limite se a solicitação for bem-sucedida

      // Se tiver resposta
      if (response.ok) {
        const data = await response.text();
        // Verifica se a mensagem é 'ESP32'
        if (data === "ESP32") {
          setAlertTitle("Verificado");
          setAlertMessage(`ESP32 encontrada no endereço: ${ip}`);
          storeVerification(true);
          setVerified(true);
        } else {
          setAlertTitle("Endpoint desconhecido");
          setAlertMessage("Conectado no endpoint send-test, mas mensagem não recebida");
        }
      } else {
        console.log(`Erro na resposta: ${response.status}`);
        setAlertTitle("Erro na resposta");
        setAlertMessage(`Status da resposta: ${response.status}`);
      }
    } catch (error) {
      // Verifica se o erro não é por abortar
      if (error.name === "AbortError") {
        console.log("Abortado por limite de tempo");
        setAlertTitle("Erro");
        setAlertMessage(
          "Limite de tempo excedido. Verifique se está conectado à rede da ESP32."
        );
      } else {
        console.error("Erro:", error);
        setAlertTitle("Erro ao testar");
        setAlertMessage(`Detalhes do erro: ${error.message}`);
      }

      if (!isVerified) {
        storeVerification(false);
        setVerified(false);
      }

    } finally {
      setAlertVisible(true);
      setIsLoading(false);
    }
  };

  const buttonHandler = () => {
    if (isVerified) {
      if (!isFetching) {
        setButtonText("Parar Coleta de Dados");
        startFetching();
      } else {
        setButtonText("Iniciar Coleta de Dados");
        stopFetching();
        setServoData1("Indefinido");
        setServoData2("Indefinido");
        setServoData3("Indefinido");
        setServoData4("Indefinido");
        setServoData5("Indefinido");
        setServoData6("Indefinido");
      }
    } else {
      console.log("Não verificado");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dados</Text>
      <View style={{ marginBottom: 50, width: "100%", marginLeft: 50 }}>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text style={styles.text}>Status da Conexão: </Text>
          <Text style={styles.textData}>{isVerified ? isFetching ? "Ativa" : "Inativa" : "Não Verificada"}</Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text style={styles.text}>Servo 1: </Text>
          <Text style={styles.textData}>{servoData1}</Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text style={styles.text}>Servo 2: </Text>
          <Text style={styles.textData}>{servoData2}</Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text style={styles.text}>Servo 3: </Text>
          <Text style={styles.textData}>{servoData3}</Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text style={styles.text}>Servo 4: </Text>
          <Text style={styles.textData}>{servoData4}</Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text style={styles.text}>Servo 5: </Text>
          <Text style={styles.textData}>{servoData5}</Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text style={styles.text}>Servo 6: </Text>
          <Text style={styles.textData}>{servoData6}</Text>
        </View>

      </View>

      <CustomButton
        text={buttonText}
        onPress={buttonHandler}
        disabled={isLoading}
      />

      {isLoading ?
        (
          <LoadingButton />
        ) : (
          <CustomButton
            text="Testar Conexão"
            onPress={enviarMensagemTeste}
          />)
      }

      <CustomAlert
        visible={isAlertVisible}
        onDismiss={() => setAlertVisible(false)}
        title={alertTitle}
        message={alertMessage}
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
    color: "#00bbff",
  },
  textData: {
    fontSize: 18,
    color: "#0078a3",
  },
  title: {
    fontSize: 30,
    color: "#00bbff",
    fontWeight: "bold",
    marginBottom: 50
  }
});
