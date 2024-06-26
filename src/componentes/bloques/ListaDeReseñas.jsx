import { StyleSheet, View } from "react-native";
import { CardResenia } from "./CardResenia";
import { CardFotoPerfil } from "./CardFotoPerfil";

export const ListaDeResenias = (props) => {
  const { style, foto, nombreUsuario, ...restProps } = props;

  return (
    <View style={[styles.container, style]} {...restProps}>
      <CardFotoPerfil
        foto={foto}
        nombreUsuario={nombreUsuario}
        style={styles.card}
      />
      {props.resenias.map((resenia) => (
        <CardResenia
          key={resenia.foto}
          style={styles.card}
          puntaje={resenia.puntaje}
          foto={resenia.foto}
          resenia={resenia.comentario}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "center",
    padding: "8px",
  },
  card: {
    width: "80%",
  },
});
