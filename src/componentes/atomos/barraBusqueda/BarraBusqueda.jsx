import { StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { Color } from "../../../estilos/colores"

export default function BarraBusqueda(props) {
  return(
    <TextInput style={styles.input} value={props.text} onChangeText={props.onChangeText} placeholder="Busqueda"/>
  )
}

const styles = StyleSheet.create({
  input: {
    width:"50vw",
    minWidth:200,
    height:50,
    padding:15,
    color:Color.secundario,
    fontSize:16
  }
});