import { StyleSheet, Image, View } from "react-native";
import { Color } from "../../../estilos/colores";
import { Parrafo } from "../parrafo/Parrafo";
import Icons from "@expo/vector-icons/AntDesign";

export const Puntuacion = (props) => {
  return (
    <View style={styles.puntuacion}>
      <Parrafo variante="blancoXS">{props.puntuacion}</Parrafo>
      <Icons name="star" size={14} color={Color.blanco}></Icons>
    </View>
  );
};

const styles = StyleSheet.create({
  puntuacion: {
    display: "flex",
    flexDirection: "row",
    gap:4,
  },
});
