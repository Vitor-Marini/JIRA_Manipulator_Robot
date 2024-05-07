import React, { useState } from "react";
import { View, Button, StyleSheet, ScrollView, Text } from "react-native";
import CustomSlider from "../components/CustomSlider";

const BlockComponent = () => {
  const [blocks, setBlocks] = useState([]);
  // Estado para armazenar os valores dos sliders
  const [sliderValues, setSliderValues] = useState({});

  const addBlock = (color, message) => {
    // Gere um identificador único para o novo bloco
    const id = Date.now();
    setBlocks([...blocks, { id, color, message }]);
    // Adicione uma entrada no estado do valor do slider para o novo bloco
    setSliderValues(prevValues => ({ ...prevValues, [id]: 15 }));

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

  return (
    <View style={styles.container}>
      <View style={{ height: 400 }}>
        <ScrollView>
          {blocks.map((block) => (
            <View
              key={block.id}
              style={[styles.block, { backgroundColor: block.color }]}
            >
              <Text>{block.id}</Text>
              <CustomSlider
                value={sliderValues[block.id] || 15}
                minimumValue={0}
                maximumValue={50}
                onValueChange={(value) => handleSliderValueChange(block.id, value)}
                thumbStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 25,
                }}
                trackStyle={{ height: 10, borderRadius: 10, margin: 10 }}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <Button
        title="Adicionar Bloco Azul"
        onPress={() => addBlock("blue", "servo1")}
      />
      <Button
        title="Adicionar Bloco Verde"
        onPress={() => addBlock("green", "servo2")}
      />
      <Button
        title="Ver comandos"
        onPress={() => {
          let fullMessage = "";
          blocks.map((block, index) => {
            // Acessa o valor do slider para o bloco atual usando o id do bloco
            const sliderValue = sliderValues[block.id] || 15; // Assume 15 como valor padrão se não houver valor
            // Concatena a mensagem do bloco e o valor do slider na string fullMessage
            fullMessage === ""
              ? (fullMessage = `${block.message}: ${sliderValue}`)
              : (fullMessage += `, ${block.message}: ${sliderValue}`);
          });
          console.log(fullMessage);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  block: {
    width: 600,
    height: 100,
    margin: 10,
  },
});

export default BlockComponent;