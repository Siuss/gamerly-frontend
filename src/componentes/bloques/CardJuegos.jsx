import React from "react";
import { StyleSheet, View, ImageBackground, TouchableOpacity } from "react-native";
import { Color } from "../../estilos/colores";
import { Boton } from "../atomos/boton/Boton"
import { Parrafo } from "../atomos/parrafo/Parrafo"
export const CardJuegos = (props) => {
  const { style, foto, juego, plataforma, onPress } = props;


  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
      <ImageBackground style={styles.image} source={{ uri: foto }}>
      </ImageBackground>
      <View style={styles.contenido}>
        <View style={styles.detalles}>
          <Parrafo variante="blancoS">{juego}</Parrafo>
          <Parrafo variante="blancoS">{plataforma}</Parrafo>
        </View>


      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    backgroundColor: Color.primario,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%"
  },
  contenido: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    padding: 16,
  },
  detalles:{
    display: 'flex',
    flexDirection: 'column'
  },
  image: {
    width: "100%",
    height: 150,
    alignSelf: "stretch"
  },
  botonTexto: {
    backgroundColor: Color.primario,
    borderColor: Color.blanco,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginVertical: 2,
    alignItems: "center",
    width: "100%", 
    marginLeft: "5%",
   
  },
});