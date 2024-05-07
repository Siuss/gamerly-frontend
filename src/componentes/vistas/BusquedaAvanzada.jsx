import React, {useState} from 'react';
import { StyleSheet, View, Text, Title } from "react-native";

import { Parrafo } from "../atomos/parrafo/Parrafo";
import BarraBusqueda from "../atomos/barraBusqueda/BarraBusqueda";
import { Divisor } from "../atomos/divisor/Divisor";

import { ListaDePildoras } from "../bloques/ListaDePildoras";

import { Color } from "../../estilos/colores";

// import dias from "../../data/dias.json";
// import momentosDelDia from "../../data/momentosDelDia.json";

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

const dias = [
  {
    id: 1,
    name: "Lunes",
  },
  {
    id: 2,
    name: "Martes",
  },
  {
    id: 3,
    name: "Miercoles",
  },
  {
    id: 4,
    name: "Jueves",
  },
  {
    id: 5,
    name: "Viernes",
  },
  {
    id: 6,
    name: "Sabado",
  },
  {
    id: 7,
    name: "Domingo",
  },
];

const momentosDelDia = [
  {
    id: 1,
    name: "Mañana",
  },
  {
    id: 2,
    name: "Tarde",
  },
];

export const BusquedaAvanzada = () => {
  const [searchText, onChangeSearchText] = useState("");
  
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
      <ListaDePildoras items={dias}/>
      <Parrafo variante="blancoM">Horario</Parrafo>
      <ListaDePildoras items={momentosDelDia}/>
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