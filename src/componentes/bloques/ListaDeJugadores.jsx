import { StyleSheet, View } from "react-native";
import { Card } from "./Card";
import { Parrafo } from "../atomos/parrafo/Parrafo";

export const ListaDeJugadores = (props) => {
  const { style, ...restProps } = props;

  const busquedaActiva = props.searchText != ""

  return (
    <>
    {busquedaActiva ? 
      <View style={[styles.contenedor, style]} {...restProps}>
        {props.jugadores.filter(jugador => jugador.nombreUsuario.toUpperCase().includes(props.searchText.toUpperCase()))
        .map((jugador) => (
          <Card
            key={jugador.id}
            style={styles.card}
            id={jugador.id}
            foto={jugador.foto}
            nombreUsuario={jugador.nombreUsuario}
            plataforma={jugador.plataforma}
            juego={jugador.juego}
            amigos={jugador.amigos}
            puntuacion={jugador.puntuacion}
          />
        ))}
      </View>
    : 
      <>
        <Parrafo style={styles.text} variante="blancoM">Jugadores sugeridos:</Parrafo>
        <View style={[styles.contenedor, style]} {...restProps}>
          {props.jugadores.map((jugador) => (
            <Card
              key={jugador.id}
              style={styles.card}
              id={jugador.id}
              foto={jugador.foto}
              nombreUsuario={jugador.nombreUsuario}
              plataforma={jugador.plataforma}
              juego={jugador.juego}
              amigos={jugador.amigos}
              puntuacion={jugador.puntuacion}
            />
          ))}
        </View>
      </>
    }
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "center",
    paddingVertical: 8,
  },
  card: {
    width: "100%",
  },
  text: {

    alignSelf: "flex-start"
  }
});
