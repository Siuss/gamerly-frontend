import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Color } from "../../estilos/colores";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import { Parrafo } from "../atomos/parrafo/Parrafo";

export const CardAmigo = (props) => {
  const { style, foto, nombreUsuario, plataforma, juego, onBloquear, onBorrar, ...restProps } = props;

  return (
    <View style={[styles.card, style]} {...restProps}>
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
        <TouchableOpacity style={styles.boton} onPress={onBloquear}>
          <Text style={styles.botonTexto}>Bloquear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.boton} onPress={onBorrar}>
          <Text style={styles.botonTexto}>Borrar</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  },
  boton: {
    backgroundColor: Color.primario,
    borderColor: Color.blanco,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginVertical: 2,
    alignItems: "center",
    width: "145%", 
    marginLeft: "-40%", 
    
  },
  botonTexto: {
    color: Color.blanco,
  },
});
