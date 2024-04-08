import { Alert, StyleSheet, View } from "react-native";
import CustomButton from "../components/CustomButton";

export default function Config() {
  return (
    <View style={styles.container}>
      <CustomButton text={"config"} />
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
