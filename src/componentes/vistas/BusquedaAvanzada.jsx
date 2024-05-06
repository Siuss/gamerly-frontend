import React, {useState} from 'react';
import { StyleSheet, View, Text } from "react-native";

import { Color } from "../../estilos/colores";
import { Divisor } from "../atomos/divisor/Divisor";
import BarraBusqueda from "../atomos/barraBusqueda/BarraBusqueda";
import { ListaDePildoras } from "../bloques/ListaDePildoras";

const juegos = [
  {
    id: 1,
    name: "League of Legends",
  },
  {
    id: 2,
    name: "Dota 2",
  },
  {
    id: 3,
    name: "Counter Strike",
  },
  {
    id: 4,
    name: "World of Warcraft",
  },
];

export const BusquedaAvanzada = () => {
  const [searchText, onChangeSearchText] = useState("")
  
  return (
    <View style={styles.container}>
      <Text>Juevos en común</Text>
      <BarraBusqueda text={searchText} onChangeText={onChangeSearchText}/>
      <ListaDePildoras items={juegos}/>
      <Divisor />
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