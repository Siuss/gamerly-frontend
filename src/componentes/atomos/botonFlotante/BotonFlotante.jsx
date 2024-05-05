import { TouchableOpacity, StyleSheet } from "react-native";
import { Color } from "../../../estilos/colores";
import Icon from "@expo/vector-icons/MaterialIcons";

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

export const BotonFlotante = (props) => {
  const { style, ...restProps } = props;
  return (
    <TouchableOpacity style={[styles.boton, style]} {...restProps}>
      <Icon name={props.name} color={Color.blanco} size={16} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    color: Color.blanco,
    backgroundColor: Color.primario,
    borderRadius: 100,
    padding: 16,
    width: "fit-content",
  },
});
