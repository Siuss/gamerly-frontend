import { StyleSheet, View } from "react-native";
import { CardAmigo } from "./CardAmigo"

export const ListaDeAmigos = (props) => {
          const { style, amigos, onAmigoClick, ...restProps } = props;

  return (
    <View style={[styles.container, style]} {...restProps}>
      {amigos.map((amigo) => (
        <CardAmigo
          key={amigo.nombre}
          style={styles.card}
          foto={amigo.foto}
          nombreUsuario={amigo.nombre}
          plataforma={amigo.plataformas[0]}
          juego={amigo.juegosPreferidos[0]}
          onBloquear={() => console.log(`Bloquear ${amigo.nombreUsuario}`)}
          onBorrar={() => console.log(`Borrar ${amigo.nombreUsuario}`)}
          onAmigoClick={() => onAmigoClick(amigo)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    padding: 8,
  },
  card: {
    width: "95%",
    marginBottom: 8,
  },
});
