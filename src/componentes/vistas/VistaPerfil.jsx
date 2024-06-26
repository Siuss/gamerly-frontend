import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Color } from "../../estilos/colores";
import { Divisor } from "../atomos/divisor/Divisor";
import { BotonFlotante } from "../atomos/botonFlotante/BotonFlotante";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { ListaDePildoras } from "../bloques/ListaDePildoras";
import { CardResenia } from "../bloques/CardResenia";
import { Boton } from "../atomos/boton/Boton";
import { SesionService } from "../../services/SesionService"
import useStore from "../../hooks/useStore";
import { Toast } from "react-native-toast-message";
import { getUsuarioLogueadoId, getUsuarioLogueado } from "../../utils/usuarioLogueado";
import { TablaHorarios } from "../bloques/TablaHorarios"
import { getHorariosPreferidos } from '../../utils/diasMapper'

export const VistaPerfil = () => {
  const route = useRoute();
  const [posicionAnteriorScroll, setPosicionAnteriorScroll] = useState(0);
  const [direccionScroll, setDireccionScroll] = useState("arriba");
  const [perfil, setPerfil] = useState({});
  const { logout } = useStore()
  const [isLoading, setIsLoading] = useState(true);
  const { id } = route.params;

  const navigation = useNavigation();

  const traerPerfil = async () => {
    const idUsuarioLogueado = await getUsuarioLogueadoId()

    try {
      if (idUsuarioLogueado === undefined) {
        throw new Error("El usuario no está autenticado o el userId no está disponible");
      }
      console.log("Se traen los datos del perfil logueado:", idUsuarioLogueado);
      const infoPerfil = await SesionService.obtenerDetalleUsuario(idUsuarioLogueado)

      setPerfil(infoPerfil);

    } catch (error) {
      console.error("Error al traer los datos del perfil buscado:", error);
      Toast.error("Error inesperado intentalo mas tarde")
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (!id) return

      traerPerfil()
    }, [id])
  );



  const obtenerReseniasDeOtrosUsuarios = () => {
    if (!perfil.resenias) return [];
    const resenias = Array.isArray(perfil.resenias) ? perfil.resenias : [perfil.resenias];
    return resenias.filter((resenia) => resenia.nombre !== perfil.nombre);
  };

  const reseniasDeOtrosUsuarios = obtenerReseniasDeOtrosUsuarios();

  const onHorarioChange = (dia, momento) => {
    /* TODO: Decidir si se elimina,sirve para el editar

    const nuevosHorarios = [...horarios];
    nuevosHorarios[dia][momento] = !nuevosHorarios[dia][momento];

    setHorarios(nuevosHorarios);
    */
  };

  const handleScroll = (event) => {
    const nuevaPosicionScroll = event.nativeEvent.contentOffset.y;
    const desplazamiento = nuevaPosicionScroll - posicionAnteriorScroll;

    if (Math.abs(desplazamiento) < 3) {
      setPosicionAnteriorScroll(nuevaPosicionScroll);
      return;
    }

    const direccion =
      nuevaPosicionScroll > posicionAnteriorScroll ? "abajo" : "arriba";

    setPosicionAnteriorScroll(nuevaPosicionScroll);
    setDireccionScroll(direccion);
  };

  const handleVerMasClick = () => {
    navigation.navigate("resenias", { id });
    setShowNavBar(false)
  };

  const handleLogout = async () => {
    await logout()
    setPerfil({});
    navigation.navigate("login");
  }

  const handleEliminarCuenta = async () => {
    await SesionService.eliminarCuenta(id);
    await handleLogout();
  }
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        onScroll={handleScroll}
        scrollEventThrottle={8}
      >
        <View style={styles.informacionUsuario}>
          <View style={styles.fotoDePerfil}>
            <FotoDePerfil width={100} height={100} src={perfil.foto} />
          </View>
          <Divisor />
          <Parrafo variante="grisS" style={styles.descripcionUsuario}>
            {perfil.nombre}
          </Parrafo>
          <Divisor />
          <Parrafo variante="grisS" style={styles.descripcionUsuario}>
            {perfil.edad} Años
          </Parrafo>
          <Divisor />
          <Parrafo variante="grisS" style={styles.descripcionUsuario}>
            {perfil.nacionalidad}
          </Parrafo>
          <Divisor />
          <Parrafo variante="grisS" style={styles.descripcionUsuario}>
            {perfil.discord}
          </Parrafo>
          <Divisor />


          <Parrafo variante="grisS" style={styles.descripcionplataformas}>
            Mis Plataformas
          </Parrafo>
          <View style={styles.pildora1}>
            <ListaDePildoras items={perfil.plataformas ? perfil.plataformas.map((plataforma, index) => ({
              id: index,
              contenido: plataforma
            })) : []} />
          </View>

          <Parrafo variante="grisS" style={styles.descripcionplataformas}>
            Mis Juegos
          </Parrafo>
          <View style={styles.pildora1}>
            <ListaDePildoras items={perfil.juegosPreferidos ? perfil.juegosPreferidos.map((juego, index) => ({
              id: index,
              contenido: juego
            })) : []} />
          </View>
          <View style={styles.conatainerEditarJuego}>
            <Parrafo variante="grisS" style={styles.descripcionplataformas}>
              Mis Horarios
            </Parrafo>
          </View>
          <View style={styles.containerTable}>
            {perfil.diasHorariosPreferidos && <TablaHorarios
              horarios={getHorariosPreferidos(perfil.diasHorariosPreferidos)}
              onHorarioChange={onHorarioChange}
            />}

          </View>
          {reseniasDeOtrosUsuarios.map((resenia, index) => (
            <CardResenia
              key={index}
              puntaje={resenia.puntaje}
              foto={resenia.foto}
              resenia={resenia.comentario}
            />
          ))}
          <View style={styles.verMas}>
            <Boton variante="link" onPress={handleVerMasClick}>
              Ver mas
            </Boton>
          </View>
        </View>
        <View style={styles.botonesSesion}>
          <Divisor />
          <Boton variante="transparente" onPress={handleEliminarCuenta}>Eliminar Cuenta</Boton>
          <Divisor />
          <Boton variante="transparente" onPress={handleLogout}>Cerrar Sesion</Boton>
          <Divisor />
        </View>
      </ScrollView>
      {direccionScroll === "arriba" && (
        <BotonFlotante
          name="mode-edit-outline"
          label="Editar"
          style={styles.botonFlotante}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.neutro,
    width: "100%",
    height: "100%",
  },
  fotoDePerfil: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },

  informacionUsuario: {
    padding: 5,
  },

  descripcionUsuario: {
    textAlign: "center",
    marginTop: 15,
    marginBottom: 15,
    fontSize: 15,
  },

  descripcionplataformas: {
    textAlign: "left",
    marginTop: 15,
    marginBottom: 15,
    fontSize: 15,
  },

  conatainerEditarJuego: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 60,
  },

  botonFlotante: {
    position: "fixed",
    right: 16,
    bottom: 64,
  },
  botonAgregar: {
    backgroundColor: Color.acento,
  },
  botonConfirmar: {
    backgroundColor: Color.secundario,
  },
  pildora1: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    color: "blue",
  },
  containerTable: {
    marginBottom: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cardResenia: {
    marginTop: 16,
  },
  verMas: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 16,
  },
  botonesSesion: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  },
});
