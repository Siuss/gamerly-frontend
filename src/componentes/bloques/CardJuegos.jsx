import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { Color } from "../../estilos/colores";
import { Gradiente } from "../atomos/gradiente/Gradiente"
import { Boton } from "../atomos/boton/Boton"
import { Parrafo } from "../atomos/parrafo/Parrafo"

export const CardJuegos = (props) => {
  const { style, foto, juego, plataforma } = props;

  return (
    <View style={[styles.card, style]}>
      <ImageBackground style={styles.image} source={{ uri: foto }}>
        <Gradiente style={styles.gradiente} variante="gradienteVerticalComunidad" />
      </ImageBackground>
      <View style={styles.contenido}>
        <View style={styles.detalles}>
          <Parrafo variante="blancoS">{juego}</Parrafo>
          <Parrafo variante="blancoS">{plataforma}</Parrafo>
        </View>
        <Boton variante="acento">Unirme</Boton>
      </View>
    </View>
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
  gradiente: {
    height: "100%"
  },
  botonTexto: {
    color: "white",
    fontWeight: "bold",
  },
});