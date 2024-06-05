import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { Color } from "../../estilos/colores";



export const CardJuegos = (props) => {
  const { style, imagenFondo, tituloJuego, plataformaJuego } = props;

  return (
    <ImageBackground source={imagenFondo} style={[styles.card, props.style]}>
      <View style={styles.info}>
        {/* <Image source={foto} style={styles.image} /> */}
        <Text style={styles.tituloJuego}>{tituloJuego}</Text>
        <Text style={styles.plataformaJuego}>{plataformaJuego}</Text>
      </View>
      <TouchableOpacity style={styles.boton}>
        <Text style={styles.botonTexto}>Unirme</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Color.primario,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",  // Propiedad equivalente a object-fit: cover
  },
  info: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    flex: 1,
  },
  tituloJuego: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  plataformaJuego: {
    color: "white",
    fontSize: 14,
  },
  boton: {
    backgroundColor: Color.acento, // me falta el color exacto
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  botonTexto: {
    color: "white",
    fontWeight: "bold",
  },
});