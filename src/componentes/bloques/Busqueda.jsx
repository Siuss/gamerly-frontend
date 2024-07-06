import { StyleSheet, View } from "react-native";
import Icons from "@expo/vector-icons/AntDesign";
import BarraBusqueda from "../atomos/barraBusqueda/BarraBusqueda";
import BarraBusquedaFiltro from "../atomos/barraBusquedaFiltro/BarraBusquedaFiltro";
import { Color } from "../../estilos/colores";

export default function Busqueda({text, onChangeText, mostrarFiltro = false, filtros}) {
  return (
    <View style={[styles.container, mostrarFiltro && styles.containerConFiltro]}>
      <Icons style={styles.icon} name="search1" />
      <BarraBusqueda text={text} onChangeText={onChangeText} />
      {mostrarFiltro && <BarraBusquedaFiltro filtros={filtros} />}
    </View>
  );
}

const styles = StyleSheet.create({
  containerConFiltro: {
    justifyContent: "space-between"
  },
  container: {
    width: "100%",
    height: 50,
    margin: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Color.secundario,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "flex-start",
  },
  icon: {
    color: Color.secundario,
    fontSize: 20,
    margin: 12,
  },
});
