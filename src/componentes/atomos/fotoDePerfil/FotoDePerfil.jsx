import { StyleSheet, Image } from 'react-native';
import {Color} from "../../../estilos/colores"

export default function FotoDePerfil(parametros) {
  return (
  <Image style={styles.image} source={{uri:parametros.src}}></Image>   
  );
}

//Cuando este en la card se cambia ancho y alto
const styles = StyleSheet.create({
  image: {
    width:100,
    height:100,
    borderRadius:100,
    borderWidth:4,
    borderColor:Color.acento
  },
});