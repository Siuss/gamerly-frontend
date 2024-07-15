import { Switch as ReactNativeSwitch, StyleSheet, View } from "react-native";
import { Color } from "../../../estilos/colores";

export const Switch = (props) => {
  const Contenedor = ({ children }) =>
    props.disabled ? (
      <View pointerEvents="none">{children}</View>
    ) : (
      <>{children}</>
    );
  return (
    <Contenedor>
      <View style={[styles.contenedor, props.style]}>
        <ReactNativeSwitch
          style={styles.switch}
          value={props.value}
          onValueChange={props.onChange}
        />
      </View>
    </Contenedor>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    display: "flex",
    alignItems: "center",
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    thumbColor: Color.secundario,
  },
});
