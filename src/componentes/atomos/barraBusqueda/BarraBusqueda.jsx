import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Color } from "../../../estilos/colores"

export default function BarraBusqueda() {
  const [text, onChangeText] = useState('');

  return(
    <TextInput style={styles.input} onChangeText={onChangeText} value={text} placeholder="Busqueda"/>
  )
}

const styles = StyleSheet.create({
  input: {
    width:200,
    height:50,
    padding:15,
    color:Color.secundario,
    fontSize:16
  }
});