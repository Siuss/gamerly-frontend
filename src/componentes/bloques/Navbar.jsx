import React, { useState, useEffect } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Color } from "../../estilos/colores";
import { rutas } from "../rutas/rutas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {MessagesList} from  "...\src\componentes\vistas\Mensajes.jsx";

const NavBar = (props) => {
    const { style, ...restProps } = props;
    const navigation = useNavigation();
    const state = useNavigationState(state => state);

    const currentRouteName = state?.routes?.[state.index]?.name;

    useEffect(() => {
        if (
            currentRouteName === rutas.miPerfil
        ) {
            setActiveButton(rutas.miPerfil);
        } else {
            setActiveButton(currentRouteName);
        }
    }, [currentRouteName]);

    const [activeButton, setActiveButton] = useState(currentRouteName);

    const handleNavigate = (buttonName) => {
        navigation.navigate(buttonName);
        setActiveButton(buttonName);
    };

    const handleNavigateConId = async (buttonName) => {
      const idUsuarioLogueado = JSON.parse((await AsyncStorage.getItem("usuario"))).id
        navigation.navigate(buttonName, { id: idUsuarioLogueado });
        setActiveButton(buttonName);
    };

    const routesToHideNavBar = [
        'recuperarContrasena',
        'login',
        'registro',
        'inicio'
    ];

    if (routesToHideNavBar.includes(currentRouteName) || !currentRouteName) {
        return null;
    }
  return (
        <View style={[styles.navBar, styles.contenido]} {...restProps}>
          <Pressable
              style={() => [
                styles.botonDeNavegacion,
                {
                  backgroundColor:
                      activeButton === rutas.juegos
                          ? Color.acento
                          : "transparent",
                },
              ]}
              onPress={() => handleNavigate(rutas.juegos)}
          >
            <MaterialIcons
                name="home"
                size={24}
                color={
                  activeButton === rutas.juegos
                      ? Color.neutro
                      : Color.blanco
                }
            />
          </Pressable>
          <Pressable
              style={() => [
                styles.botonDeNavegacion,
                {
                  backgroundColor:
                      activeButton === rutas.amigos
                          ? Color.acento
                          : "transparent",
                },
              ]}
              onPress={() => handleNavigateConId(rutas.MessagesList)}
          >
            <MaterialIcons
                name="group"
                size={24}
                color={activeButton === rutas.amigos ? Color.neutro : Color.blanco}
            />
          </Pressable>
          <Pressable
              style={() => [
                styles.botonDeNavegacion,
                {
                  backgroundColor:
                      activeButton === rutas.miPerfil
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
