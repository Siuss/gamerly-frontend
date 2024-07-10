import { StyleSheet, Text, View } from "react-native";
import { Color } from "../../estilos/colores";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Puntuacion } from "../atomos/puntuacion/Puntuacion";
import Icons from "@expo/vector-icons/Octicons";

export const CardResenia = ({ style, puntaje, foto, resenia, verificada=false, ...props }) => {
  return (
    <View style={[styles.card, style]} {...props}>
      <View>
        <View style={styles.contenidoArriba}>
          <Text style={styles.texto}>
            Reseña <Puntuacion puntuacion={puntaje} />
          </Text>

          <Icons size={20} color={Color.blanco} style={styles.iconoVerificacion} name={verificada ? "verified" : "unverified"} />
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
  contenidoArriba: {
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
    color: Color.blanco,
  },
});
