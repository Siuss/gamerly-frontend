import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Color } from "../../estilos/colores";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Puntuacion } from "../atomos/puntuacion/Puntuacion";
import {useNavigation} from "@react-navigation/native";
import { rutas } from "../rutas/rutas";

export const Card = (props) => {
  const { style, ...restProps } = props;
  const navigation = useNavigation()

  const handleCardClick = () => {
    navigation.navigate(rutas.perfilJugador, { id: props.id });
  };

  return (
      <View

          style={[styles.card, style]}

          {...restProps}
      >
        <TouchableOpacity style={styles.contenido} onPress={handleCardClick}>
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
                {props.amigos.length > 0 ? "Amigos en común:" : ""}
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
            <Puntuacion puntuacion={props.puntuacion} />
          </View>
        </TouchableOpacity>
      </View>

  );
};

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
});
