import React, {useState} from 'react';
import { StyleSheet, View, Text, Title } from "react-native";
import Slider from '@react-native-community/slider';

import { Parrafo } from "../atomos/parrafo/Parrafo";
import BarraBusqueda from "../atomos/barraBusqueda/BarraBusqueda";
import { Divisor } from "../atomos/divisor/Divisor";
import { BotonFlotante } from '../atomos/botonFlotante/BotonFlotante';

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
  {
    id: 3,
    name: "Noche",
  },
];

export const BusquedaAvanzada = () => {
  const [searchText, onChangeSearchText] = useState("");
  
  return (
    <View style={styles.container}>
      <View style={styles.espaciador}>
        <Parrafo variante="blancoM">Juevos en común</Parrafo>
        <View style={styles.espaciador}>
          <BarraBusqueda text={searchText} onChangeText={onChangeSearchText}/>
        </View>
        <View style={styles.espaciador}>
          <ListaDePildoras items={juegos}/>
        </View>
      </View>
      <Divisor />
      <View style={styles.espaciador}>
        <View style={styles.espaciador}>
          <Parrafo variante="blancoM">Reseña</Parrafo>
        </View>
        <View style={styles.espaciador}>
          <Slider style={styles.input} minimumValue={1} maximumValue={5} step={1} />
          <Parrafo style={styles.parrafoCentrado} variante="blancoM">3</Parrafo>
        </View>
      </View>
      <Divisor />
        <View style={styles.espaciador}>
          <Parrafo variante="blancoM">Disponibilidad horaria</Parrafo>
        </View>
        <View style={styles.espaciador}>
          <Parrafo variante="blancoM">Días de la semana</Parrafo>
          <View style={styles.espaciador}>
            <ListaDePildoras items={dias}/>
          </View>
        </View>
        <View style={styles.espaciador}>
          <Parrafo variante="blancoM">Horario</Parrafo>
          <View style={styles.espaciador}>
            <ListaDePildoras items={momentosDelDia}/>
          </View>
        </View>
      <Divisor />
      <View style={styles.botonera}>
        <BotonFlotante name="check" />
        <BotonFlotante name="close" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.neutro,
    width: "100%",
    height: "100%",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  botonera:{
    display: "flex",
    position: 'fixed',
    bottom: 66,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  input: {
    width:"50vw",
    minWidth:200,
    height:50,
    padding:15,
    color:Color.primario,
    fontSize:16
  },
  espaciador: {
    paddingVertical: 3,
  },
  parrafoCentrado : {
    textAlign: "center",
  },
});