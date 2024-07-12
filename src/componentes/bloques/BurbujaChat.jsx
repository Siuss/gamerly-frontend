// MessageBubble.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { Color } from "../../estilos/colores";
import { Parrafo } from "../atomos/parrafo/Parrafo";

export const BurbujaChat = ({ mensaje, fecha, esPropio }) => {
  return (
    <View
      style={[
        styles.contenedor,
        esPropio ? styles.propioMensaje : styles.otroMensaje,
      ]}
    >
      <Parrafo>{mensaje}</Parrafo>
      <Parrafo style={esPropio ? styles.propioFecha : styles.otroFecha}variante="grisSuaveXS">{fecha}</Parrafo>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  propioMensaje: {
    backgroundColor: Color.secundario,
    alignSelf: "flex-end",
  },
  otroMensaje: {
    backgroundColor: Color.primario,
    alignSelf: "flex-start",
  },
  propioFecha: {
    alignSelf: 'flex-end'
  },
  otroFecha: {
    alignSelf: 'flex-start'
  }
});
