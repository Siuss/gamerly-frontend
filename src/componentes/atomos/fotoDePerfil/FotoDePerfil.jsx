import { StyleSheet, Image } from "react-native";
import { Color } from "../../../estilos/colores";

export const FotoDePerfil = ({ src, width, height }) => {
  const styles = StyleSheet.create({
    image: {
      width: width,
      height: height,
      borderRadius: 100,
      borderWidth: 2,
      borderColor: Color.rosa,
    },
  });

  return <Image style={styles.image} source={{ uri: src }}></Image>;
};
