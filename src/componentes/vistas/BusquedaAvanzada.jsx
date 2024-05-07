import React, {useState} from 'react';
import { StyleSheet, View, Text, Title } from "react-native";

import { Parrafo } from "../atomos/parrafo/Parrafo";
import BarraBusqueda from "../atomos/barraBusqueda/BarraBusqueda";
import { Divisor } from "../atomos/divisor/Divisor";

import { ListaDePildoras } from "../bloques/ListaDePildoras";

import { Color } from "../../estilos/colores";

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
  {
    id: 5,
    name: "Valorant"
  },
  {
    id: 6,
    name: "Rocket League"
  },
  {
    id: 7,
    name: "Fortnite"
  },
  {
    id: 8,
    name: "Apex Legends"
  },
  {
    id: 9,
    name: "PUBG"
  },
  {
    id: 10,
    name: "Hearthstone"
  },
];

export const BusquedaAvanzada = () => {
  const [searchText, onChangeSearchText] = useState("")
  
  return (
    <View style={styles.container}>
      <Parrafo variante="blancoM">Juevos en común</Parrafo>
      <BarraBusqueda text={searchText} onChangeText={onChangeSearchText}/>
      <ListaDePildoras items={juegos}/>
      <Parrafo variante="blancoM">Reseña</Parrafo>
      {/* TODO: Barra de RESEÑA */}
      <BarraBusqueda text={searchText} onChangeText={onChangeSearchText}/>
      <Divisor />
      <Parrafo variante="blancoM">Disponibilidad horaria</Parrafo>
      <Parrafo variante="blancoM">Días de la semana</Parrafo>
      {/* TODO: Selector de DIAS */}
      <Parrafo variante="blancoM">Horario</Parrafo>
      {/* TODO: Selector de HORARIOS */}
      <Divisor />
      {/* TODO: Botonera */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.neutro,
    width: "100%",
    height: "100%",

    
  },
});