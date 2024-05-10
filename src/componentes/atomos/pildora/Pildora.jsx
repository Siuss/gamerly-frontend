import { StyleSheet, Text } from "react-native";
import { Color } from "../../../estilos/colores";
import { View } from "react-native-web";
import { Parrafo } from "../parrafo/Parrafo";

export const Pildora = (props) => {
  const { style, variante, conBorde, ...restProps } = props;
  return (
    <View
      style={[
        styles.pildora,
        styles[variante]?.pildora,
        conBorde && styles.conBorde,
        style,
      ]}
      {...restProps}
    >
      <Parrafo variante="blancoS" style={styles[variante]?.parrafo}>
        {props.children}
      </Parrafo>
    </View>
  );
};

const styles = StyleSheet.create({
  pildora: {
    backgroundColor: Color.primario,
    color: Color.blanco,
    fontSize: 16,
    width: "fit-content",
    paddingHorizontal: 24,
    borderRadius: 100,
  },
  conBorde: {
    borderColor: Color.bordeBoton,
    borderWidth: 1,
  },
  deseleccionado: {
    pildora: {
      borderColor: Color.secundario,
      borderWidth: 1,
      backgroundColor: "transparent",
    },
    parrafo: {
      color: Color.secundario,
    },
  },
  secundario: {
    pildora: {
      backgroundColor: Color.secundario,
    },
    parrafo: {
      color: Color.neutro,
    },
  },
});
