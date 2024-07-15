import { StyleSheet, TouchableOpacity } from "react-native";
import { Color } from "../../../estilos/colores";
import { Parrafo } from "../parrafo/Parrafo";
import { MaterialIcons } from "@expo/vector-icons";

export const Pildora = ({
  style,
  variante,
  conBorde,
  children,
  borrable = false,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.pildora,
        styles[variante]?.pildora,
        conBorde && styles.conBorde,
        borrable && styles.pildoraBorrable,
        style,
      ]}
      {...props}
    >
      <Parrafo variante="blancoS" style={styles[variante]?.parrafo}>
        {children}
      </Parrafo>
      {borrable && (
        <MaterialIcons style={styles.icono} name="close" size={16} color={Color.blanco} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pildora: {
    position: "relative",
    backgroundColor: Color.primario,
    color: Color.blanco,
    fontSize: 16,
    alignItems: "center",
    paddingHorizontal: 24,
    borderRadius: 100,
    flexDirection: "row",
  },
  conBorde: {
    borderColor: Color.bordeBoton,
    borderWidth: 1,
  },
  pildoraBorrable: {
    paddingRight: 32
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
  icono: {
    position: "absolute",
    right: 8
  }
});
