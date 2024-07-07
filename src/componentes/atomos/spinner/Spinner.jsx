import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Color } from "../../../estilos/colores";

export const Spinner = ({ size = 64, style, ...props }) => (
  <View style={[styles.container, style]} {...props}>
    <ActivityIndicator size={size} color={Color.primario} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.neutro,
    justifyContent: "center",
  },
});
