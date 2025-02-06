import { useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Color } from "../../estilos/colores";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Puntuacion } from "../atomos/puntuacion/Puntuacion";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { rutas } from "../rutas/rutas";
import { JugadoresService } from "../../services/JugadoresService";
import { urlImagenPerfilDesconocido } from "../../utils/perfilDesconocido.js";
import { Spinner } from "../atomos/spinner/Spinner";
import { useToast } from "../../hooks/useToast";
import useStore from "../../hooks/useStore.jsx";

export const Card = ({
  amigos,
  juego,
  plataforma,
  puntuacion,
  nombreUsuario,
  foto,
  id,
  style,
  ...props
}) => {
  const { show } = useToast();
  const navigation = useNavigation();
  const [estaBloqueado, setEstaBloqueado] = useState(false);
  const [cargando, setCargando] = useState(true);
  const { getIdUsuarioLogueado } = useStore()

  const handleCardClick = () => {
    navigation.navigate(rutas.perfilJugador, id.toString());
  };

  const verificarEstaBloqueado = async () => {
    try {
      setCargando(true);
      const idUsuarioLogueado = await getIdUsuarioLogueado();
      const bloqueado = await JugadoresService.getUsuarioEstaBloqueado(
        idUsuarioLogueado,
        id
      );
      setEstaBloqueado(bloqueado);
    } catch {
      show("error", "Error inesperado intentalo mas tarde");
    } finally {
      setCargando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      verificarEstaBloqueado();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  return (
    <View style={[styles.card, style]} {...props}>
      {cargando && <Spinner color={Color.secundario} style={styles.spinner} />}
      {!cargando && (
        <TouchableOpacity style={styles.contenido} onPress={handleCardClick}>
          <View style={styles.contenidoIzquierdo}>
            <View style={styles.datosPersonales}>
              <FotoDePerfil
                width={52}
                height={52}
                src={estaBloqueado ? urlImagenPerfilDesconocido : foto}
              />
              <View style={styles.info}>
                <Parrafo variante="blancoM">{nombreUsuario}</Parrafo>
                {!estaBloqueado && (
                  <Parrafo variante="blancoXS">{plataforma}</Parrafo>
                )}
                {!estaBloqueado && (
                  <Parrafo variante="blancoXS">{juego}</Parrafo>
                )}
              </View>
            </View>
            {amigos?.length > 0 && (
              <View style={styles.amigos}>
                <Parrafo variante="grisXS" numberOfLines={1} subrayado>
                  Amigos en común:
                </Parrafo>
                <Parrafo
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  variante="grisXS"
                  subrayado
                >
                  {amigos.map((amigo, index) =>
                    index === amigos.length - 1 ? ` ${amigo}` : ` ${amigo},`
                  )}
                </Parrafo>
              </View>
            )}
          </View>
          {!estaBloqueado && <Puntuacion puntuacion={puntuacion} />}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  amigos: {
    display: "flex",
    flexDirection: "row",
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
  info: {
    justifyContent: "center",
  },
  spinner: {
    backgroundColor: Color.primario
  }
});
