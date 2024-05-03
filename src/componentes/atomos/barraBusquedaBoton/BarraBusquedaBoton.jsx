import { StyleSheet, Pressable } from "react-native";
import Icons from "@expo/vector-icons/AntDesign"
import { Color } from "../../../estilos/colores";

export default function BarraBusquedaBoton() {
  return(
    <Pressable style={styles.button}>
    {({pressed}) => (
      <> {pressed ? 
        <Icons style={styles.iconPressed} name="search1"/>
      : 
        <Icons style={styles.icon} name="search1"/>
      } </>
    )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width:50,
    alignItems:"center"
  },
  icon: {
    color:Color.secundario,
    fontSize:20,
    margin:12
  },
  iconPressed: {
    color:Color.primario,
    fontSize:20,
    margin:12
  }
});