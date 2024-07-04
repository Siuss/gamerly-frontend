import { TouchableOpacity, StyleSheet } from "react-native";
import { Color } from "../../../estilos/colores";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

/* 
 Al usarlo es recomendable posicionarlo asi
 <BotonFlotante name="edit" style={styles.botonFlotante}/>

 const styles = StyleSheet.create({
  botonFlotante: {
    position: 'fixed',
    bottom: 16,
    right: 16
  },
});
 
*/

export const BotonFlotante = ({
  color = Color.blanco,
  style,
  size = 20,
  name,
  ...restProps
}) => {
  const dynamicStyles = StyleSheet.create({
    boton: {
      padding: 20,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.boton, dynamicStyles.boton, style]}
      {...restProps}
    >
      <MaterialIcons name={name} color={color} size={size} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    color: Color.blanco,
    backgroundColor: Color.primario,
    borderRadius: 100,
    alignSelf: "flex-start",
    elevation: 4,
  },
});
