import React, { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Gradiente } from "../atomos/gradiente/Gradiente";
import { Color } from "../../estilos/colores";
import { rutas } from "../rutas/rutas";

const NavBar = (props) => {
  const { style, ...restProps } = props;
  const [activeButton, setActiveButton] = useState(rutas.busquedaDeJugadores);

  const navigation = useNavigation();
  const state = useNavigationState(state => state);

  const handleNavigate = (buttonName) => {
    navigation.navigate(buttonName);
    setActiveButton(buttonName);
  };

  const handleNavigateConId = (buttonName) => {
    navigation.navigate(buttonName, { id: "1" });
    setActiveButton(buttonName);
  };

  const currentRouteName = state?.routes?.[state.index]?.name;

  console.log('Ruta actual:', currentRouteName);

  if (currentRouteName === 'recuperarContrasena' || currentRouteName === 'login' || currentRouteName === 'registro' || currentRouteName === 'inicio') {
    return null;
  }

  return (
    <Gradiente
      variante="gradienteHorizontal"
      style={[styles.navBar, style]}
      {...restProps}
    >
      <View style={styles.contenido}>
        <Pressable
          style={({ pressed }) => [
            styles.botonDeNavegacion,
            {
              backgroundColor:
                activeButton === rutas.busquedaDeJugadores || pressed
                  ? Color.acento
                  : "transparent",
            },
          ]}
          onPress={() => handleNavigate(rutas.busquedaDeJugadores)}
        >
          <MaterialIcons
            name="home"
            size={24}
            color={
              activeButton === rutas.busquedaDeJugadores
                ? Color.neutro
                : Color.blanco
            }
          />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.botonDeNavegacion,
            {
              backgroundColor:
                activeButton === rutas.amigos || pressed
                  ? Color.acento
                  : "transparent",
            },
          ]}
          onPress={() => handleNavigateConId(rutas.amigos)}
        >
          <MaterialIcons
            name="group"
            size={24}
            color={activeButton === rutas.amigos ? Color.neutro : Color.blanco}
          />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.botonDeNavegacion,
            {
              backgroundColor:
                activeButton === rutas.comunidad || pressed
                  ? Color.acento
                  : "transparent",
            },
          ]}
          onPress={() => handleNavigateConId(rutas.comunidad)}
        >
          <MaterialIcons
            name="groups"
            size={24}
            color={
              activeButton === rutas.comunidad ? Color.neutro : Color.blanco
            }
          />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.botonDeNavegacion,
            {
              backgroundColor:
                activeButton === rutas.miPerfil || pressed
                  ? Color.acento
                  : "transparent",
            },
          ]}
          onPress={() => handleNavigateConId(rutas.miPerfil)}
        >
          <MaterialIcons
            name="person"
            size={24}
            color={
              activeButton === rutas.miPerfil ? Color.neutro : Color.blanco
            }
          />
        </Pressable>
      </View>
    </Gradiente>
  );
};

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: Color.primario,
    paddingHorizontal: 10,
  },

  contenido: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    gap: 10,
  },

  botonDeNavegacion: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 50,
  },
});

export default NavBar;
