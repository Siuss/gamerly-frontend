import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import {useNavigation} from "@react-navigation/native";

import { MaterialIcons } from '@expo/vector-icons';
import { Gradiente } from "../atomos/gradiente/Gradiente";
import { Color } from "../../estilos/colores";

const NavBar = (props) => {
  const { style, ...restProps } = props;
  const [activeButton, setActiveButton] = useState(null);

  const handlePress = (buttonName) => {
    setActiveButton(buttonName);
    console.log("Pressed", buttonName);
  };
  const navigation = useNavigation()

  const handleNavigate = (buttonName) => {
    navigation.navigate(buttonName);
    setActiveButton(buttonName);
  };

  const handleNavigateConId = (buttonName) => {
    navigation.navigate(buttonName, { id: "1"});
    setActiveButton(buttonName);
  };


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
            { backgroundColor: activeButton === 'busquedaDeJugadores' || pressed ? Color.acento : 'transparent' }
          ]}
          onPress={() => handleNavigate('busquedaDeJugadores')}
        >
          <MaterialIcons name="home"
            size={24}
            color={activeButton === 'busquedaDeJugadores' ? Color.neutro : Color.blanco}
          />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.botonDeNavegacion,
            { backgroundColor: activeButton === 'amigos' || pressed ? Color.acento : 'transparent' }
          ]}
          onPress={() => handlePress('amigos')}
        >
          <MaterialIcons name="group"
            size={24}
            color={activeButton === 'amigos' ? Color.neutro : Color.blanco}
          />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.botonDeNavegacion,
            { backgroundColor: activeButton === 'resenias' || pressed ? Color.acento : 'transparent' }
          ]}
          onPress={() => handleNavigateConId('resenias')}
        >
          <MaterialIcons name="groups"
            size={24}
            color={activeButton === 'resenias' ? Color.neutro : Color.blanco}
          />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.botonDeNavegacion,
            { backgroundColor: activeButton === 'vistaPerfil' || pressed ? Color.acento : 'transparent' }
          ]}
          onPress={() => handleNavigateConId('miPerfil')}
        >
          <MaterialIcons name="person"
            size={24}
            color={activeButton === 'vistaPerfil' ? Color.neutro : Color.blanco}
          />
        </Pressable>
      </View>
    </Gradiente>
  );
};

const styles = StyleSheet.create({
  
  navBar: {
    backgroundColor: Color.primario,
    paddingHorizontal:10,
  },

  contenido: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    gap:10,
  },

  botonDeNavegacion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 50,
  },
});

export default NavBar;

