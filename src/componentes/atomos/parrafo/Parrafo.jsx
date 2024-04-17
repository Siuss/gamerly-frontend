import { StyleSheet, Text } from 'react-native';
import {Color} from "../../../estilos/colores"

export default function Parrafo(parametros) {
  return (
    <Text style={[styles[parametros.variante],parametros.subrayado && styles.subrayado]}>{parametros.children}</Text>
  );
}

const styles = StyleSheet.create({
  blancoM: {
    color:Color.blanco,
    fontSize:16
  },

  blancoS: {
    color:Color.blanco,
    fontSize:14
  },

  grisS: {
    color:Color.gris,
    fontSize:11,
  },

  subrayado:{
    textDecorationLine:"underline"
  }
});