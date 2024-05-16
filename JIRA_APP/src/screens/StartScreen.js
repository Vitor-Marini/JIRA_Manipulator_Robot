import { Alert, Image, StyleSheet, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import LoadingButton from "../components/LoadingButton";
import CustomAlert from "../components/CustomAlert";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**Componente da tela inicial*/
export default function StartComponent() {
  const navigation = useNavigation();

  //Manipulador do carregamento
  const [isLoading, setIsLoading] = useState(false);

  //Manipuladores do alert
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  //Contador de testes
  let [isSuccessfullyConnected, setSuccessfullyConnected] = useState(false);
  //Contador de tentativas
  let [contadorTentativas, setContadorTentativas] = useState(0);
  //Texto do botão
  const [buttonText, setButtonText] = useState("Entrar");

  // Executar ao entrar no aplicativo
  useEffect(() => {
    const fetchAndSendIP = async () => {
      const ip = await getIPFromStorage();
      if (ip !== null) {
        console.log(ip);
        enviarMensagemTeste(ip);
      } else {
        // Usar argumento padrão
        enviarMensagemTeste();
      }
    };
    fetchAndSendIP();
  }, []);

  const getIPFromStorage = async () => {
    try {
      const ip = await AsyncStorage.getItem("@ip_esp32");
      if (ip === null) {
        console.log("Ip não encontrado");
        await AsyncStorage.setItem("@ip_esp32", "192.168.4.1")
        return null;
      } else {
        return ip;
      }
    } catch (error) {
      console.error("Erro ao acesar armazenamento: ", error);
      return null;
    }
  }

  /**Enviar mensagem de teste*/
  const enviarMensagemTeste = async (ip = "192.168.4.1", tentativas = 1) => {
    setIsLoading(true); // Inicia o carregamento
    const controller = new AbortController(); // Cria um novo AbortController
    const signal = controller.signal; // Obtém o sinal do AbortController

    let verificado = false

    try {
      // Define um tempo limite para a solicitação
      const timeoutId = setTimeout(() => controller.abort(), 3000); // Aborta a solicitação após 3 segundos

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
          setButtonText("Entrar");
          setSuccessfullyConnected(true);
          setIsLoading(false);
          verificado = true;
          tentativas = 3;
        } else {
          setAlertTitle("Endpoint desconhecido");
          setAlertMessage("Conectado no endpoint send-test, mas mensagem não recebida");
          setContadorTentativas(tentativas + 1);
        }
      } else {
        console.log(`Erro na resposta: ${response.status}`);
        setAlertTitle("Erro na resposta");
        setAlertMessage(`Status da resposta: ${response.status}`);
        // Incrimenta contador de tentativas
        setContadorTentativas(tentativas + 1);
      }
    } catch (error) {
      // Incrimenta contador de tentativas
      setContadorTentativas(tentativas + 1);
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
    } finally {
      setAlertVisible(tentativas >= 3);
    }

    // Verifica se já tentou 3 vezes
    if (tentativas < 3) {
      setTimeout(() => enviarMensagemTeste(ip, tentativas + 1), 1000);
    } else {
      if (!verificado) {
        setSuccessfullyConnected(false); // Atribui falso
        setIsLoading(false); // Finaliza o carregamento
      }
    }
  };

  const storeVerification = async (verificado = false) => {
    try {
      await AsyncStorage.setItem("@verification_boolean", String(verificado));
      console.log(verificado);
    } catch (error) {
      console.error("Erro ao acessar armazenamento: ", error);
    }
  }

  // useEffect para verificar se a cada vez que o contador muda ele se torna >= 1
  useEffect(() => {
    console.log("Conectado com sucesso: " + isSuccessfullyConnected);
    if (isSuccessfullyConnected === false) {
      setButtonText("Entrar sem conectar");
      storeVerification(false);
    } else {
      setButtonText("Entrar");
      storeVerification(true);
    }
  }, [isSuccessfullyConnected]);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/Logo_JIRA2.png")} style={styles.image} />
      <CustomButton
        onPress={() => {
          navigation.navigate("MainGroup");
        }}
        text={buttonText}
        disabled={isLoading}
      />
      {isLoading ? (
        <LoadingButton />
      ) : (
        <CustomButton onPress={enviarMensagemTeste} text={"Testar Conexão"} />
      )}
      <CustomAlert
        visible={isAlertVisible}
        onDismiss={() => setAlertVisible(false)}
        title={alertTitle}
        message={alertMessage}
      />
    </View>
  );
}

/**Constante de estilos*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001139", //01184D
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 400,
    height: 400,
  },
});
