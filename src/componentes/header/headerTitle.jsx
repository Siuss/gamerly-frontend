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
      <TouchableOpacity onPress={handleNavigateBack} style={styles.button}>
        <Ionicons name="arrow-back" size={24} color={Color.blanco} />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={handleNavigate} style={styles.button}>
        <Ionicons name="arrow-back" size={24} color={Color.blanco} />
      </TouchableOpacity> */}
      <Text style={styles.title}>{title}</Text>
      <View style={{ flex: 1 }} />
    </Gradiente>   
  );
};



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
    flexBasis: "80%"
  },
  button: {
    marginRight: 16,
  },
});


export default HeaderTitle
