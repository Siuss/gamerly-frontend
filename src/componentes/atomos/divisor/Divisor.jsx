import { StyleSheet, View } from "react-native";
import { Color } from "../../../estilos/colores";
import useThemeStore from "../../../hooks/useThemeStore";

export const Divisor = () => {
  const {theme} = useThemeStore()

  const dynamicColor = theme === "dark" ? Color.gris : Color.secundario;
  return <View style={[styles.divisor, { backgroundColor: dynamicColor }]} />;
};

const styles = StyleSheet.create({
  divisor: {
    height: 2,
    width: "100%",
  },
});
