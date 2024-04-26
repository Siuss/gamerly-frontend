import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Color } from '../../estilos/colores'
import { Ionicons } from '@expo/vector-icons'
import { Gradiente } from "../atomos/gradiente/Gradiente"
/* import { useNavigation } from '@react-navigation/native' */

export const HeaderTitle = ({ title, onBackPress }) => {
  // const navigation = useNavigation();

  // const handleNavigate = () => {
  //   navigation.goBack();
  // };

  return (
      <Gradiente variante="gradienteHorizontal" style={styles.header}>
      <TouchableOpacity onPress={onBackPress} style={styles.button}>
        <Ionicons name="arrow-back" size={24} color={Color.blanco} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={{ flex: 1 }} />
      </Gradiente>   
  )
}

const cambiarTitulo = () => {
  const titulos = {
    '/home': 'Home',
    '/perfil': 'Mi Perfil',
    '/reseñas': 'Reseñas',
    '/busquedaAvanzada': 'Búsqueda Avanzada',
  };

  const matchingRoute = Object.keys(titulos).find((route) => {
    const regex = new RegExp(`^${route}$`)
  });

  return titulos[matchingRoute] || 'Home'
};
const titulo = cambiarTitulo()

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.primario,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.primario,
    height: 60,
    paddingHorizontal: 20,
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  button: {
    marginRight: 16,
  },
});

export default HeaderTitle
