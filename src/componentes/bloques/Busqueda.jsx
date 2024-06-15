import { StyleSheet, View } from "react-native";
import Icons from "@expo/vector-icons/AntDesign";
import BarraBusqueda from "../atomos/barraBusqueda/BarraBusqueda";
import BarraBusquedaFiltro from "../atomos/barraBusquedaFiltro/BarraBusquedaFiltro";
import { Color } from "../../estilos/colores";

export default function Busqueda({text,onChangeText,mostrarFiltro=true}) {
  return (
    <View style={[styles.container,!mostrarFiltro && styles.containerSinFiltro]}>
      <Icons style={styles.icon} name="search1" />
      <BarraBusqueda style={styles.barraSinFiltro} text={text} onChangeText={onChangeText} />
      {mostrarFiltro && <BarraBusquedaFiltro />}
    </View>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: "space-between",
  },
  icon: {
    color: Color.secundario,
    fontSize: 20,
    margin: 12,
  },
  containerSinFiltro: {
    justifyContent:"flex-start",
    width:"100%"
  },
  barraSinFiltro: {
    width:"100%"
  }
});
