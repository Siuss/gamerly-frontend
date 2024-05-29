import { StyleSheet, View } from "react-native";
import { CardAmigo } from "./CardAmigo"

export const ListaDeAmigos = (props) => {
  const { style, amigos, ...restProps } = props;

  return (
    <View style={[styles.container, style]} {...restProps}>
      {amigos.map((amigo) => (
        <CardAmigo
          key={amigo.nombreUsuario}
          style={styles.card}
          foto={amigo.foto}
          nombreUsuario={amigo.nombreUsuario}
          plataforma={amigo.plataforma}
          juego={amigo.juego}
          onBloquear={() => console.log(`Bloquear ${amigo.nombreUsuario}`)}
          onBorrar={() => console.log(`Borrar ${amigo.nombreUsuario}`)}
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
