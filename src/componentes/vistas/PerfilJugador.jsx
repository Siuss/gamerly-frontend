import { ScrollView, StyleSheet, View } from "react-native";
import { Boton } from "../atomos/boton/Boton";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Pildora } from "../atomos/pildora/Pildora";
import { ModalAgregarAmigo } from "../bloques/ModalAgregarAmigo";
import { CardFotoPerfil } from "../bloques/CardFotoPerfil";
import { ListaDePildoras } from "../bloques/ListaDePildoras";
import { Color } from "../../estilos/colores";
import diasDeLaSemana from "../../data/dias.json";
import momentos from "../../data/momentosDelDia.json";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from 'react'
import { JugadoresService } from "../../services/JugadoresService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { rutas } from "../rutas/rutas";
import { SolicitudService } from "../../services/SolicitudService";
import { Toast } from 'toastify-react-native'


export const PerfilJugador = (props) => {
  const [perfilInfo, setPerfilInfo] = useState(null)
  const [usuarioLogueado, setusuarioLogueado] = useState(null)
  const [esAmigoDelUsuarioLogueado, setEsAmigoDelUsuarioLogueado] = useState(false)
  const [modalAgregarAmigoEsVisible, setModalAgregarAmigoEsVisible] = useState(false)
  const [tieneSolicitudPendiente, setTieneSolicitudPendiente] = useState(false)

  const navigation = useNavigation();

  const { params: id } = navigation.getState().routes.at(-1);

  const juegaEnAlgunMomentoDeEsteDia = (diaDeLaSemana) =>
    perfilInfo.horarios?.[diaDeLaSemana]?.some((momento) => momento);

  const handleOnVerReseniasClick = () => {
    navigation.navigate("resenias", { id });
  };

  const handleEscribirResenia = () => {
    navigation.navigate(rutas.reseniaJugador, { id });
  }

  const handleAgregarAmigo = () => {
    setModalAgregarAmigoEsVisible(true)
  }

  const handleOcultarModal = async () => {
    setModalAgregarAmigoEsVisible(false)
    await chequearSolicitudDeAmistad()
  }

  // Vamos a chequear si el usuario tiene una solicitud
  // de amistad pendiente para saber si habilitar el
  // boton de agregar como amigo
  const chequearSolicitudDeAmistad = async () => {
    if (!usuarioLogueado?.id || !id) return

    try {
      await SolicitudService.getSolicitudPendiente(usuarioLogueado.id, id)

      // Si no fallo es que devolvio un 200 y encontro la solicitud, asi que actualizamos el estado
      setTieneSolicitudPendiente(true)
    } catch (error) {
      // Ignoramos los errores
    }
  }

  useFocusEffect(useCallback(() => {
    const traerUsuario = async () => {
      const perfil = await JugadoresService.getPerfilUsuario(id)

      try {
        setPerfilInfo(perfil)

        const idUsuarioLogueado = JSON.parse(await AsyncStorage.getItem("usuario")).id
        const usuario = await JugadoresService.getPerfilUsuario(idUsuarioLogueado)
        setusuarioLogueado(usuario)


        const amigos = await JugadoresService.getAmigosDelUsuario(idUsuarioLogueado)
        const esAmigoDelUsuarioLogueado =amigos.some(amigo => amigo.id === id)
        setEsAmigoDelUsuarioLogueado(esAmigoDelUsuarioLogueado)
      } catch (error) {
        Toast.error("Error inesperado intentalo mas tarde")
      }
    }

    traerUsuario()
  },
    [usuarioLogueado?.id, id],
  ))

  useFocusEffect(useCallback(() => {
    chequearSolicitudDeAmistad()
  },
    [usuarioLogueado?.id, id],
  ))


  if (!perfilInfo) return <></>

  return (
    <>
      <ModalAgregarAmigo idCreador={usuarioLogueado?.id} idAmigo={id} visible={modalAgregarAmigoEsVisible} onOcultar={handleOcultarModal} />
      <ScrollView style={styles.contenedor} {...props}>
        <CardFotoPerfil
          style={styles.cardFotoPerfil}
          nombreUsuario={perfilInfo.nombre}
          foto={perfilInfo.foto}
        />
        <View style={styles.cardDetalles}>
        {esAmigoDelUsuarioLogueado && <Parrafo variante="blancoM">
            Discord: {perfilInfo.discord}
          </Parrafo>}
          <Parrafo variante="blancoM">
            Nacionalidad: {perfilInfo.nacionalidad}
          </Parrafo>

          <Parrafo variante="blancoM">Edad: {perfilInfo.edad}</Parrafo>

          <Parrafo variante="blancoM">Plataforma:</Parrafo>
          <ListaDePildoras
            items={perfilInfo.plataformas.map((plataforma, index) => ({ id: index, contenido: plataforma }))}
            conBorde
            variante="conBorde"
          />

          <Parrafo variante="blancoM">Juegos:</Parrafo>
          <ListaDePildoras
            items={perfilInfo.juegosPreferidos.map((juego, index) => ({ id: index, contenido: juego }))}
            conBorde
            variante="conBorde"
          />

          <Parrafo variante="blancoM">Disponibilidad:</Parrafo>
          {diasDeLaSemana && <View style={styles.contenedorDisponibilidad}>
            {diasDeLaSemana.map(
              (diaDeLaSemana, diaIndex) =>
                juegaEnAlgunMomentoDeEsteDia(diaIndex) && (
                  <View key={diaDeLaSemana} style={styles.contenedorDias}>
                    <Pildora
                      style={styles.pildora}
                      conBorde
                      variante="secundario"
                    >
                      {diaDeLaSemana}
                    </Pildora>
                    {perfilInfo.horarios &&
                      <View style={styles.contenedorMomentos}>
                        {perfilInfo.horarios?.[diaIndex].map(
                          (momento, momentoIndex) =>
                            momento && (
                              <Pildora
                                key={momentos[momentoIndex]}
                                conBorde
                                variante="conBorde"
                              >
                                {momentos[momentoIndex]}
                              </Pildora>
                            )
                        )}
                      </View>}
                  </View>
                )
            )}
          </View>}
        </View>
        <View style={styles.contenedorBotones}>
          {!esAmigoDelUsuarioLogueado && (
            <Boton
              onPress={handleAgregarAmigo}
              style={[tieneSolicitudPendiente && styles.deshabilitado, styles.boton]}
              textStyle={styles.textoBoton}
              variante="secundario"
              disabled={tieneSolicitudPendiente}>
              {tieneSolicitudPendiente ? "Solicitud pendiente" : "Añadir amigo"}
            </Boton>
          )}
          <Boton
            style={styles.boton}
            textStyle={styles.textoBoton}
            variante="primario"
            onPress={esAmigoDelUsuarioLogueado ? handleEscribirResenia : handleOnVerReseniasClick}
          >
            {esAmigoDelUsuarioLogueado ? "Escribir reseña" : "Ver reseñas"}
          </Boton>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: Color.neutro,
    padding: 16,
    width: "100%",
    height: "100%",
    flex: 1,
  },
  cardFotoPerfil: {
    width: "100%",
    marginBottom: 16,
  },
  cardDetalles: {
    width: "100%",
    borderRadius: 10,
    padding: 16,
    marginBottom: 48,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    backgroundColor: Color.primario,
  },
  pildora: {
    marginBottom: 8,
  },
  contenedorDisponibilidad: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  contenedorDias: {
    marginBottom: 8,
  },
  contenedorMomentos: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  contenedorBotones: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  boton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deshabilitado: {
    opacity: 0.4
  },
  textoBoton: {
    textAlign: "center",
  },
});
