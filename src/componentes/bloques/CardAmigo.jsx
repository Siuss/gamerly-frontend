import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Color } from "../../estilos/colores";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Boton } from "../atomos/boton/Boton";

export const CardAmigo = (props) => {
  const {
    bloqueado,
    style,
    foto,
    nombreUsuario,
    plataforma,
    juego,
    onAmigoClick,
    onBloquear,
    onBorrar,
    onDesbloquear,
    ...restProps
  } = props;

  return (
    <TouchableOpacity
      onPress={onAmigoClick}
      style={[styles.card, style]}
      {...restProps}
    >
      <FotoDePerfil width={45} height={45} src={foto} />
      <View style={styles.info}>
        <Parrafo variante="blancoM" style={styles.nombreUsuario}>
          {nombreUsuario}
        </Parrafo>
        <Parrafo variante="blancoM" style={styles.texto}>
          {plataforma}
        </Parrafo>
        <Parrafo variante="blancoM" style={styles.texto}>
          {juego}
        </Parrafo>
      </View>
      <View style={styles.botones}>
        <Boton
          textStyle={styles.botonTexto}
          style={styles.boton}
          variante="transparente"
          outline="blanco"
          onPress={bloqueado ? onDesbloquear : onBloquear}
        >
          {bloqueado ? "Desbloquear" : "Bloquear"}
        </Boton>
        {!bloqueado && (
          <Boton
            textStyle={styles.botonTexto}
            style={styles.boton}
            variante="transparente"
            outline="blanco"
            onPress={onBorrar}
          >
            Borrar
          </Boton>
        )}
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
  texto: {
    color: Color.blanco,
    fontSize: 13,
  },
  nombreUsuario: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  botones: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: Color.primario,
    gap: 16,
  },
  boton: {
    paddingVertical: 6,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  botonTexto: {
    fontSize: 14,
    color: Color.blanco,
  },
});
