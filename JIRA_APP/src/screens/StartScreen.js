import { Alert, Image, StyleSheet, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import LoadingButton from "../components/LoadingButton";
import CustomAlert from "../components/CustomAlert";

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
    let [contadorTeste, setContadorTestes] = useState(0);
    //Contador de tentativas
    let [contadorTentativas, setContadorTentativas] = useState(0);
    //Texto do botão
    const [buttonText, setButtonText] = useState("Entrar");

    /*     const definirIpETestar = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                setIpAddress(data.ip);
                enviarMensagemTeste(data.ip);
            } catch (error) {
                console.error('Erro ao obter o endereço IP:', error);
            }
        }; */

    // Executar ao entrar no aplicativo
    useEffect(() => {
        enviarMensagemTeste();
    }, []);

    /**Enviar mensagem de teste*/
    const enviarMensagemTeste = async (ip = "192.168.0.225", tentativas = 1) => {
        setIsLoading(true); // Inicia o carregamento
        const controller = new AbortController(); // Cria um novo AbortController
        const signal = controller.signal; // Obtém o sinal do AbortController
    
        try {
            // Define um tempo limite para a solicitação
            const timeoutId = setTimeout(() => controller.abort(), 5000); // Aborta a solicitação após 5 segundos
    
            // Faz um fetch no IP com o endpoint send-test
            const response = await fetch(`http://${ip}/send-test`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
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
                data === "ESP32" ? (
                    setAlertTitle("Verificado"),
                    setAlertMessage(`ESP32 encontrada no endereço: ${ip}`),
                    setContadorTestes(0) // Zera contador de testes
                ) : (
                    console.log("Endpoint com resposta fora do esperado. Resposta: ", data),
                    setAlertTitle("Endpoint desconhecido"),
                    setAlertMessage("Conectado no endpoint send-test, mas mensagem não recebida"),
                    setContadorTentativas(tentativas + 1)
                );
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
            if (error.name === 'AbortError') {
                console.log('Abortado por limite de tempo');
                setAlertTitle("Erro");
                setAlertMessage('Limite de tempo excedido. Verifique se está conectado à rede da ESP32.');
            } else {
                console.error('Erro:', error);
                setAlertTitle("Erro ao testar");
                setAlertMessage('Erro', `Detalhes do erro: ${error.message}`);
            }
        } finally {
            setAlertVisible(tentativas >= 3);
        }
    
        // Verifica se já tentou 3 vezes
        if (tentativas < 3) { 
            // Aguarda 1 segundo antes de tentar novamente
            setTimeout(() => enviarMensagemTeste(ip, tentativas + 1), 1000);
        } else {
            setContadorTestes(contadorTeste + 1); // Incrementa testes
            setIsLoading(false); // Finaliza o carregamento
        }
    };

    // useEffect para verificar se a cada vez que o contador muda ele se torna >= 2
    useEffect(() => {
        if (contadorTeste >= 2) {
            setButtonText("Entrar sem conectar");
        } else {
            setButtonText("Entrar");
        }
    }, [contadorTeste]);

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/JIRA.png')} style={styles.image} />
            <CustomButton
                onPress={() => {
                    setContadorTestes(0);
                    setButtonText("Entrar")
                    navigation.navigate("MainGroup");
                }}
                text={buttonText}
                disabled={isLoading}
            />
            {isLoading ? (
                <LoadingButton />
            ) : (
                <CustomButton
                    onPress={enviarMensagemTeste}
                    text={"Testar Conexão"}
                />
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
