import { StyleSheet, View } from "react-native";
import { Card } from "./Card";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { useMemo } from 'react'

export const ListaDeJugadores = ({ style, searchText, jugadores, mostrarSugeridos = true, ...restProps }) => {

  const busquedaActiva = searchText != ""

  const jugadoresFinal = useMemo(() => {
    if (busquedaActiva) {
      return jugadores.filter(jugador => jugador.nombreUsuario.toUpperCase().includes(searchText.toUpperCase()))
    } else {
      return jugadores
    }
  }, [jugadores])

  return (

    <>
      {!busquedaActiva && mostrarSugeridos && <Parrafo style={styles.text} variante="blancoM">Jugadores sugeridos:</Parrafo>}
      <View style={[styles.contenedor, style]} {...restProps}>
        {jugadoresFinal.map((jugador) => (
          <Card
            key={jugador.id}
            style={styles.card}
            id={jugador.id}
            foto={jugador.foto}
            nombreUsuario={jugador.nombre}
            plataforma={jugador.plataformas?.[0]}
            juego={jugador.juegosPreferidos?.[0]}
            amigos={jugador.amigos}
            puntuacion={jugador.reputacion}
          />
        ))}
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  contenedor: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "center",
    paddingVertical: 8,
    width: "100%"
  },
  card: {
    width: "100%",
  },
  text: {

    alignSelf: "flex-start"
  }
});
