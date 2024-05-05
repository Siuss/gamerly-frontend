import { StyleSheet, View } from "react-native";
import { Card } from "./Card";
import { Parrafo } from "../atomos/parrafo/Parrafo";

export const ListaDeJugadores = (props) => {
  const { style, ...restProps } = props;

  const busquedaActiva = props.searchText != ""

  return (
    <>
    {busquedaActiva ? 
      <View style={[styles.container, style]} {...restProps}>
        {props.jugadores.filter(jugador => jugador.nombreUsuario.toUpperCase().includes(props.searchText.toUpperCase()))
        .map((jugador) => (
          <Card
            style={styles.card}
            foto={jugador.foto}
            nombreUsuario={jugador.nombreUsuario}
            plataforma={jugador.plataforma}
            juego={jugador.juego}
            amigos={jugador.amigos}
          />
        ))}
      </View>
    : 
      <>
        <Parrafo style={styles.text} variante="blancoM">Jugadores sugeridos:</Parrafo>
        <View style={[styles.container, style]} {...restProps}>
          {props.jugadores.map((jugador) => (
            <Card
              style={styles.card}
              foto={jugador.foto}
              nombreUsuario={jugador.nombreUsuario}
              plataforma={jugador.plataforma}
              juego={jugador.juego}
              amigos={jugador.amigos}
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
    padding: "8px"
  },
  card: {
    width: "80%",
  },
  text: {
    width: "80%",
    alignSelf: "center"
  }
});
