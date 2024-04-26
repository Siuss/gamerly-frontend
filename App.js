import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "./src/componentes/bloques/Card";
import { FotoDePerfil } from "./src/componentes/atomos/fotoDePerfil/FotoDePerfil";
import { Parrafo } from "./src/componentes/atomos/parrafo/Parrafo";

export default function App() {
  return (
    <View style={styles.container}>
      <Card
        nombreUsuario="Nanami"
        foto="https://www.civitatis.com/f/argentina/bariloche/free-tour-bariloche-589x392.jpg"
        amigos={["andylarquy", "solidfox"]}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
