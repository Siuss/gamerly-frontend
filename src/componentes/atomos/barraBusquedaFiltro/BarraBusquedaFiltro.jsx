import React from "react";
import { StyleSheet, Pressable } from "react-native";
// eslint-disable-next-line import/named
import { useNavigation } from "@react-navigation/native";

import Icons from "@expo/vector-icons/AntDesign";
import { Color } from "../../../estilos/colores";

export default function BarraBusquedaFiltro({ filtros, style, ...restProps }) {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate("busquedaAvanzada", filtros);
  };

  return (
    <Pressable
      style={[styles.button, style]}
      {...restProps}
      onPress={() => handleNavigate()}
    >
      {({ pressed }) => (
        <>
          {pressed ? (
            <Icons style={styles.iconPressed} name="filter" />
          ) : (
            <Icons style={styles.icon} name="filter" />
          )}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    alignItems: "center",
  },
  icon: {
    color: Color.secundario,
    fontSize: 20,
    margin: 12,
  },
  iconPressed: {
    color: Color.primario,
    fontSize: 20,
    margin: 12,
  },
});
