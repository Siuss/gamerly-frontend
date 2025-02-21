import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Color } from "../../../estilos/colores";

export const IndicatorMessage= ({ cantidad }) => {
  return (
    <View style={styles.burbuja}>
      <Text style={styles.texto}>{cantidad}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  burbuja: {
    backgroundColor: Color.googleButton, // Puedes cambiar el color según tu diseño
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    color: Color.blanco, // Color del texto
    fontSize: 12,
    fontWeight: "bold",
  },
});