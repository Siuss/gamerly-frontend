import { TouchableOpacity, StyleSheet } from "react-native";
import { Color } from "../../../estilos/colores";
import { Parrafo } from "../parrafo/Parrafo";

export const Boton = (props) => {
  const { style, variante = "primario", ...restProps } = props;
  return (
    <TouchableOpacity
      style={[styles.boton, styles[variante], style]}
      {...restProps}
    >
      <Parrafo variante="blancoS" subrayado={variante == 'link'}>{props.children}</Parrafo>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    color: Color.blanco,
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 32,
    width: "fit-content",
  },
  acento: {
    backgroundColor: Color.acento,
  },
  primario: {
    backgroundColor: Color.primario,
  },
  link: {
    // Vacio a proposito, si hace falta mas adelante se pueden agregar estilos
  },
  transparente: {
    // Vacio a proposito, si hace falta mas adelante se pueden agregar estilos
  },
});
