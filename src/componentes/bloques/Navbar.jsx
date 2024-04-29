import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Icons from "@expo/vector-icons/AntDesign";
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
            { backgroundColor: activeButton === 'home' || pressed ? Color.secundario : 'transparent' }
          ]}
          onPress={() => handlePress('home')}
        >
          <Icons name="home"
            size={24}
            color={Color.blanco}
          />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.botonDeNavegacion,
            { backgroundColor: activeButton === 'amigos' || pressed ? Color.secundario : 'transparent' }
          ]}
          onPress={() => handlePress('amigos')}
        >
          <Icons name="addusergroup"
            size={24}
            color={Color.blanco}
          />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.botonDeNavegacion,
            { backgroundColor: activeButton === 'comunidad' || pressed ? Color.secundario : 'transparent' }
          ]}
          onPress={() => handlePress('comunidad')}
        >
          <Icons name="earth"
            size={24}
            color={Color.blanco}
          />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.botonDeNavegacion,
            { backgroundColor: activeButton === 'perfil' || pressed ? Color.secundario : 'transparent' }
          ]}
          onPress={() => handlePress('perfil')}
        >
          <Icons name="user"
            size={24}
            color={Color.blanco}
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
    gap:15,
  },

  botonDeNavegacion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});

export default NavBar;
