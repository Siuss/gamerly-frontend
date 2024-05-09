import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Color } from '../../estilos/colores'
import { Ionicons } from '@expo/vector-icons'
import { Gradiente } from "../atomos/gradiente/Gradiente"
import { useNavigation } from '@react-navigation/native'

export const HeaderTitle = ({ title }) => {
  const navigation = useNavigation()

  const handleNavigateBack = () => {
    navigation.goBack();
  };


  return (
    <Gradiente variante="gradienteHorizontal" style={styles.header}>
      <TouchableOpacity onPress={handleNavigateBack} style={styles.boton}>
        <Ionicons name="arrow-back" size={24} color={Color.blanco} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </Gradiente>   
  );
};



const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.primario,
    height: 60,
    paddingHorizontal: 20,
  },
  boton: {
    position: 'absolute',
    left: 16
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
});


export default HeaderTitle
