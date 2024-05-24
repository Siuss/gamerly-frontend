import { StyleSheet, Text } from "react-native";
import { View } from "react-native-web";
import { Pildora } from "../atomos/pildora/Pildora";

export const ListaDePildoras = (props) => {
  const { style, conBorde, variante, onPress, ...restProps } = props;
  return (
    <View style={styles.contenedorPildoras} {...restProps}>
      {props.items.map((item) => (
        <Pildora
          key={item.id}
          style={styles.card}
          conBorde={conBorde}
          variante={item.variante || variante}
          onPress={() => onPress(item)}
        >
          {item.contenido}
        </Pildora>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorPildoras: {
    width: "fit-content",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
