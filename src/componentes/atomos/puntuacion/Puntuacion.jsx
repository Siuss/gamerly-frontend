import { StyleSheet, View } from "react-native";
import { Color } from "../../../estilos/colores";
import Icons from "@expo/vector-icons/AntDesign";

export const Puntuacion = ({ puntuacion }) => (
  <View style={styles.puntuacion}>
    {[...Array(puntuacion).keys()].map((index) => (
      <Icons style={styles.estrella} key={index} name="star" size={14} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  puntuacion: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
  },
  estrella: {
    color: Color.blanco,
  },
});
