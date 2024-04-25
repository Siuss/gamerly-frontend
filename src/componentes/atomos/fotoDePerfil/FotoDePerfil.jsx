import { StyleSheet, Image } from "react-native";
import { Color } from "../../../estilos/colores";

export const FotoDePerfil = (props) => {
  const styles = StyleSheet.create({
    image: {
      width: props.width,
      height: props.height,
      borderRadius: 100,
      borderWidth: 4,
      borderColor: Color.acento,
    },
  });
  
  return <Image style={styles.image} source={{ uri: props.src }}></Image>;
};
