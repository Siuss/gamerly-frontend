import { StyleSheet, Text } from "react-native";
import { Color } from "../../../estilos/colores";

export const Parrafo = ({ style, subrayado, variante="blancoS", ...props }) => {
  return (
    <Text
      style={[
        styles[variante],
        subrayado && styles.subrayado,
        style,
      ]}
      {...props}
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
  grisXS: {
    color: Color.gris,
    fontSize: 11,
  },
  grisS: {
    color: Color.gris,
    fontSize: 14,
  },
  subrayado: {
    textDecorationLine: "underline",
  },
});
