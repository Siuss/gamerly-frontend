import { StyleSheet, View } from "react-native";
import { Color } from "../../estilos/colores";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Puntuacion } from "../atomos/puntuacion/Puntuacion";
import Icons from "@expo/vector-icons/AntDesign";
import { Gradiente } from "../atomos/gradiente/Gradiente";

export const Card = (props) => {
  const { style, ...restProps } = props;

  return (
    <Gradiente
      variante="gradienteHorizontal"
      style={[styles.card, style]}
      {...restProps}
    >
      <View style={styles.contenido}>
        <View style={styles.contenidoIzquierdo}>
          <View style={styles.datosPersonales}>
            <FotoDePerfil width={52} height={52} src={props.foto} />
            <View>
              <Parrafo variante="blancoM">{props.nombreUsuario}</Parrafo>
              <Parrafo variante="blancoXS">{props.plataforma}</Parrafo>
              <Parrafo variante="blancoXS">{props.juego}</Parrafo>
            </View>
          </View>
          <View style={styles.amigos}>
            <Parrafo
              style={styles.amigoTitle}
              variante="grisS"
              numberOfLines={1}
              subrayado
            >
              Amigos en comun:
            </Parrafo>
            <Parrafo
              numberOfLines={1}
              ellipsizeMode="tail"
              variante="grisS"
              subrayado
            >
              {props.amigos.map((amigo, index) =>
                index === props.amigos.length - 1 ? ` ${amigo}` : ` ${amigo},`
              )}
            </Parrafo>
          </View>
        </View>
        <View style={styles.contenidoDerecho}>
          <Puntuacion puntuacion={3} />
          <Icons
            style={styles.iconoFlecha}
            name="right"
            size={14}
            color={Color.blanco}
          ></Icons>
        </View>
      </View>
    </Gradiente>
  );
};

//Cuando este en la card se cambia ancho y alto
const styles = StyleSheet.create({
  amigos: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "50vw",
  },
  amigoTitle: {
    minWidth: "fit-content",
  },
  card: {
    //TODO: Hacer gradiente
    backgroundColor: Color.primario,
    padding: 16,
    borderRadius: 10,
  },
  contenido: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  contenidoIzquierdo: {
    gap: 8,
  },
  datosPersonales: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  contenidoDerecho: {
    position: "relative",
  },
  iconoFlecha: {
    position: "absolute",
    right: 0,
    top: "40%",
  },
});
