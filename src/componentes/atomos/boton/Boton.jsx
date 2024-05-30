import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Color } from "../../../estilos/colores";
import { Parrafo } from "../parrafo/Parrafo";

export const Boton = (props) => {
  const { style, textStyle, variante = "primario", ...restProps } = props;
  return (
    <TouchableOpacity
      style={[styles.boton, styles[variante], style]}
      {...restProps}
    >
      <Text style={[styles.texto, textStyle]}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 32,
    width: "fit-content",
  },
  texto: {
    color: Color.blanco,
    fontSize: 16,
  },
  acento: {
    backgroundColor: Color.acento,
  },
  gris: {
    backgroundColor: "#606D5D",
  },
  primario: {
    backgroundColor: Color.primario,
  },
  secundario: {
    backgroundColor: Color.secundario,
  },
  link: {
    // Vacio a proposito, si hace falta mas adelante se pueden agregar estilos
  },
  transparente: {
    // Vacio a proposito, si hace falta mas adelante se pueden agregar estilos
  },
});
