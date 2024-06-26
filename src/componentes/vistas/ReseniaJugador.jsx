import React, { useState, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Slider from "@react-native-community/slider";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Boton } from "../atomos/boton/Boton";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { Color } from "../../estilos/colores";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import TextArea from "../atomos/TextArea/TextArea";
import { JugadoresService } from "../../services/JugadoresService";
import { ReseniaService } from "../../services/ReseniaService";
import useStore from "../../hooks/useStore";
import { Toast } from "toastify-react-native";

export const ReseniaJugador = () => {
  const route = useRoute();
  const { getIdUsuarioLogueado } = useStore()
  const { id: jugadorId } = route.params;

  const [jugador, setJugador] = useState({})
  const [puntaje, setPuntaje] = useState(0);
  const [comentario, setComentario] = useState("");


  const handlePuntajeChange = (puntajeRaw) => {
    const nuevoPuntaje = puntajeRaw === 0 ? undefined : puntajeRaw;
    setPuntaje(nuevoPuntaje);
  };

  const handleComentarioChange = (nuevoComentario) => {
    setComentario(nuevoComentario)
  }

  const handleEnviarResenia = async () => {
    try {
      const usuarioLogueadoId = await getIdUsuarioLogueado()
      const resenia = { comentario, puntaje }

      await ReseniaService.enviarResenia(usuarioLogueadoId, jugadorId, resenia)
    } catch (error) {
      console.log(error)
      Toast.error("Error inesperado intenta mas tarde")
    }
  }

  useFocusEffect(
    useCallback(() => {
      const traerPerfil = async () => {
        try {
          const perfilJugador = await JugadoresService.getPerfilUsuario(jugadorId)
          setJugador(perfilJugador)
        } catch (error) {
          Toast.error("Error inesperado intenta mas tarde")
        }
      }

      if (!jugadorId) return

      traerPerfil()

      return () => {
        setJugador({})
      };
    }, [jugadorId])
  );

  return (
    <View style={styles.container}>
      <View>
        <FotoDePerfil
          src={jugador.foto || ''}
          height={64}
          width={64}
        ></FotoDePerfil>
        <Parrafo variante="blancoM">{jugador.nombre}</Parrafo>
      </View>
      <View style={styles.espaciador}>
        <View style={styles.puntuacion}>
          <Parrafo variante="blancoM" style={styles.textoPuntuacion}>Puntuación:</Parrafo>
          <View style={styles.contenedorSlider}>
            <Slider
              onValueChange={handlePuntajeChange}
              style={styles.input}
              minimumValue={0}
              maximumValue={5}
              step={1}
            />
            <Parrafo style={styles.parrafoCentrado} variante="blancoM">
              {puntaje || 0}
            </Parrafo>
          </View>
        </View>
        <View style={styles.espaciador}>
          <Parrafo style={styles.dejarResenia} variante="blancoM">Dejar una reseña:</Parrafo>
          <TextArea onChangeText={handleComentarioChange} placeholder="Deja tu mensaje" />
        </View>
      </View>

      <View style={styles.botonera}>
        <Boton variante="primario" onPress={handleEnviarResenia}>
          Enviar
        </Boton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.neutro,
    width: "100%",
    height: "100%",
    paddingVertical: 12,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  barraBusqueda: {
    padding: 0,
  },
  botonera: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 32,
  },
  contenedorSlider: {
    padding: 16,
    width: "75vw",
  },
  input: {
    width: "100%",
  },
  espaciador: {
    paddingVertical: 3,
  },
  parrafoCentrado: {
    textAlign: "center",
  },
  puntuacion: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  dejarResenia: {
    marginBottom: "16px",
  },
  textoPuntuacion: {
    marginTop: "12px",
  },
});
