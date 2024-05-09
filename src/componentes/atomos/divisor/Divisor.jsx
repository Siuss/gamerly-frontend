import { StyleSheet, View } from "react-native";
import { Color } from "../../../estilos/colores";

export const Divisor = () => {
  return <View style={styles.divisor} />;
};

const styles = StyleSheet.create({
  divisor: {
    height: 2,
    backgroundColor: Color.blanco,
    width: "100%",
  },
});
