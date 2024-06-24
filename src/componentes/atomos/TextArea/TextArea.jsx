import { StyleSheet, TextInput, View } from "react-native";
import { Color } from "../../../estilos/colores";

export default function TextArea(props) {
  const {style, ...restProps} = props;

  return (
    <TextInput
      style={[styles.input, style]}
      value={props.text}
      onChangeText={props.onChangeText}
      placeholder={props.placeholder}
      multiline={true}
      {...restProps}
    />
  );
}

const styles = StyleSheet.create({
  input: {
     width: "100%",
    height: 150,
    padding: 16,
    color: Color.secundario,
    fontSize: 16,
    borderRadius:40,
    border:`1px solid ${Color.secundario}`,
  },
});
