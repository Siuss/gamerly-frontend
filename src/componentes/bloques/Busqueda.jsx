import { StyleSheet, View } from "react-native";
import BarraBusquedaBoton from "../atomos/barraBusquedaBoton/BarraBusquedaBoton";
import BarraBusqueda from "../atomos/barraBusqueda/BarraBusqueda";
import BarraBusquedaFiltro from "../atomos/barraBusquedaFiltro/BarraBusquedaFiltro";
import { Color } from "../../estilos/colores";

export default function Busqueda() {
  return(
    <View style={styles.container}>
      <BarraBusquedaBoton/>
      <BarraBusqueda/>
      <BarraBusquedaFiltro/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width:300,
    height:50,
    margin:10,
    borderRadius:50,
    borderWidth:2,
    borderColor:Color.secundario,
    flexDirection:"row",
    alignItems:"center"
  }
});