// src/componentes/CardMessage.jsx
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Color } from "../../estilos/colores";

export const CardMessage = ({ style, name, message, onMessageClick, ...restProps }) => {
  return (
    <TouchableOpacity onPress={onMessageClick} style={[styles.card, style]} {...restProps}>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Color.primario,
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    color: Color.blanco,
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 16,
  },
  message: {
    color: Color.blanco,
    fontSize: 13,
  },
});
