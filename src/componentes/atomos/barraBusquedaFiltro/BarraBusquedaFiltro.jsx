import React, {useState} from 'react';
import { StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Icons from "@expo/vector-icons/AntDesign"
import { Color } from "../../../estilos/colores";

export default function BarraBusquedaFiltro(props) {
  const { style, ...restProps } = props;

  const navigation = useNavigation();

  const handleNavigate = (buttonName) => {
    console.log("Pressed", buttonName);
    navigation.navigate('busquedaAvanzada');
  };


  return(
    <Pressable style={styles.button} {...restProps}
      onPress={() => handleNavigate('filter')}>
      {({pressed}) => (
        <> {pressed ? 
          <Icons style={styles.iconPressed} name="filter"/>
        : 
          <Icons style={styles.icon} name="filter"/>
        } </>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width:50,
    alignItems:"center"
  },
  icon: {
    color:Color.secundario,
    fontSize:20,
    margin:12
  },
  iconPressed: {
    color:Color.primario,
    fontSize:20,
    margin:12
  }
});