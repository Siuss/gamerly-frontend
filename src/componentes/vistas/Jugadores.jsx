import { useState, useCallback } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Color } from "../../estilos/colores";
import Busqueda from "../bloques/Busqueda";
import { JugadoresService } from "../../services/JugadoresService";
import { ListaDeJugadores } from "../bloques/ListaDeJugadores";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useToast } from "../../hooks/useToast";
import { Spinner } from "../atomos/spinner/Spinner";
import useStore from "../../hooks/useStore";
import useThemeStore from "../../hooks/useThemeStore";

export const Jugadores = () => {
  const { show } = useToast();
  const [jugadores, setJugadores] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const route = useRoute();
  const { getIdUsuarioLogueado } = useStore()
  const {theme} = useThemeStore()

  const params = route.params;

  const handleBusqueda = (busqueda) => {
    setBusqueda(busqueda);
  };

  const getFiltrosAdaptados = () => {
    const filtrosAdaptados = {
      dias: params.dias
        ? params.dias
            .filter((dia) => dia.juega)
            .map((dia) => dia.contenido.toUpperCase())
        : null,
      momentos: params.momentosDelDia
        ? params.momentosDelDia
            .filter((momento) => momento.juega)
            .map((momento) => momento.contenido.toUpperCase())
        : null,
      resenia: params?.resenia || null,
    };

    const filtrosFinales = {
      dias: filtrosAdaptados?.dias?.length > 0 ? filtrosAdaptados.dias : null,
      momentos:
        filtrosAdaptados?.momentos?.length > 0
          ? filtrosAdaptados.momentos
          : null,
      resenia: filtrosAdaptados.resenia,
    };

    return filtrosFinales;
  };

  const busquedaAvanzada = async () => {
    setCargando(true);
    try {
      const filtrosBusqueda = {
        ...getFiltrosAdaptados(),
        nombre: busqueda ? busqueda : null,
      };

      const listaJugadores = await JugadoresService.getJugadoresBusqueda(
        filtrosBusqueda,
        params.idJuego
      );

      const idUsuarioLogueado = await getIdUsuarioLogueado();
      const idsBloqueados = (
        await JugadoresService.getBloqueados(idUsuarioLogueado)
      ).map((jugador) => jugador.id);

      const jugadoresAdaptados = listaJugadores.filter(
        (jugador) =>
          jugador.id !== idUsuarioLogueado &&
          !idsBloqueados.includes(jugador.id)
      );

      setJugadores(jugadoresAdaptados);
    } catch {
      show("error", "Error inesperado intentalo mas tarde");
      setJugadores([]);
    } finally {
      setCargando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      busquedaAvanzada();

      return () => {
        setJugadores([]);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, busqueda])
  );

  return (
    <View style={[
          styles.containerExterior,
          { backgroundColor: theme === "dark" ? Color.neutro : Color.blanco }
        ]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Busqueda
          mostrarFiltro
          onChangeText={handleBusqueda}
          filtros={params}
        />

        {cargando && <Spinner style={styles.spinner} />}

        {!cargando &&
          (jugadores.length > 0 ? (
            <ListaDeJugadores
              jugadores={jugadores}
              searchText=""
              juego={params.juego}
            />
          ) : (
            <Text style={[{ color: theme === "dark" ? Color.gris : Color.neutro}]}>
              Parece que no hay usuarios que jueguen a ese juego
            </Text>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerExterior: {
    height: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    padding: 8,
  },
  spinner: {
    flex: 1,
  },
});
