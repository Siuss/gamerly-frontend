import { StyleSheet, TextInput } from "react-native";
import { Color } from "../../../estilos/colores";

export default function BarraBusqueda(props) {
  const {style, ...restProps} = props;

  return (
    <TextInput
      style={[styles.input, style]}
      value={props.text}
      onChangeText={props.onChangeText}
      placeholderTextColor={Color.secundario}
      placeholder="Busqueda"
      {...restProps}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 16,
    color: Color.secundario,
    fontSize: 16,
  },
});
