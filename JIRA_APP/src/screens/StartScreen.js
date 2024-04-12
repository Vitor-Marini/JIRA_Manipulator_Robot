import { Alert, Image, StyleSheet, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import LoadingButton from "../components/LoadingButton";
import CustomAlert from "../components/CustomAlert";

export default function StartComponent() {

    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false);

    const [ipAddress, setIpAddress] = useState('');

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertTitle, setAlertTitle] = useState("");

    let [contador, setContador] = useState(0);
    const [buttonText, setButtonText] = useState("Entrar");

    const definirIpETestar = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            setIpAddress(data.ip);
            enviarMensagemTeste(data.ip);
        } catch (error) {
            console.error('Erro ao obter o endereço IP:', error);
        }
    };

    useEffect(() => {
        definirIpETestar();
    }, []);

    const enviarMensagemTeste = async (ip = "192.168.0.225") => {
        setIsLoading(true); // Inicia o carregamento
        const controller = new AbortController(); // Cria um novo AbortController
        const signal = controller.signal; // Obtém o sinal do AbortController

        try {
            // Define um tempo limite para a solicitação
            const timeoutId = setTimeout(() => controller.abort(), 20000); // Aborta a solicitação após 20 segundos

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

            if (response.ok) {
                setAlertTitle("Verificado");
                setAlertMessage(`ESP32 encontrada no endereço: ${ip}`);
                setContador(0);
            } else {
                setAlertTitle("Erro na resposta");
                setAlertMessage(`Status da resposta: ${response.status}`);
                setContador(contador + 1);
            }
        } catch (error) {
            setContador(contador + 1);
            if (error.name === 'AbortError') {
                setAlertTitle("Erro");
                setAlertMessage('Limite de tempo excedido. Verifique se está conectado à rede da ESP32.');
            } else {
                console.error('Erro:', error);
                setAlertTitle("Erro ao testar");
                setAlertMessage('Erro', `Detalhes do erro: ${error.message}`);
            }
        } finally {
            setAlertVisible(true);
            setIsLoading(false); // Finaliza o carregamento
        }
    };

    useEffect(() => {
        if (contador >= 2) {
            setButtonText("Entrar sem conectar");
        } else {
            setButtonText("Entrar");
        }
    }, [contador]);

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/JIRA.png')} style={styles.image} />
            <CustomButton
                onPress={() => {
                    setContador(0); 
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
                    onPress={definirIpETestar}
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
