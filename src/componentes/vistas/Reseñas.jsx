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
    resenia: "Yo no soy quién para hablar mal de nadie pero Osvaldo es un irrespetuoso un tremendo hijo de puta, un ignorante mentiroso un avaro y malcriado, un jodido hinchapelotas un estúpido, un tarado, un sorete mal cagado Drogadicto y maricón",
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
  },
});