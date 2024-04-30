import { StyleSheet, Text } from "react-native";
import { View } from "react-native-web";
import { Pildora } from "../atomos/pildora/Pildora";

export const ListaDePildoras = (props) => {
  const { style, ...restProps } = props;
  return (
    <View style={[styles.contenedorPildoras, style]} {...restProps}>
      {props.items.map((item) => (
        <Pildora style={styles.card}>{item}</Pildora>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorPildoras: {
    width: "fit-content",
    display:"flex",
    flexDirection:"row",
    gap:10,
  },
});
