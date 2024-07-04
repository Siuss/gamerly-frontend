import { StyleSheet, TextInput } from "react-native";
import { Color } from "../../../estilos/colores";

export default function TextArea(props) {
  const { style, ...restProps } = props;

  return (
    <TextInput
      style={[styles.input, style]}
      value={props.text}
      onChangeText={props.onChangeText}
      placeholder={props.placeholder}
      placeholderTextColor={Color.secundario}
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
    textAlignVertical: 'top',
    fontSize: 16,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Color.secundario
  },
});
