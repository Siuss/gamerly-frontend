import { Gradiente } from "../atomos/gradiente/Gradiente";
import { StyleSheet, View } from "react-native";
import { Color } from "../../estilos/colores";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import { Parrafo } from "../atomos/parrafo/Parrafo";

export const CardFotoPerfil = (props) => {
  const { style, nombreUsuario, foto, ...restProps } = props;
  return (
    <Gradiente
      variante="gradienteVertical"
      style={[styles.card, style]}
      {...restProps}
    >
      <View style={styles.contenidoArriba}>
        <FotoDePerfil width={60} height={60} src={foto} />
        <Parrafo variante="blancoM" style={styles.textoUsuario}>
          {nombreUsuario}
        </Parrafo>
      </View>
    </Gradiente>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Color.primario,
    padding: 16,
    borderRadius: 10,
  },
  textoUsuario: {
    color: Color.blanco,
    fontWeight: "bold",
    paddingTop: "0.5rem",
    fontSize: "medium",
  },
  contenidoArriba: {
    marginBottom: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
