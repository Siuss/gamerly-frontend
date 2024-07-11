import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Color } from "../../estilos/colores";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";

export const CardChat = ({
  style,
  id,
  foto,
  nombre,
  ultimoMensaje,
  onChatClick,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={() => onChatClick(id)}
      style={[styles.card, style]}
      {...props}
    >
      <FotoDePerfil src={foto} width={64} height={64} />

      <View style={styles.contenido}>
        <Parrafo variante="blancoM">{nombre}</Parrafo>
        {ultimoMensaje && <Parrafo variante="grisS" numberOfLines={1} ellipsizeMode='tail'>{ultimoMensaje}</Parrafo>}
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
    gap: 16,
  },
  contenido: {
    flex: 1,
    justifyContent: "center",
  },
});
