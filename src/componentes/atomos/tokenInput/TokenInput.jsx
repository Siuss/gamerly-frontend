import React, { useRef, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TextInput, View } from "react-native";
import { Color } from "../../../estilos/colores";

export const TokenInput = ({ digitos = 6, onChangeText, style, ...props }) => {
  const inputsRef = useRef([]);
  const [codigo, setCodigo] = useState("");
  const navigation = useNavigation();
  const { params: email } = navigation.getState().routes.at(-1);

  const handleChangeText = (texto, index) => {
    const textoNumerico = texto.replace(/[^0-9]/g, "");

    setCodigo((prevCodigo) => {
      let nuevoCodigo;
      if (!texto) {
        //Significa que borro
        nuevoCodigo = codigo.substring(0, index) + codigo.substring(index + 1);

        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
        }

        return nuevoCodigo;
      }

      nuevoCodigo = prevCodigo + textoNumerico.toString();

      if (index < digitos - 1) {
        inputsRef.current[nuevoCodigo.length]?.focus();
      }

      return nuevoCodigo;
    });
  };

  const handleInputPress = (index) => {
    // Si presionaste cualquier campo anterior al actual
    if (index < codigo.length) {
      // Movemos el foco al campo inmediatamente anterior al actual
      const anterior = codigo.length === 0 ? 0 : codigo.length - 1;
      // eslint-disable-next-line no-undef
      setTimeout(() => inputsRef.current[anterior].focus(), 0);
    } else {
      // Movemos el foco al campo actual
      // eslint-disable-next-line no-undef
      setTimeout(() => inputsRef.current[codigo.length].focus(), 0);
    }
  };

  useEffect(() => {
    onChangeText(codigo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codigo]);

  return (
    <View style={[styles.tokenInput, style]} {...props}>
      {[...Array(digitos).keys()].map((key, index) => (
        <TextInput
          ref={(elemento) => (inputsRef.current[index] = elemento)}
          style={styles.input}
          key={key}
          keyboardType="numeric"
          onChangeText={(texto) => handleChangeText(texto, index)}
          onPress={() => handleInputPress(index)}
        />
      ))}
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
