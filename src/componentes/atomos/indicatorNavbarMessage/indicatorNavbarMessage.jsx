import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Color } from "../../../estilos/colores";

export const IndicatorNavbarMesassage = ({ cantidad }) => {
  if (!cantidad || cantidad === 0) return null;

  return (
    <View style={styles.burbuja}>
      <Text style={styles.texto}>{cantidad}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  burbuja: {
    backgroundColor: Color.secundario, // Color de la burbuja
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -5,
    right: -5,
  },
  texto: {
    color: Color.blanco, // Color del texto
    fontSize: 12,
    fontWeight: "bold",
  },
});