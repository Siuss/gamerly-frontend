import { Switch as ReactNativeSwitch, StyleSheet, View } from "react-native";

export const Switch = (props) => {
  return (
    <View style={[styles.contenedor, props.style]}>
      <ReactNativeSwitch
        style={styles.switch}
        value={props.value}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    display: "flex",
    alignItems: "center",
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
});
