import { StyleSheet, Text } from "react-native";
import { Color } from "../../../estilos/colores";

export const Parrafo = (props) => {
  const { style, ...restProps } = props;
  return (
    <Text
      style={[
        styles[props.variante],
        props.subrayado && styles.subrayado,
        style,
      ]}
      {...restProps}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  blancoM: {
    color: Color.blanco,
    fontSize: 16,
  },
  blancoS: {
    color: Color.blanco,
    fontSize: 11,
  },
  grisS: {
    color: Color.gris,
    fontSize: 11,
  },
  subrayado: {
    textDecorationLine: "underline",
  },
});
