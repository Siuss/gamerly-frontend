import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Color } from "../../../estilos/colores";

const digitos = 6;

export const TokenInput = ({ onChangeText, style, ...props }) => {
  const inputsRef = useRef([]);
  const [codigo, setCodigo] = useState(new Array(digitos).fill(""));

  const handleChangeText = (texto, index) => {
    const textoNumerico = texto.replace(/[^0-9]/g, "");

    setCodigo((prevCodigo) => {
      const nuevoCodigo = prevCodigo;
      nuevoCodigo[index] = textoNumerico.toString();
      return nuevoCodigo;
    });

    if (!texto) {
      if (index === 0) return;
      inputsRef.current[index - 1]?.focus();
    } else if (index < digitos - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    onChangeText(codigo.join(''));
  };

  const handleInputPress = (index) => {
    const codigoFinal = codigo?.join("") || "";

    // Si presionaste cualquier campo anterior al actual
    if (index < codigoFinal.length) {
      // Movemos el foco al campo inmediatamente anterior al actual
      const anterior = codigoFinal.length === 0 ? 0 : codigoFinal.length - 1;
      // eslint-disable-next-line no-undef
      setTimeout(() => inputsRef.current[anterior]?.focus(), 0);
    } else {
      // Movemos el foco al campo actual
      // eslint-disable-next-line no-undef
      setTimeout(() => inputsRef.current[codigoFinal.length]?.focus(), 0);
    }
  };

  return (
    <View style={[styles.tokenInput, style]} {...props}>
      <TextInput
        ref={(elemento) => (inputsRef.current[0] = elemento)}
        style={styles.input}
        value={codigo[0]}
        keyboardType="numeric"
        onChangeText={(texto) => handleChangeText(texto, 0)}
        onPress={() => handleInputPress(0)}
        maxLength={1}
      />
      <TextInput
        ref={(elemento) => (inputsRef.current[1] = elemento)}
        style={styles.input}
        value={codigo[1]}
        keyboardType="numeric"
        onChangeText={(texto) => handleChangeText(texto, 1)}
        onPress={() => handleInputPress(1)}
        maxLength={1}
      />
      <TextInput
        ref={(elemento) => (inputsRef.current[2] = elemento)}
        style={styles.input}
        value={codigo[2]}
        keyboardType="numeric"
        onChangeText={(texto) => handleChangeText(texto, 2)}
        onPress={() => handleInputPress(2)}
        maxLength={1}
      />
      <TextInput
        ref={(elemento) => (inputsRef.current[3] = elemento)}
        style={styles.input}
        value={codigo[3]}
        keyboardType="numeric"
        onChangeText={(texto) => handleChangeText(texto, 3)}
        onPress={() => handleInputPress(3)}
        maxLength={1}
      />
      <TextInput
        ref={(elemento) => (inputsRef.current[4] = elemento)}
        style={styles.input}
        value={codigo[4]}
        keyboardType="numeric"
        onChangeText={(texto) => handleChangeText(texto, 4)}
        onPress={() => handleInputPress(4)}
        maxLength={1}
      />
      <TextInput
        ref={(elemento) => (inputsRef.current[5] = elemento)}
        style={styles.input}
        value={codigo[5]}
        keyboardType="numeric"
        onChangeText={(texto) => handleChangeText(texto, 5)}
        onPress={() => handleInputPress(5)}
        maxLength={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tokenInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  input: {
    flex: 1,
    padding: 16,
    aspectRatio: 1,
    color: Color.secundario,
    textAlignVertical: "top",
    textAlign: "center",
    fontSize: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Color.secundario,
  },
});
