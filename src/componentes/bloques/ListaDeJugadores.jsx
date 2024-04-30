import { StyleSheet, View } from "react-native";
import { Card } from "./Card";

export const ListaDeJugadores = (props) => {
  const { style, ...restProps } = props;

  return (
    <View style={[styles.contenedor, style]} {...restProps}>
      {props.jugadores.map((jugador) => (
        <Card
          key={jugador.nombreUsuario}
          style={styles.card}
          foto={jugador.foto}
          nombreUsuario={jugador.nombreUsuario}
          plataforma={jugador.plataforma}
          juego={jugador.juego}
          amigos={jugador.amigos}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "center",
  },
  card: {
    width: "80%",
  },
});
