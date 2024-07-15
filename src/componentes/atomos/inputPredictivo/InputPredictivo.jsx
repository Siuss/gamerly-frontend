import React from "react";
import {
  TextInput,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { Color } from "../../../estilos/colores";
import { Parrafo } from "../parrafo/Parrafo";
import hexToRgba from "hex-to-rgba";

export const InputPredictivo = ({
  style,
  value,
  opciones,
  maximoOpciones = 6,
  onChangeText,
  onOpcionClick,
}) => {
  return (
    <View style={styles.contenedor}>
      <TextInput
        style={[styles.input, style]}
        value={value}
        onChangeText={(text) => onChangeText(text)}
      />
      {opciones.length > 0 && (
        <ScrollView contentContainerStyle={styles.contenedorOpciones}>
          {opciones.slice(0, maximoOpciones).map((opcion) => (
            <TouchableOpacity onPress={() => onOpcionClick(opcion)}>
              <Parrafo>{opcion.nombre}</Parrafo>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    marginVertical: 16
  },
  input: {
    borderWidth: 1,
    borderColor: Color.gris,
    borderRadius: 8,
    padding: 10,
    color: Color.blanco,
    marginBottom: 0,
  },
  contenedorOpciones: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: hexToRgba(Color.secundario, 0.4),
    gap: 16,
    padding: 8,
  },
});
