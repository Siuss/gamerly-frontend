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
  blancoL: {
    fontSize: 30,
    fontWeight: "bold",
    color: Color.blanco,
  },
  blancoXS: {
    color: Color.blanco,
    fontSize: 12,
  },
  blancoS: {
    color: Color.blanco,
    fontSize: 14,
  },
  blancoM: {
    color: Color.blanco,
    fontSize: 16,
  },
  grisS: {
    color: Color.gris,
    fontSize: 11,
  },
  subrayado: {
    textDecorationLine: "underline",
  },
});
