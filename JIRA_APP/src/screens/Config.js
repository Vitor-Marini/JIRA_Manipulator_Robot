import { Dimensions, Keyboard, StyleSheet, Text, TextInput, View } from "react-native";
import CustomButton from "../components/CustomButton";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../components/CustomAlert";
import LoadingButton from "../components/LoadingButton";

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

export default function Config() {

    const [text, setText] = useState('');

    //Manipuladores do alert
    const [isAlertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertTitle, setAlertTitle] = useState("");

    //Manipulador do carregamento
    const [isLoading, setIsLoading] = useState(false);

    const onChangeText = (text) => {
        setText(text);
    };

    const sendData = async () => {
        setIsLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;

        let ip = text.trim();

        if (ip === "") {
            setAlertTitle("Campo vazio");
            setAlertMessage(`Preencha o campo de texto com o novo IP`);
            setAlertVisible(true);
            setIsLoading(false);
            return;
        }

        try {
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            const response = await fetch(`http://${ip}/send-test`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    message: "connection test",
                }).toString(),
                signal,
            });
            clearTimeout(timeoutId);
            // Se tiver resposta
            if (response.ok) {
                const data = await response.text();
                // Verifica se a mensagem é 'ESP32'
                data === "ESP32"
                    ? (
                        setAlertTitle("Verificado"),
                        setAlertMessage(`ESP32 encontrada no endereço: ${ip}`),
                        await AsyncStorage("@ip_esp32", ip)
                    ) : (
                        console.log(
                            "Endpoint com resposta fora do esperado. Resposta: ",
                            data),
                        setAlertTitle("Endpoint desconhecido"),
                        setAlertMessage(
                            "Conectado no endpoint send-test, mas mensagem não recebida"
                        ));
            } else {
                console.log(`Erro na resposta: ${response.status}`);
                setAlertTitle("Erro na resposta");
                setAlertMessage(`Status da resposta: ${response.status}`);
            }
        } catch (error) {
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
            setText("");
            setIsLoading(false);
            setAlertVisible(true);
        }

    };

    const setDefaultIP = async (ip = "192.168.4.1") => {
        try {
            await AsyncStorage.setItem("@ip_esp32", ip);
            setAlertTitle("IP Redefinido");
            setAlertMessage("IP resetado ao padrão: " + ip);
            setAlertVisible(true);
        } catch (error) {
            console.error("Erro:", error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={{ margin: 10, fontSize: 22, color: "#00bbff" }}>Digite um novo IP</Text>
            <TextInput
                style={styles.inputStyle}
                onChangeText={onChangeText}
                value={text}
                onSubmitEditing={() => { Keyboard.dismiss() }}
                blurOnSubmit={true}
                keyboardType="numeric"
            />
            {isLoading ? (
                <LoadingButton />
            ) : (
                <CustomButton onPress={sendData} text={"Testar Conexão"} />
            )}
            <CustomButton
                text="Redefinir IP"
                onPress={setDefaultIP}
                disabled={isLoading}
            />
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
        width: screenWidth,
        height: screenHeight,
    },
    inputStyle: {
        height: 40,
        borderColor: "#0078a3",
        borderWidth: 1,
        width: screenWidth * 0.8,
        color: "#0078a3",
        paddingHorizontal: 10,
        fontSize: 20,
        borderRadius: 10,
        marginBottom: 80,
    }
});
