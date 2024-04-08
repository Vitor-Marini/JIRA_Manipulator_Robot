import { Alert, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

export default function StartComponent() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <CustomButton
        onPress={() => navigation.navigate("MainGroup")}
        text={"Entrar"}
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
});
