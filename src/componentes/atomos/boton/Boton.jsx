import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { Color } from "../../../estilos/colores";

export const Boton = (props) => {
  const { style, textStyle, outline, disabled, subrayado, variante = "primario", ...restProps } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.boton, styles[variante], outline && styles.outline[outline], disabled && styles.disabled, style]}
      {...restProps}
    >
      <Text style={[styles.texto, subrayado && styles.subrayado, textStyle]} subrayado={subrayado}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  subrayado: {
    textDecorationLine: "underline",
  },
  boton: {
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 32
  },
  disabled: {
    opacity: 0.4
  },
  texto: {
    color: Color.blanco,
    fontSize: 16,
  },
  acento: {
    backgroundColor: Color.acento,
  },
  grisS: {
    color: Color.gris,
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
  outline: {
    acento: {
      borderWidth: 1,
      borderColor: Color.acento
    },
    gris: {
      borderWidth: 1,
      borderColor: "#606D5D"
    },
    primario: {
      borderWidth: 1,
      borderColor: Color.primario
    },
    secundario: {
      borderWidth: 1,
      borderColor: Color.secundario
    },
  },
  link: {
    // Vacio a proposito, si hace falta mas adelante se pueden agregar estilos
  },
  transparente: {
    // Vacio a proposito, si hace falta mas adelante se pueden agregar estilos
  },
});
