import { StyleSheet, ScrollView } from "react-native";
import { CardComunidad } from "../bloques/CardComunidad";
import { Color } from "../../estilos/colores";
import comunidades from "../../mocks/comunidadMock.json"

export const Comunidad = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {comunidades.map((comunidad) => <CardComunidad
        key={comunidad.juego}
        foto={comunidad.foto}
        juego={comunidad.juego}
        plataforma={comunidad.plataforma}
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
