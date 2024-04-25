import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {Color} from "../../estilos/colores"
/* import { useNavigation } from '@react-navigation/native' */



export const HeaderTitle = ({ title }) => {

  /* const navigation = useNavigation()

  const handleNavigate = () => {
    navigation.goBack()
  } */

  return (
    <View style={styles.header}>
      <TouchableOpacity /* onPress={handleNavigate} */ style={styles.button}>
        <Text style={styles.buttonText}>{'<-'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={{ flex: 1 }} />
    </View>
  );
};

const cambiarTitulo = () => {
const titulos = {
  '/home': 'Home',
  '/figuritas': 'Mi Perfil',
  '/jugadores': 'Reseñas',
  '/jugadores/detalle/\\d+': 'Busqueda Avanzada',
}

const matchingRoute = Object.keys(titulos).find((route) => {
  const regex = new RegExp(`^${route}$`)
})

return titulos[matchingRoute] || 'Home'
}
const titulo = cambiarTitulo()

const styles = StyleSheet.create({
  header: {
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
    marginRight: 90,
  },
})

export default HeaderTitle
