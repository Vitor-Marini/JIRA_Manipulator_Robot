import React, { useState } from "react";
import { View, Button, StyleSheet, ScrollView, Text } from "react-native";
import CustomSlider from "../components/CustomSlider";

const BlockComponent = () => {
  // Estado para armazenar os blocos
  const [blocks, setBlocks] = useState([]);
  const [value, setValue] = useState(15);

  let fullMessage = "";

  // Função para adicionar um novo bloco com uma cor específica
  const addBlock = (color, message) => {
    setBlocks([...blocks, { color, message }]);
  };

  return (
    <View style={styles.container}>
      <View style={{ height: 400 }}>
        <ScrollView>
          {blocks.map((block, index) => (
            <View
              key={index}
              style={[styles.block, { backgroundColor: block.color }]}
            >
              {/* Renderização do bloco */}
              <Text>{index}</Text>
              <CustomSlider
                value={value}
                minimumValue={0}
                maximumValue={50}
                onValueChange={(value) => setValue(value)}
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
        onPress={() => addBlock("blue", "esquerda")}
      />
      <Button
        title="Adicionar Bloco Verde"
        onPress={() => addBlock("green", "direita")}
      />
      <Button
        title="Ver comandos"
        onPress={() => {
          blocks.map((block, index) => {
            console.log(index, block.message);
            fullMessage === ""
              ? (fullMessage = block.message)
              : (fullMessage += "," + block.message);
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
