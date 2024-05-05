import { StyleSheet, View } from "react-native";
import { ListaDeResenias } from "../bloques/ListaDeReseñas";
import { Color } from "../../estilos/colores";

const reseniasMock = [
  {
    foto: "https://www.civitatis.com/f/argentina/bariloche/free-tour-bariloche-589x392.jpg",
    resenia: "Mal compañero",
  },
  {
    foto: "https://www.civitatis.com/f/argentina/bariloche/free-tour-bariloche-589x392.jpg",
    resenia: "Re toxico",
  },
  {
    foto: "https://www.civitatis.com/f/argentina/bariloche/free-tour-bariloche-589x392.jpg",
    resenia: "Manco, no podes jugar tan mal",
  },
];

export const Resenias = (props) => {
  return (
    <View style={styles.container} {...props}>
      <ListaDeResenias resenias={reseniasMock} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.neutro,
    width: "100%",
    height: "100%"
  },
});