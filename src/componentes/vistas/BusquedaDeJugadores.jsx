import { StyleSheet, Text, View } from "react-native";
import { useState } from 'react';
import { ListaDeJugadores } from "../bloques/ListaDeJugadores";
import { Color } from "../../estilos/colores";
import Busqueda from "../bloques/Busqueda";
import jugadoresMock from "../../mocks/jugadoresMock.json"

export const BusquedaDeJugadores = (props) => {
  const [searchText, onChangeSearchText] = useState('')

  return (
    <View style={styles.container} {...props}>
      <Busqueda text={searchText} onChangeText={onChangeSearchText}/>
      <ListaDeJugadores jugadores={jugadoresMock} searchText={searchText}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.neutro,
    width: "100%",
    height: "100%"

  },
});