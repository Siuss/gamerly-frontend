import { StyleSheet, ScrollView } from "react-native";
import { CardJuegos } from "../bloques/CardJuegos";
import { Color } from "../../estilos/colores";
import juegos from "../../mocks/comunidadMock.json"
import Busqueda from "../bloques/Busqueda" 

export const Juegos = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Busqueda mostrarFiltro={false}></Busqueda>
      {juegos.map((juego) => <CardJuegos
        key={juego.juego}
        foto={juego.foto}
        juego={juego.juego}
        plataforma={juego.plataforma}
      />)}
    </ScrollView>
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
  },
});
