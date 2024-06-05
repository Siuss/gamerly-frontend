import { StyleSheet, View } from "react-native";
import { CardJuegos } from "../bloques/CardJuegos";
import { Color } from "../../estilos/colores";



export const Comunidad = (props) => {
  const { style, id, foto, nombreJuego, ...restProps } = props;

  return (
    <View style={[styles.container, style]} {...restProps}>
      <CardJuegos
      
        foto={{ uri: foto }}
        nombreJuego={nombreJuego}
        style={styles.card}
      />
      {/* {props.resenias.map((juegos) => (
        <CardJuegos
          key={juegos.foto}
          style={styles.card}
          puntaje={juegos.puntaje}
          foto={juegos.foto}
          juegos={juegos.juegos}
        />
      ))} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "center",
    backgroundColor: Color.neutro,
    padding: "8px",
    height:"100%"
  },
  card: {
    width: "80%",
    height:"150",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",  // Propiedad equivalente a object-fit: cover
  }
});
