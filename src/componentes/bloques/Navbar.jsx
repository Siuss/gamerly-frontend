import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
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
            { backgroundColor: activeButton === 'home' || pressed ? Color.acento : 'transparent' }
          ]}
          onPress={() => handlePress('home')}
        >
          <MaterialIcons name="home"
            size={24}
            color={activeButton === 'home' ? Color.neutro : Color.blanco}
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
            { backgroundColor: activeButton === 'comunidad' || pressed ? Color.acento : 'transparent' }
          ]}
          onPress={() => handlePress('comunidad')}
        >
          <MaterialIcons name="groups"
            size={24}
            color={activeButton === 'comunidad' ? Color.neutro : Color.blanco}
          />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.botonDeNavegacion,
            { backgroundColor: activeButton === 'perfil' || pressed ? Color.acento : 'transparent' }
          ]}
          onPress={() => handlePress('perfil')}
        >
          <MaterialIcons name="person"
            size={24}
            color={activeButton === 'perfil' ? Color.neutro : Color.blanco}
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

