import React, { useCallback, useState, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Color } from "../../estilos/colores";
import { Divisor } from "../atomos/divisor/Divisor";
import { BotonFlotante } from "../atomos/botonFlotante/BotonFlotante";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { ListaDePildoras } from "../bloques/ListaDePildoras";
import { CardResenia } from "../bloques/CardResenia";
import { Boton } from "../atomos/boton/Boton";
import { SesionService } from "../../services/SesionService";
import useStore from "../../hooks/useStore";
import { Toast } from "react-native-toast-message";
import { getUsuarioLogueadoId } from "../../utils/usuarioLogueado";
import { TablaHorarios } from "../bloques/TablaHorarios";
import { getHorariosPreferidos } from "../../utils/diasMapper";
import { rutas } from "../rutas/rutas";
import { ReseniaService } from "../../services/ReseniaService";

export const VistaMiPerfil = () => {
  const route = useRoute();
  const [posicionAnteriorScroll, setPosicionAnteriorScroll] = useState(0);
  const [direccionScroll, setDireccionScroll] = useState("arriba");
  const [perfil, setPerfil] = useState({});
  const [reseniasPendientes, setReseniasPendientes] = useState([]);
  const { logout } = useStore();
  const { id } = route.params;

  const navigation = useNavigation();

  const tieneReseniasPendientes = useMemo(
    () => reseniasPendientes.length > 0,
    [reseniasPendientes]
  );

  const traerPerfil = async () => {
    const idUsuarioLogueado = await getUsuarioLogueadoId();

    try {
      if (idUsuarioLogueado === undefined) {
        throw new Error(
          "El usuario no está autenticado o el userId no está disponible"
        );
      }
      const infoPerfil = await SesionService.obtenerDetalleUsuario(
        idUsuarioLogueado
      );

      setPerfil(infoPerfil);
    } catch {
      Toast.error("Error inesperado intentalo mas tarde");
    }
  };

  const traerReseniasPendientes = async () => {
    const idUsuarioLogueado = await getUsuarioLogueadoId();
    const resenias = await ReseniaService.getReseniasPendientes(
      idUsuarioLogueado
    );
    setReseniasPendientes(resenias);
  };

  useFocusEffect(
    useCallback(() => {
      if (!id) return;

      traerPerfil();
      traerReseniasPendientes();
    }, [id])
  );

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

    if (Math.abs(desplazamiento) < 5) {
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
  };

  const handleVerReseniasPendientes = () => {
    navigation.navigate(rutas.reseniasPendientes);
  };

  const handleLogout = async () => {
    await logout();
    setPerfil({});
    navigation.navigate(rutas.login);
  };

  const handleEliminarCuenta = async () => {
    await SesionService.eliminarCuenta(id);
    await handleLogout();
  };

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
            <ListaDePildoras
              disabled
              items={
                perfil.plataformas
                  ? perfil.plataformas.map((plataforma, index) => ({
                      id: index,
                      contenido: plataforma,
                    }))
                  : []
              }
            />
          </View>

          <Parrafo variante="grisS" style={styles.descripcionplataformas}>
            Mis Juegos
          </Parrafo>
          <View style={styles.pildora1}>
            <ListaDePildoras
              disabled
              items={
                perfil.juegosPreferidos
                  ? perfil.juegosPreferidos.map((juego, index) => ({
                      id: index,
                      contenido: juego,
                    }))
                  : []
              }
            />
          </View>
          <View style={styles.conatainerEditarJuego}>
            <Parrafo variante="grisS" style={styles.descripcionplataformas}>
              Mis Horarios
            </Parrafo>
          </View>
          <View style={styles.containerTable}>
            {perfil.diasHorariosPreferidos && (
              <TablaHorarios
                horarios={getHorariosPreferidos(perfil.diasHorariosPreferidos)}
                onHorarioChange={onHorarioChange}
              />
            )}
          </View>

          <View style={styles.reseniasHeader}>
            <Parrafo variante="grisS" style={styles.descripcionplataformas}>
              Mis Reseñas
            </Parrafo>

            {tieneReseniasPendientes && (
              <Boton
                style={styles.reseniasPendientes}
                variante="link"
                subrayado
                textStyle={styles.textoReseniasPendientes}
                onPress={handleVerReseniasPendientes}
              >
                Reseñas pendientes
              </Boton>
            )}
          </View>

          {perfil.resenias && (
            <>
              {perfil.resenias.slice(0, 3).map((resenia, index) => (
                <CardResenia
                  key={index}
                  style={styles.cardResenia}
                  puntaje={resenia.puntaje}
                  foto={resenia.foto}
                  resenia={resenia.comentario}
                />
              ))}

              {perfil.resenias.length > 3 && (
                <View style={styles.verMas}>
                  <Boton variante="link" onPress={handleVerMasClick}>
                    Ver mas
                  </Boton>
                </View>
              )}
            </>
          )}
        </View>
        <View style={styles.botonesSesion}>
          <Divisor />
          <Boton variante="transparente" onPress={handleEliminarCuenta}>
            Eliminar Cuenta
          </Boton>
          <Divisor />
          <Boton variante="transparente" onPress={handleLogout}>
            Cerrar Sesion
          </Boton>
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
    backgroundColor: Color.secundario,
    position: "absolute",
    right: 16,
    bottom: 32,
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
  reseniasHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reseniasPendientes: {
    paddingRight: 0,
  },
  textoReseniasPendientes: {
    color: Color.gris,
  },
  cardResenia: {
    marginBottom: 16,
  },
  verMas: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 16,
  },
  botonesSesion: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  },
});
