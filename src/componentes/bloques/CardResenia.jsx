import { StyleSheet, Text, View } from "react-native";
import { Color } from "../../estilos/colores";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import Icons from "@expo/vector-icons/AntDesign";
import { Gradiente } from "../atomos/gradiente/Gradiente";

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
            <View style={styles.iconos}>
              {[...Array(puntaje).keys()].map((index) => (
                <Icons key={index} name="star" size={14} />
              ))}
            </View>
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
  iconos: {
    display: "flex",
    flexDirection: "row",
  },
  textoResenia: {
    marginLeft: 10,
  },
});
