import { StyleSheet , View } from "react-native";

import { Pildora } from "../atomos/pildora/Pildora";

export const ListaDePildoras = ( { style, items, conBorde, variante, onPress, disabled, borrable = false, ...props }) => {
  return (
    <View style={[styles.contenedorPildoras, style]} {...props}>
      {items.map((item) => (
        <Pildora
          key={item.id}
          style={styles.card}
          conBorde={conBorde}
          variante={item.variante || variante}
          onPress={() => onPress(item)}
          disabled={disabled}
          borrable={borrable}
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
