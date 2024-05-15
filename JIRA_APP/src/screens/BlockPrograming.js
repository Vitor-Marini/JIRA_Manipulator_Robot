import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Dimensions, Switch } from "react-native";
import CustomSlider from "../components/CustomSlider";
import HelpComponent from "../components/HelpComponent";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const servoTypes = {
  "Servo 1": ["Base", "Rotação"],
  "Servo 2": ["1º Junta", "Flexão/Extensão"],
  "Servo 3": ["2º Junta", "Flexão/Extensão"],
  "Servo 4": ["Pulso", "Rotação"],
  "Servo 5": ["Mão", "Flexão/Extensão"],
  "Servo 6": ["Garra", "Abrir/Fechar"],
}

const BlockPrograming = () => {

  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);

  const [blocks, setBlocks] = useState([]);
  // Estado para armazenar os valores dos sliders
  const [sliderValues, setSliderValues] = useState({});

  const [isVerified, setVerified] = useState(false);
  const [ip, setIp] = useState("192.168.4.1");

  const addBlock = (color, servoID) => {
    // Gere um identificador único para o novo bloco
    const servo = `Servo ${servoID}`
    const id = Date.now();

    let rotation;

    if (servoID === "1" || servoID === "4") {
      rotation = true;
    } else {
      rotation = false;
    }

    setBlocks([...blocks, { id, color, servoID, servo, rotation }]);
    // Adicione uma entrada no estado do valor do slider para o novo bloco
    setSliderValues(prevValues => ({ ...prevValues, [id]: servo === "Servo 6" ? 0 : 15 }));

    /*
      NOTAÇÃO DE PROPRIEDADE CALCULADA
      [id]: 15: A notação de propriedade calculada permite que você defina o nome de uma propriedade
      de um objeto usando uma variável. Neste caso, [id] significa que o nome da propriedade será o valor
      da variável id. Por exemplo, se id for 123, então a propriedade será nomeada 123. 
      O valor dessa propriedade é 15, que é o valor inicial do slider para o bloco especificado pelo id.
     */
  };

  const handleSliderValueChange = (id, value) => {
    // Atualize o valor do slider para o bloco específico
    setSliderValues(prevValues => ({ ...prevValues, [id]: value }));
  };

  const sendCommand = async (command) => {
    if(isVerified){
      try {
        const response = await fetch(`http://${ip}/oi`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            command: command,
          }).toString(),
        });
  
        if (response.ok) {
          console.log("Enviado com sucesso!");
        }
      } catch (error) {
        console.error("Erro:", error);
      }
    } else {
      console.log("Ip não verificado");
    }
  };

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
}, []);


  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Ionicons name={"home-outline"} size={30} color={"#0078a3"} />
        </TouchableOpacity>

        <Text
          style={{
            textAlign: "center",
            fontSize: 23,
            color: "#0078a3",
            fontWeight: "bold",
          }}
        >
          PROGRAMAR EM BLOCO
        </Text>

        {/* <TouchableOpacity style={{ backgroundColor: "#3466DB", width: 100, height: 30 }}>
                                    
                                </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Ionicons name={"help-circle-outline"} size={35} color={"#0078a3"} />
        </TouchableOpacity>

        <HelpComponent
          visible={isModalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
      <View style={{ height: screenHeight * 0.53, width: "100%", marginBottom: 5 }}>
        <ScrollView >
          {blocks.map((block) => (
            <View
              key={block.id}
              style={[block.servo === "Servo 6" ? styles.blockGrip : styles.block, { backgroundColor: block.color }]}
            >
              <View>
                <Text style={[styles.text, { marginLeft: 5 }]}>{block.servo}</Text>
                <Text style={{ marginLeft: 5, fontSize: 10 }}>{servoTypes[block.servo][0]}</Text>
                <Text style={{ marginLeft: 5, fontSize: 10 }}>Tipo: {servoTypes[block.servo][1]}</Text>
              </View>

              {block.servo === "Servo 6" ? (
                <View style={{ alignItems: "center", marginLeft: screenWidth * 0.3, justifyContent: "center" }}>
                  <Text style={{ textAlign: "center", fontWeight: "bold", marginTop: 5 }}>
                    {sliderValues[block.id] !== 0 ? "Aberto" : "Fechado"}
                  </Text>
                  < Switch
                    trackColor={{ false: "#767577", true: "#3466DB" }}
                    thumbColor={sliderValues[block.id] !== 0 ? "#f5dd4b" : "#f4f3f4"}
                    value={sliderValues[block.id] !== 0 ? true : false}
                    onValueChange={(value) => handleSliderValueChange(block.id, value === true ? 1 : 0)}
                    style={{ transform: [{ scaleX: 1.6 }, { scaleY: 1.6 }] }}
                  />
                </View>
              ) : (
                <View>
                  <Text style={{ textAlign: "center", fontWeight: "bold", marginTop: 5 }}>
                    {sliderValues[block.id] + "°"}
                  </Text>
                  <CustomSlider
                    style={{ margin: 10, marginTop: 0 }}
                    minimumTrackTintColor={block.rotation ? "#e68a00" : "#0136bb"}
                    maximumTrackTintColor={"#31416b"}
                    value={sliderValues[block.id]}
                    minimumValue={0}
                    maximumValue={180}
                    onValueChange={(value) => handleSliderValueChange(block.id, value)}
                    thumbStyle={{
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#eeecec",
                      borderWidth: 3,
                      borderColor: "#383636",
                      width: 30,
                      height: 30,
                      borderRadius: 25,
                    }}
                    trackStyle={{ height: 25, borderRadius: 10 }}
                    step={1}
                  />
                </View>
              )}

            </View>
          ))}
        </ScrollView>
      </View>

      <View style={{ backgroundColor: "#54597d", width: "90%", height: 1, margin: 5 }} />

      <View style={{ justifyContent: "flex-end", alignItems: "center" }} >
        <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            style={[styles.blockButton, { backgroundColor: "#F5F5DC" }]}
            onPress={() => addBlock("#F5F5DC", "1")}
          >
            <Text style={styles.text}>SERVO 1</Text>
            <Text style={{ fontSize: 10 }}>{servoTypes["Servo 1"][0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.blockButton, { backgroundColor: "#D8BFD8" }]}
            onPress={() => addBlock("#D8BFD8", "2")}
          >
            <Text style={styles.text}>SERVO 2</Text>
            <Text style={{ fontSize: 10 }}>{servoTypes["Servo 2"][0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.blockButton, { backgroundColor: "#ffb6e5" }]}
            onPress={() => addBlock("#ffb6e5", "3")}
          >
            <Text style={styles.text}>SERVO 3</Text>
            <Text style={{ fontSize: 10 }}>{servoTypes["Servo 3"][0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.blockButton, { backgroundColor: "#9370DB" }]}
            onPress={() => addBlock("#9370DB", "4")}
          >
            <Text style={styles.text}>SERVO 4</Text>
            <Text style={{ fontSize: 10 }}>{servoTypes["Servo 4"][0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.blockButton, { backgroundColor: "#8A2BE2" }]}
            onPress={() => addBlock("#8A2BE2", "5")}
          >
            <Text style={styles.text}>SERVO 5</Text>
            <Text style={{ fontSize: 10 }}>{servoTypes["Servo 5"][0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.blockButton, { backgroundColor: "#9932CC" }]}
            onPress={() => addBlock("#9932CC", "6")}
          >
            <Text style={styles.text}>SERVO 6</Text>
            <Text style={{ fontSize: 10 }}>{servoTypes["Servo 6"][0]}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", width: "100%" }}>
          <TouchableOpacity
            style={styles.actionsButton}
            onPress={() => { setBlocks([]); setSliderValues({}) }}
            pointerEvents="box-none"
          >
            <Ionicons name={"close-circle"} size={60} color={"#3466DB"} />
            <Text style={styles.textActions}>APAGAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionsButton}
            onPress={() => {
              let fullMessage = "";
              blocks.map((block, index) => {
                // Acessa o valor do slider para o bloco atual usando o id do bloco
                const sliderValue = sliderValues[block.id];
                // Concatena a mensagem do bloco e o valor do slider na string fullMessage
                fullMessage === ""
                  ? (fullMessage = `${block.servoID}:${sliderValue}`)
                  : (fullMessage += `,${block.servoID}:${sliderValue}`);
              });

              if (fullMessage !== "") {
                console.log(fullMessage);
                sendCommand(fullMessage);
              }
            }}
            pointerEvents="box-none"
          >
            <Ionicons name={"caret-forward-circle"} size={60} color={"#3466DB"} />
            <Text style={styles.textActions}>ENVIAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#001139",
  },
  block: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.145,
    alignSelf: "center",
    borderRadius: 5,
    margin: 5,
  },
  blockGrip: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.1,
    alignSelf: "center",
    borderRadius: 5,
    margin: 5,
    flexDirection: "row",
  },
  blockButton: {
    width: 100,
    height: 50,
    margin: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15
  },
  textActions: {
    color: "#3466DB",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold"
  },
  actionsButton: {
    width: "50%",
    alignItems: "center"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
    marginTop: 30
  },
});

export default BlockPrograming;