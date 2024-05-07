import React, {useState} from 'react';
import { StyleSheet, View, Text, Title } from "react-native";

import { Parrafo } from "../atomos/parrafo/Parrafo";
import BarraBusqueda from "../atomos/barraBusqueda/BarraBusqueda";
import { Divisor } from "../atomos/divisor/Divisor";

import { ListaDePildoras } from "../bloques/ListaDePildoras";
import { TablaHorarios } from '../bloques/TablaHorarios';

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

const horariosIniciales = [
  { mañana: false, tarde: false, noche: false }, // Lunes
  { mañana: false, tarde: false, noche: false }, // Martes
  { mañana: false, tarde: false, noche: false }, // Miercoles
  { mañana: false, tarde: false, noche: false }, // Jueves
  { mañana: false, tarde: false, noche: false }, // Viernes
  { mañana: false, tarde: false, noche: false }, // Sabado
  { mañana: false, tarde: false, noche: false }, // Domingo
]

export const BusquedaAvanzada = () => {
  const [searchText, onChangeSearchText] = useState("");
  const [horarios, setHorarios] = useState(horariosIniciales);

 const onHorarioChange = (dia, momento) => {
    const nuevosHorarios = { ...horarios };
    nuevosHorarios[dia][momento] = !nuevosHorarios[dia][momento];
    
    setHorarios(nuevosHorarios)
 };
  
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

      
      <TablaHorarios horarios={horarios} onHorarioChange={onHorarioChange} />



      {/* <Parrafo variante="blancoM">Días de la semana</Parrafo> */}
      {/* TODO: Selector de DIAS */}
      {/* <Parrafo variante="blancoM">Horario</Parrafo> */}
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