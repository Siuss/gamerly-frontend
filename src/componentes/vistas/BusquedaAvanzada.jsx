import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { Color } from "../../estilos/colores";

export const BusquedaAvanzada = (props) => {
  return (
    <View style={styles.container} {...props}>
      {/* TODO: Grupo de Atómos */}
      <Text>Esto es Busqueda Avanzada</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.neutro,
    width: "100%",
    height: "100%"
  },
});