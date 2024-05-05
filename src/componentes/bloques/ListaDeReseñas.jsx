import { StyleSheet, View} from "react-native"
import { CardResenia } from "./CardResenia"
import {CardFotoPerfil} from "./CardFotoPerfil";

export const ListaDeResenias = (props) => {
  const { style, foto, nombre, ...restProps } = props;

  return (
    <View style={[styles.container, style]} {...restProps}>
      <CardFotoPerfil foto={foto} nombre={nombre} style={styles.card}/>
      {props.resenias.map((resenia) => (
        <CardResenia
          style={styles.card}
          foto={resenia.foto}
          resenia={resenia.resenia}
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
    padding: "8px"
  },
  card: {
    width: "80%",
  },
});