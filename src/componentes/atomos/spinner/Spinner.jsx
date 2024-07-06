import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Color } from "../../../estilos/colores";

export const Spinner = () => (
  <View style={styles.container}>
    <ActivityIndicator size={64} color={Color.primario} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.neutro,
    flex: 1,
    justifyContent: "center",
  },
});
