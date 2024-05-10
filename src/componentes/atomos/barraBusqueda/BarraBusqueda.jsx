import { StyleSheet, TextInput, View } from "react-native";
import { Color } from "../../../estilos/colores";

export default function BarraBusqueda(props) {
  const {style, ...restProps} = props;

  return (
    <TextInput
      style={[styles.input, style]}
      value={props.text}
      onChangeText={props.onChangeText}
      placeholder="Busqueda"
      {...restProps}
    />
  );
}

const styles = StyleSheet.create({
  contenedor: {
    display: "flex",
    justifyContent: "center",
  },
  input: {
    height: 50,
    padding: 16,
    color: Color.secundario,
    fontSize: 16,
  },
});
