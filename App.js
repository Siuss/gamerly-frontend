import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "./src/componentes/bloques/Card";
import Busqueda from "./src/componentes/bloques/Busqueda";

export default function App() {
  return (
    <View style={styles.container}>
      <Busqueda/>
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
