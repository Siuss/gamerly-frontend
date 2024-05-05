import { StyleSheet, View} from "react-native"
import { CardResenia } from "./CardResenia"

export const ListaDeResenias = (props) => {
  const { style, ...restProps } = props;

  return (
    <View style={[styles.container, style]} {...restProps}>
      {props.resenias.map((resenia) => (
        <CardResenia
          style={styles.card}
          puntaje={resenia.puntaje}
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