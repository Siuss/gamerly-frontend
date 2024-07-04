import { StyleSheet, Text, View } from "react-native";
import { Color } from "../../estilos/colores";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import {Puntuacion} from "../atomos/puntuacion/Puntuacion";

export const CardResenia = (props) => {
  const { style, puntaje, foto, resenia, ...restProps } = props;

  return (
    <View
      style={[styles.card, style]}
      {...restProps}
    >
      <View>
        <View style={styles.contenidoArriva}>
          <Text style={styles.texto}>
            Reseña{" "}
            <Puntuacion puntuacion={puntaje}/>
          </Text>
        </View>
        <View style={styles.contenidoAbajo}>
          <FotoDePerfil width={30} height={30} src={foto} />
          <Parrafo variante="blancoM" style={styles.textoResenia}>
            {resenia}
          </Parrafo>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Color.primario,
    padding: 16,
    borderRadius: 10,
  },
  texto: {
    color: Color.blanco,
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  contenidoArriva: {
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  contenidoAbajo: {
    display: "flex",
    flexDirection: "row",
  },
  textoResenia: {
    flexShrink: 1,
    marginLeft: 10,
  },
  estrella: {
    color: Color.blanco
  }
});
